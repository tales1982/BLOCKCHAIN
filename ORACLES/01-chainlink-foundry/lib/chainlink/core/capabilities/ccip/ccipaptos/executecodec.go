package ccipaptos

import (
	"context"
	"fmt"
	"math/big"

	"github.com/aptos-labs/aptos-go-sdk"
	"github.com/aptos-labs/aptos-go-sdk/bcs"

	cciptypes "github.com/smartcontractkit/chainlink-ccip/pkg/types/ccipocr3"
	ccipcommon "github.com/smartcontractkit/chainlink/v2/core/capabilities/ccip/common"
)

// ExecutePluginCodecV1 is a codec for encoding and decoding execute plugin reports.
// Compatible with ccip_offramp::offramp version 1.6.0
type ExecutePluginCodecV1 struct {
	extraDataCodec ccipcommon.ExtraDataCodec
}

func NewExecutePluginCodecV1(extraDataCodec ccipcommon.ExtraDataCodec) *ExecutePluginCodecV1 {
	return &ExecutePluginCodecV1{
		extraDataCodec: extraDataCodec,
	}
}

func (e *ExecutePluginCodecV1) Encode(ctx context.Context, report cciptypes.ExecutePluginReport) ([]byte, error) {
	if len(report.ChainReports) == 0 {
		return nil, nil
	}

	if len(report.ChainReports) != 1 {
		return nil, fmt.Errorf("ExecutePluginCodecV1 expects exactly one ChainReport, found %d", len(report.ChainReports))
	}

	chainReport := report.ChainReports[0]

	if len(chainReport.Messages) != 1 {
		return nil, fmt.Errorf("only single report message expected, got %d", len(chainReport.Messages))
	}

	if len(chainReport.OffchainTokenData) != 1 {
		return nil, fmt.Errorf("only single group of offchain token data expected, got %d", len(chainReport.OffchainTokenData))
	}

	message := chainReport.Messages[0]
	offchainTokenData := chainReport.OffchainTokenData[0]

	s := &bcs.Serializer{}

	// 1. source_chain_selector: u64
	s.U64(uint64(chainReport.SourceChainSelector))

	// --- Start Message Header ---
	// 2. message_id: fixed_vector_u8(32)
	if len(message.Header.MessageID) != 32 {
		return nil, fmt.Errorf("invalid message ID length: expected 32, got %d", len(message.Header.MessageID))
	}
	s.FixedBytes(message.Header.MessageID[:])

	// 3. header_source_chain_selector: u64
	s.U64(uint64(message.Header.SourceChainSelector))

	// 4. dest_chain_selector: u64
	s.U64(uint64(message.Header.DestChainSelector))

	// 5. sequence_number: u64
	s.U64(uint64(message.Header.SequenceNumber))

	// 6. nonce: u64
	s.U64(message.Header.Nonce)
	// --- End Message Header ---

	// 7. sender: vector<u8>
	s.WriteBytes(message.Sender)

	// 8. data: vector<u8>
	s.WriteBytes(message.Data)

	// 9. receiver: address (Aptos address, 32 bytes)
	var receiverAddr aptos.AccountAddress
	if err := receiverAddr.ParseStringRelaxed(message.Receiver.String()); err != nil {
		return nil, fmt.Errorf("failed to parse receiver address '%s': %w", message.Receiver.String(), err)
	}
	s.Struct(&receiverAddr)

	// 10. gas_limit: u256
	// Extract gas limit from ExtraArgs
	decodedExtraArgsMap, err := e.extraDataCodec.DecodeExtraArgs(message.ExtraArgs, chainReport.SourceChainSelector)
	if err != nil {
		return nil, fmt.Errorf("failed to decode ExtraArgs: %w", err)
	}
	gasLimit, err := parseExtraDataMap(decodedExtraArgsMap) // Use a helper to extract the gas limit
	if err != nil {
		return nil, fmt.Errorf("failed to extract gas limit from decoded ExtraArgs map: %w", err)
	}
	s.U256(*gasLimit)

	// 11. token_amounts: vector<Any2AptosTokenTransfer>
	bcs.SerializeSequenceWithFunction(message.TokenAmounts, s, func(s *bcs.Serializer, item cciptypes.RampTokenAmount) {
		// 11a. source_pool_address: vector<u8>
		s.WriteBytes(item.SourcePoolAddress)

		// 11b. dest_token_address: address
		var destTokenAddr aptos.AccountAddress
		if err2 := destTokenAddr.ParseStringRelaxed(item.DestTokenAddress.String()); err2 != nil {
			s.SetError(fmt.Errorf("failed to parse dest_token_address '%s': %w", item.DestTokenAddress.String(), err2))
		}
		s.Struct(&destTokenAddr)

		// 11c. dest_gas_amount: u32
		// Extract dest gas amount from DestExecData
		destExecDataDecodedMap, err2 := e.extraDataCodec.DecodeTokenAmountDestExecData(item.DestExecData, chainReport.SourceChainSelector)
		if err2 != nil {
			s.SetError(fmt.Errorf("failed to decode DestExecData for token %s: %w", destTokenAddr.String(), err2))
			return
		}
		destGasAmount, err3 := extractDestGasAmountFromMap(destExecDataDecodedMap)
		if err3 != nil {
			s.SetError(fmt.Errorf("failed to extract dest gas amount from decoded DestExecData map for token %s: %w", destTokenAddr.String(), err3))
			return
		}
		s.U32(destGasAmount)

		// 11d. extra_data: vector<u8>
		s.WriteBytes(item.ExtraData)

		// 11e. amount: u256
		if item.Amount.Int == nil {
			s.SetError(fmt.Errorf("token amount is nil for token %s", destTokenAddr.String()))
			return
		}
		s.U256(*item.Amount.Int)
	})
	if err != nil { // Check error from SerializeSequenceWithFunction itself
		return nil, fmt.Errorf("failed during token_amounts serialization: %w", err)
	}
	if s.Error() != nil { // Check error set within the lambda
		return nil, fmt.Errorf("failed to serialize token_amounts: %w", s.Error())
	}

	// 12. offchain_token_data: vector<vector<u8>>
	bcs.SerializeSequenceWithFunction(offchainTokenData, s, func(s *bcs.Serializer, item []byte) {
		s.WriteBytes(item)
	})
	if err != nil { // Check error from SerializeSequenceWithFunction itself
		return nil, fmt.Errorf("failed during offchain_token_data serialization: %w", err)
	}
	if s.Error() != nil { // Check error set within the lambda (though unlikely here)
		return nil, fmt.Errorf("failed to serialize offchain_token_data: %w", s.Error())
	}

	// 13. proofs: vector<fixed_vector_u8(32)>
	bcs.SerializeSequenceWithFunction(chainReport.Proofs, s, func(s *bcs.Serializer, item cciptypes.Bytes32) {
		if len(item) != 32 {
			s.SetError(fmt.Errorf("invalid proof length: expected 32, got %d", len(item)))
			return
		}
		s.FixedBytes(item[:])
	})
	if err != nil { // Check error from SerializeSequenceWithFunction itself
		return nil, fmt.Errorf("failed during proofs serialization: %w", err)
	}
	if s.Error() != nil { // Check error set within the lambda
		return nil, fmt.Errorf("failed to serialize proofs: %w", s.Error())
	}

	// Final check and return
	if s.Error() != nil {
		return nil, fmt.Errorf("BCS serialization failed: %w", s.Error())
	}

	return s.ToBytes(), nil
}

