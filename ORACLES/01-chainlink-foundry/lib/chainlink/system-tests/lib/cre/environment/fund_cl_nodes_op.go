package environment

import (
	"math/big"
	"strconv"

	"github.com/Masterminds/semver/v3"
	"github.com/ethereum/go-ethereum/common"
	pkgerrors "github.com/pkg/errors"
	"github.com/rs/zerolog"
	"golang.org/x/sync/errgroup"

	cldf "github.com/smartcontractkit/chainlink-deployments-framework/deployment"
	"github.com/smartcontractkit/chainlink-deployments-framework/operations"
	"github.com/smartcontractkit/chainlink-testing-framework/lib/utils/ptr"

	"github.com/smartcontractkit/chainlink/system-tests/lib/cre"
	libfunding "github.com/smartcontractkit/chainlink/system-tests/lib/funding"
)

type FundCLNodesOpDeps struct {
	Env               *cldf.Environment
	BlockchainOutputs []*cre.WrappedBlockchainOutput
	DonTopology       *cre.DonTopology
}

type FundCLNodesOpInput struct {
	FundAmount int64
}

type FundCLNodesOpOutput struct {
}

var FundCLNodesOp = operations.NewOperation[FundCLNodesOpInput, FundCLNodesOpOutput, FundCLNodesOpDeps](
	"fund-cl-nodes-op",
	semver.MustParse("1.0.0"),
	"Fund Chainlink Nodes",
	func(b operations.Bundle, deps FundCLNodesOpDeps, input FundCLNodesOpInput) (FundCLNodesOpOutput, error) {
		ctx := b.GetContext()
		// Fund the nodes
		concurrentNonceMap, concurrentNonceMapErr := NewConcurrentNonceMap(ctx, deps.BlockchainOutputs)
		if concurrentNonceMapErr != nil {
			return FundCLNodesOpOutput{}, pkgerrors.Wrap(concurrentNonceMapErr, "failed to create concurrent nonce map")
		}

		// Decrement the nonce for each chain, because we will increment it in the next loop
		for _, bcOut := range deps.BlockchainOutputs {
			concurrentNonceMap.Decrement(bcOut.ChainID)
		}

		errGroup := &errgroup.Group{}
		for _, metaDon := range deps.DonTopology.DonsWithMetadata {
			for _, bcOut := range deps.BlockchainOutputs {
				if bcOut.ReadOnly {
					continue
				}
				for _, node := range metaDon.DON.Nodes {
					errGroup.Go(func() error {
						nodeAddress := node.AccountAddr[strconv.FormatUint(bcOut.ChainID, 10)]
						if nodeAddress == "" {
							return nil
						}

						nonce := concurrentNonceMap.Increment(bcOut.ChainID)

						_, fundingErr := libfunding.SendFunds(ctx, zerolog.Logger{}, bcOut.SethClient, libfunding.FundsToSend{
							ToAddress:  common.HexToAddress(nodeAddress),
							Amount:     big.NewInt(input.FundAmount),
							PrivateKey: bcOut.SethClient.MustGetRootPrivateKey(),
							Nonce:      ptr.Ptr(nonce),
						})
						if fundingErr != nil {
							return pkgerrors.Wrapf(fundingErr, "failed to fund node %s", nodeAddress)
						}
						return nil
					})
				}
			}
		}

		if err := errGroup.Wait(); err != nil {
			return FundCLNodesOpOutput{}, pkgerrors.Wrap(err, "failed to fund nodes")
		}

		return FundCLNodesOpOutput{}, nil
	},
)
