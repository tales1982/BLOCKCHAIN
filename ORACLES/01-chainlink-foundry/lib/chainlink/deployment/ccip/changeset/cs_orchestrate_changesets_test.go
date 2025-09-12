package changeset_test

import (
	"encoding/json"
	"errors"
	"fmt"
	"testing"
	"time"

	"github.com/Masterminds/semver/v3"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap/zapcore"

	"github.com/smartcontractkit/mcms"
	"github.com/smartcontractkit/mcms/types"

	cldf "github.com/smartcontractkit/chainlink-deployments-framework/deployment"
	"github.com/smartcontractkit/chainlink-deployments-framework/operations"
	"github.com/smartcontractkit/chainlink-evm/pkg/utils"
	"github.com/smartcontractkit/chainlink/deployment/ccip/changeset"
	"github.com/smartcontractkit/chainlink/deployment/ccip/shared/stateview"
	"github.com/smartcontractkit/chainlink/deployment/common/proposalutils"
	"github.com/smartcontractkit/chainlink/deployment/environment/memory"
	"github.com/smartcontractkit/chainlink/v2/core/logger"

	commonchangeset "github.com/smartcontractkit/chainlink/deployment/common/changeset"
	commontypes "github.com/smartcontractkit/chainlink/deployment/common/types"
)

var multiplyBy2 = operations.NewOperation(
	"multiplyBy2",
	semver.MustParse("1.0.0"),
	"Multiply an integer by 2",
	func(b operations.Bundle, deps any, input int) (int, error) {
		if input == 1234 {
			return 0, errors.New("random error")
		}

		return input * 2, nil
	},
)

type mockChangesetConfig struct {
	Value int
}

var mockV2Changeset = cldf.CreateChangeSet(mockV2ChangesetLogic, mockV2ChangesetPrecondition)

func mockV2ChangesetLogic(e cldf.Environment, c mockChangesetConfig) (cldf.ChangesetOutput, error) {
	report, err := operations.ExecuteOperation(e.OperationsBundle, multiplyBy2, nil, c.Value)
	if err != nil {
		return cldf.ChangesetOutput{}, fmt.Errorf("failed to execute multiplyBy2 operation: %w", err)
	}

	return cldf.ChangesetOutput{
		Reports: []operations.Report[any, any]{report.ToGenericReport()},
		MCMSTimelockProposals: []mcms.TimelockProposal{
			{
				Operations: []types.BatchOperation{
					{
						ChainSelector: types.ChainSelector(e.BlockChains.ListChainSelectors()[0]),
						Transactions: []types.Transaction{
							{
								To:               utils.RandomAddress().Hex(),
								Data:             utils.RandomHash().Bytes(),
								AdditionalFields: json.RawMessage{},
							},
						},
					},
				},
			},
		},
	}, nil
}

func mockV2ChangesetPrecondition(e cldf.Environment, c mockChangesetConfig) error {
	if c.Value == 0 {
		return errors.New("precondition failed: value must not be zero")
	}

	return nil
}

func mockV1Changeset(e cldf.Environment, c mockChangesetConfig) (cldf.ChangesetOutput, error) {
	if err := mockV2ChangesetPrecondition(e, c); err != nil {
		return cldf.ChangesetOutput{}, err
	}

	return mockV2ChangesetLogic(e, c)
}

func newMemoryEnvWithMCMS(t *testing.T) cldf.Environment {
	lggr := logger.TestLogger(t)
	env := memory.NewMemoryEnvironment(t, lggr, zapcore.DebugLevel, memory.MemoryEnvironmentConfig{
		Chains: 1,
	})
	env, _, err := commonchangeset.ApplyChangesets(t, env, []commonchangeset.ConfiguredChangeSet{
		commonchangeset.Configure(
			cldf.CreateLegacyChangeSet(commonchangeset.DeployMCMSWithTimelockV2),
			map[uint64]commontypes.MCMSWithTimelockConfigV2{
				env.BlockChains.ListChainSelectors()[0]: proposalutils.SingleGroupTimelockConfigV2(t),
			},
		),
	})
	if err != nil {
		t.Fatalf("failed to apply MCMS changeset: %v", err)
	}

	return env
}