func (e *ExecutePluginCodecV1) Decode(ctx context.Context, encodedReport []byte) (cciptypes.ExecutePluginReport, error) {
	des := bcs.NewDeserializer(encodedReport)
	report := cciptypes.ExecutePluginReport{}
	var chainReport cciptypes.ExecutePluginReportSingleChain
	var message cciptypes.Message

	// 1. source_chain_selector: u64
	chainReport.SourceChainSelector = cciptypes.ChainSelector(des.U64())
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize source_chain_selector: %w", des.Error())
	}

	// --- Start Message Header ---
	// 2. message_id: fixed_vector_u8(32)
	messageIDBytes := des.ReadFixedBytes(32)
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize message_id: %w", des.Error())
	}
	copy(message.Header.MessageID[:], messageIDBytes)

	// 3. header_source_chain_selector: u64
	message.Header.SourceChainSelector = cciptypes.ChainSelector(des.U64())
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize header_source_chain_selector: %w", des.Error())
	}

	// 4. dest_chain_selector: u64
	message.Header.DestChainSelector = cciptypes.ChainSelector(des.U64())
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize dest_chain_selector: %w", des.Error())
	}

	// 5. sequence_number: u64
	message.Header.SequenceNumber = cciptypes.SeqNum(des.U64())
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize sequence_number: %w", des.Error())
	}

	// 6. nonce: u64
	message.Header.Nonce = des.U64()
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize nonce: %w", des.Error())
	}

	// --- End Message Header ---

	// 7. sender: vector<u8>
	message.Sender = des.ReadBytes()
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize sender: %w", des.Error())
	}

	// 8. data: vector<u8>
	message.Data = des.ReadBytes()
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize data: %w", des.Error())
	}

	// 9. receiver: address
	var receiverAddr aptos.AccountAddress
	des.Struct(&receiverAddr)
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize receiver: %w", des.Error())
	}
	message.Receiver = receiverAddr[:]

	// 10. gas_limit: u256
	_ = des.U256()
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize gas_limit: %w", des.Error())
	}

	// 11. token_amounts: vector<Any2AptosTokenTransfer>
	message.TokenAmounts = bcs.DeserializeSequenceWithFunction(des, func(des *bcs.Deserializer, item *cciptypes.RampTokenAmount) {
		// 11a. source_pool_address: vector<u8>
		item.SourcePoolAddress = des.ReadBytes()
		if des.Error() != nil {
			return // Error handled by caller
		}

		// 11b. dest_token_address: address
		var destTokenAddr aptos.AccountAddress
		des.Struct(&destTokenAddr)
		if des.Error() != nil {
			return // Error handled by caller
		}
		item.DestTokenAddress = destTokenAddr[:]

		// 11c. dest_gas_amount: u32
		destGasAmount := des.U32()
		if des.Error() != nil {
			return // Error handled by caller
		}
		// Encode dest gas amount back into DestExecData
		destData, err := bcs.SerializeU32(destGasAmount)
		if err != nil {
			des.SetError(fmt.Errorf("abi encode dest gas amount: %w", err))
			return
		}
		item.DestExecData = destData

		// 11d. extra_data: vector<u8>
		item.ExtraData = des.ReadBytes()
		if des.Error() != nil {
			return // Error handled by caller
		}

		// 11e. amount: u256
		amountU256 := des.U256()
		if des.Error() != nil {
			return // Error handled by caller
		}
		item.Amount = cciptypes.NewBigInt(&amountU256)
	})
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize token_amounts: %w", des.Error())
	}

	// 12. offchain_token_data: vector<vector<u8>>
	offchainTokenDataGroup := bcs.DeserializeSequenceWithFunction(des, func(des *bcs.Deserializer, item *[]byte) {
		*item = des.ReadBytes()
	})
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize offchain_token_data: %w", des.Error())
	}
	// Wrap it in the expected [][][]byte structure
	chainReport.OffchainTokenData = [][][]byte{offchainTokenDataGroup}

	// 13. proofs: vector<fixed_vector_u8(32)>
	proofsBytes := bcs.DeserializeSequenceWithFunction(des, func(des *bcs.Deserializer, item *[]byte) {
		*item = des.ReadFixedBytes(32)
	})
	if des.Error() != nil {
		return report, fmt.Errorf("failed to deserialize proofs: %w", des.Error())
	}
	// Convert [][]byte to [][32]byte
	chainReport.Proofs = make([]cciptypes.Bytes32, len(proofsBytes))
	for i, proofB := range proofsBytes {
		if len(proofB) != 32 {
			// This shouldn't happen if ReadFixedBytes worked correctly
			return report, fmt.Errorf("internal error: deserialized proof %d has length %d, expected 32", i, len(proofB))
		}
		copy(chainReport.Proofs[i][:], proofB)
	}

	// Check if all bytes were consumed
	if des.Remaining() > 0 {
		return report, fmt.Errorf("unexpected remaining bytes after decoding: %d", des.Remaining())
	}

	// Set empty fields
	message.Header.MsgHash = cciptypes.Bytes32{}
	message.Header.OnRamp = cciptypes.UnknownAddress{}
	message.FeeToken = cciptypes.UnknownAddress{}
	message.ExtraArgs = cciptypes.Bytes{}
	message.FeeTokenAmount = cciptypes.BigInt{}

	// Assemble the final report
	chainReport.Messages = []cciptypes.Message{message}
	// ProofFlagBits is not part of the Aptos report, initialize it empty/zero.
	chainReport.ProofFlagBits = cciptypes.NewBigInt(big.NewInt(0))
	report.ChainReports = []cciptypes.ExecutePluginReportSingleChain{chainReport}

	return report, nil
}

// Ensure ExecutePluginCodec implements the ExecutePluginCodec interface
var _ cciptypes.ExecutePluginCodec = (*ExecutePluginCodecV1)(nil)
