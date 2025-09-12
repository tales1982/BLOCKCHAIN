package workflowregistry

import (
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/smartcontractkit/chainlink-common/pkg/logger"
	workflow_registry "github.com/smartcontractkit/chainlink-evm/gethwrappers/workflow/generated/workflow_registry_wrapper_v1"

	cldf_chain "github.com/smartcontractkit/chainlink-deployments-framework/chain"
	cldf_evm "github.com/smartcontractkit/chainlink-deployments-framework/chain/evm"
	cldf "github.com/smartcontractkit/chainlink-deployments-framework/deployment"

	"github.com/smartcontractkit/chainlink/deployment/environment/memory"
	"github.com/smartcontractkit/chainlink/deployment/keystone/changeset"
)

type SetupTestWorkflowRegistryResponse struct {
	Registry         *workflow_registry.WorkflowRegistry
	Chain            cldf_evm.Chain
	RegistrySelector uint64
	AddressBook      cldf.AddressBook
}

func SetupTestWorkflowRegistry(t *testing.T, lggr logger.Logger, chainSel uint64) *SetupTestWorkflowRegistryResponse {
	chain := testChain(t)

	deployer, err := newWorkflowRegistryDeployer()
	require.NoError(t, err)
	resp, err := deployer.Deploy(changeset.DeployRequest{Chain: chain})
	require.NoError(t, err)

	addressBook := cldf.NewMemoryAddressBookFromMap(
		map[uint64]map[string]cldf.TypeAndVersion{
			chainSel: map[string]cldf.TypeAndVersion{
				resp.Address.Hex(): resp.Tv,
			},
		},
	)

	return &SetupTestWorkflowRegistryResponse{
		Registry:         deployer.Contract(),
		Chain:            chain,
		RegistrySelector: chain.Selector,
		AddressBook:      addressBook,
	}
}

func testChain(t *testing.T) cldf_evm.Chain {
	chains := cldf_chain.NewBlockChainsFromSlice(memory.NewMemoryChainsEVM(t, 1, 5))
	require.NotEmpty(t, chains)

	return chains.EVMChains()[chains.ListChainSelectors()[0]]
}