func TestOrchestrateChangesets_VerifyPreconditions(t *testing.T) {
	t.Run("description failure", func(t *testing.T) {
		lggr := logger.TestLogger(t)
		env := memory.NewMemoryEnvironment(t, lggr, zapcore.DebugLevel, memory.MemoryEnvironmentConfig{})
		err := changeset.OrchestrateChangesets.VerifyPreconditions(env, changeset.OrchestrateChangesetsConfig{})
		require.ErrorContains(t, err, "description must not be empty")
	})

	t.Run("mcms failure", func(t *testing.T) {
		lggr := logger.TestLogger(t)
		env := memory.NewMemoryEnvironment(t, lggr, zapcore.DebugLevel, memory.MemoryEnvironmentConfig{})
		err := changeset.OrchestrateChangesets.VerifyPreconditions(env, changeset.OrchestrateChangesetsConfig{
			Description: "Test orchestrate changesets",
		})
		require.ErrorContains(t, err, "mcms must not be nil")
	})

	t.Run("precondition failure", func(t *testing.T) {
		lggr := logger.TestLogger(t)
		env := memory.NewMemoryEnvironment(t, lggr, zapcore.DebugLevel, memory.MemoryEnvironmentConfig{})
		err := changeset.OrchestrateChangesets.VerifyPreconditions(env, changeset.OrchestrateChangesetsConfig{
			Description: "Test orchestrate changesets",
			MCMS: &proposalutils.TimelockConfig{
				MinDelay: 0 * time.Second,
			},
			ChangeSets: []changeset.WithConfig{
				changeset.CreateGenericChangeSetWithConfig(
					cldf.CreateLegacyChangeSet(mockV1Changeset),
					mockChangesetConfig{Value: 1},
				),
				changeset.CreateGenericChangeSetWithConfig(
					mockV2Changeset,
					mockChangesetConfig{Value: 0}, // This will trigger the precondition failure
				),
			},
		})
		require.ErrorContains(t, err, "value must not be zero")
	})

	t.Run("success", func(t *testing.T) {
		lggr := logger.TestLogger(t)
		env := memory.NewMemoryEnvironment(t, lggr, zapcore.DebugLevel, memory.MemoryEnvironmentConfig{})
		err := changeset.OrchestrateChangesets.VerifyPreconditions(env, changeset.OrchestrateChangesetsConfig{
			Description: "Test orchestrate changesets",
			MCMS: &proposalutils.TimelockConfig{
				MinDelay: 0 * time.Second,
			},
			ChangeSets: []changeset.WithConfig{
				changeset.CreateGenericChangeSetWithConfig(
					cldf.CreateLegacyChangeSet(mockV1Changeset),
					mockChangesetConfig{Value: 1},
				),
				changeset.CreateGenericChangeSetWithConfig(
					mockV2Changeset,
					mockChangesetConfig{Value: 1},
				),
			},
		})
		require.NoError(t, err)
	})
}

func TestOrchestrateChangesets_Apply(t *testing.T) {
	t.Run("first fails", func(t *testing.T) {
		env := newMemoryEnvWithMCMS(t)
		output, err := changeset.OrchestrateChangesets.Apply(env, changeset.OrchestrateChangesetsConfig{
			Description: "Test orchestrate changesets",
			MCMS: &proposalutils.TimelockConfig{
				MinDelay: 0 * time.Second,
			},
			ChangeSets: []changeset.WithConfig{
				changeset.CreateGenericChangeSetWithConfig(
					cldf.CreateLegacyChangeSet(mockV1Changeset),
					mockChangesetConfig{Value: 1234},
				),
				changeset.CreateGenericChangeSetWithConfig(
					mockV2Changeset,
					mockChangesetConfig{Value: 1},
				),
			},
		})
		require.Error(t, err)
		require.Empty(t, output.Reports)
	})

	t.Run("first succeeds, second fails", func(t *testing.T) {
		env := newMemoryEnvWithMCMS(t)
		output, err := changeset.OrchestrateChangesets.Apply(env, changeset.OrchestrateChangesetsConfig{
			Description: "Test orchestrate changesets",
			MCMS: &proposalutils.TimelockConfig{
				MinDelay: 0 * time.Second,
			},
			ChangeSets: []changeset.WithConfig{
				changeset.CreateGenericChangeSetWithConfig(
					cldf.CreateLegacyChangeSet(mockV1Changeset),
					mockChangesetConfig{Value: 1},
				),
				changeset.CreateGenericChangeSetWithConfig(
					mockV2Changeset,
					mockChangesetConfig{Value: 1234},
				),
			},
		})
		require.Error(t, err)
		require.Len(t, output.Reports, 1)
		require.Equal(t, 2, output.Reports[0].Output)
		require.Empty(t, output.MCMSTimelockProposals)
	})

	t.Run("both succeed", func(t *testing.T) {
		env := newMemoryEnvWithMCMS(t)
		output, err := changeset.OrchestrateChangesets.Apply(env, changeset.OrchestrateChangesetsConfig{
			Description: "Test orchestrate changesets",
			MCMS: &proposalutils.TimelockConfig{
				MinDelay: 0 * time.Second,
			},
			ChangeSets: []changeset.WithConfig{
				changeset.CreateGenericChangeSetWithConfig(
					cldf.CreateLegacyChangeSet(mockV1Changeset),
					mockChangesetConfig{Value: 1},
				),
				changeset.CreateGenericChangeSetWithConfig(
					mockV2Changeset,
					mockChangesetConfig{Value: 2},
				),
			},
		})
		require.NoError(t, err)
		require.Len(t, output.Reports, 2)
		require.Equal(t, 2, output.Reports[0].Output)
		require.Equal(t, 4, output.Reports[1].Output)
		require.Len(t, output.MCMSTimelockProposals, 1)
		require.Len(t, output.MCMSTimelockProposals[0].Operations, 2)
		require.Len(t, output.MCMSTimelockProposals[0].Operations[0].Transactions, 1)
		require.Len(t, output.MCMSTimelockProposals[0].Operations[1].Transactions, 1)
	})
}

func TestOrchestrateChangesetsConfig_MCMSGetsOverridden(t *testing.T) {
	env := newMemoryEnvWithMCMS(t)
	state, err := stateview.LoadOnchainState(env)
	require.NoError(t, err)

	chainSelector := env.BlockChains.ListChainSelectors()[0]
	// Use random addresses for overrides
	// Canceller left empty to test that it is not overridden
	override := changeset.MCMSAddressesForEVM{
		Bypasser: utils.RandomAddress(),
		Proposer: utils.RandomAddress(),
	}
	cfg := changeset.OrchestrateChangesetsConfig{
		Description: "Test MCMS override",
		MCMS:        &proposalutils.TimelockConfig{MinDelay: 0},
		ChangeSets:  nil,
		MCMSOverridesForEVMChains: map[uint64]changeset.MCMSAddressesForEVM{
			chainSelector: override,
		},
	}

	evmState, err := cfg.EVMMCMSStateByChain(env, state)
	require.NoError(t, err)
	require.Contains(t, evmState, chainSelector)

	// The MCMS contract addresses should match the override, except for canceller
	require.Equal(t, state.Chains[chainSelector].CancellerMcm.Address(), evmState[chainSelector].CancellerMcm.Address())
	require.Equal(t, override.Bypasser, evmState[chainSelector].BypasserMcm.Address())
	require.Equal(t, override.Proposer, evmState[chainSelector].ProposerMcm.Address())
}
