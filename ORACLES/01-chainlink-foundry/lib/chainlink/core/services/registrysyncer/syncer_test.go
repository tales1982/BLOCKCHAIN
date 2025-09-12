package registrysyncer_test

import (
	"context"
	"crypto/rand"
	"encoding/json"
	"errors"
	"fmt"
	"math/big"
	"sync"
	"testing"
	"time"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	gethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/eth/ethconfig"
	"github.com/ethereum/go-ethereum/ethclient/simulated"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap/zapcore"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/durationpb"

	p2ptypes "github.com/smartcontractkit/libocr/ragep2p/types"

	"github.com/smartcontractkit/chainlink-common/pkg/capabilities"
	capabilitiespb "github.com/smartcontractkit/chainlink-common/pkg/capabilities/pb"
	"github.com/smartcontractkit/chainlink-common/pkg/types"
	"github.com/smartcontractkit/chainlink-common/pkg/values"
	kcr_v1 "github.com/smartcontractkit/chainlink-evm/gethwrappers/keystone/generated/capabilities_registry_1_1_0"
	kcr_v2 "github.com/smartcontractkit/chainlink-evm/gethwrappers/workflow/generated/capabilities_registry_wrapper_v2"
	evmclient "github.com/smartcontractkit/chainlink-evm/pkg/client"
	"github.com/smartcontractkit/chainlink-evm/pkg/heads/headstest"
	"github.com/smartcontractkit/chainlink-evm/pkg/logpoller"
	evmtestutils "github.com/smartcontractkit/chainlink-evm/pkg/testutils"
	"github.com/smartcontractkit/chainlink/v2/core/logger"

	"github.com/smartcontractkit/chainlink/v2/core/internal/testutils"
	"github.com/smartcontractkit/chainlink/v2/core/internal/testutils/pgtest"
	"github.com/smartcontractkit/chainlink/v2/core/services/registrysyncer"
	syncerMocks "github.com/smartcontractkit/chainlink/v2/core/services/registrysyncer/mocks"
	"github.com/smartcontractkit/chainlink/v2/core/services/relay/evm"
	evmrelaytypes "github.com/smartcontractkit/chainlink/v2/core/services/relay/evm/types"

	captestutils "github.com/smartcontractkit/chainlink/v2/core/services/relay/evm/capabilities/testutils"
)

var writeChainCapability = kcr_v1.CapabilitiesRegistryCapability{
	LabelledName:   "write-chain",
	Version:        "1.0.1",
	CapabilityType: uint8(3),
}

func startNewChainWithRegistry(t *testing.T) (*kcr_v1.CapabilitiesRegistry, common.Address, *bind.TransactOpts, *simulated.Backend) {
	owner := evmtestutils.MustNewSimTransactor(t)

	i := &big.Int{}
	oneEth, _ := i.SetString("100000000000000000000", 10)
	gasLimit := ethconfig.Defaults.Miner.GasCeil * 2 // 60 M blocks

	simulatedBackend := simulated.NewBackend(gethtypes.GenesisAlloc{owner.From: {
		Balance: oneEth,
	}}, simulated.WithBlockGasLimit(gasLimit))
	simulatedBackend.Commit()

	CapabilitiesRegistryAddress, _, CapabilitiesRegistry, err := kcr_v1.DeployCapabilitiesRegistry(owner, simulatedBackend.Client())
	require.NoError(t, err, "DeployCapabilitiesRegistry failed")

	fmt.Println("Deployed CapabilitiesRegistry at", CapabilitiesRegistryAddress.Hex())
	simulatedBackend.Commit()

	return CapabilitiesRegistry, CapabilitiesRegistryAddress, owner, simulatedBackend
}

type crFactory struct {
	lggr      logger.Logger
	ht        logpoller.HeadTracker
	logPoller logpoller.LogPoller
	client    evmclient.Client
}

func (c *crFactory) NewContractReader(ctx context.Context, cfg []byte) (types.ContractReader, error) {
	crCfg := &evmrelaytypes.ChainReaderConfig{}
	if err := json.Unmarshal(cfg, crCfg); err != nil {
		return nil, err
	}

	svc, err := evm.NewChainReaderService(ctx, c.lggr, c.logPoller, c.ht, c.client, *crCfg)
	if err != nil {
		return nil, err
	}

	return svc, nil
}

func newContractReaderFactory(t *testing.T, simulatedBackend *simulated.Backend) *crFactory {
	lggr := logger.TestLogger(t)
	client := evmclient.NewSimulatedBackendClient(
		t,
		simulatedBackend,
		testutils.SimulatedChainID,
	)
	db := pgtest.NewSqlxDB(t)
	const finalityDepth = 2
	ht := headstest.NewSimulatedHeadTracker(client, false, finalityDepth)
	lp := logpoller.NewLogPoller(
		logpoller.NewORM(testutils.SimulatedChainID, db, lggr),
		client,
		lggr,
		ht,
		logpoller.Opts{
			PollPeriod:               100 * time.Millisecond,
			FinalityDepth:            finalityDepth,
			BackfillBatchSize:        3,
			RPCBatchSize:             2,
			KeepFinalizedBlocksDepth: 1000,
		},
	)
	return &crFactory{
		lggr:      lggr,
		client:    client,
		ht:        ht,
		logPoller: lp,
	}
}

func randomWord() [32]byte {
	word := make([]byte, 32)
	_, err := rand.Read(word)
	if err != nil {
		panic(err)
	}
	return [32]byte(word)
}

type launcher struct {
	localRegistry *registrysyncer.LocalRegistry
	mu            sync.RWMutex
}

func (l *launcher) OnNewRegistry(_ context.Context, localRegistry *registrysyncer.LocalRegistry) error {
	l.mu.Lock()
	defer l.mu.Unlock()
	l.localRegistry = localRegistry
	return nil
}

type orm struct {
	ormMock               *syncerMocks.ORM
	mu                    sync.RWMutex
	latestLocalRegistryCh chan struct{}
	addLocalRegistryCh    chan struct{}
}

func newORM(t *testing.T) *orm {
	t.Helper()

	return &orm{
		ormMock:               syncerMocks.NewORM(t),
		latestLocalRegistryCh: make(chan struct{}, 1),
		addLocalRegistryCh:    make(chan struct{}, 1),
	}
}

func (o *orm) Cleanup() {
	o.mu.Lock()
	defer o.mu.Unlock()
	close(o.latestLocalRegistryCh)
	close(o.addLocalRegistryCh)
}

func (o *orm) AddLocalRegistry(ctx context.Context, localRegistry registrysyncer.LocalRegistry) error {
	o.mu.Lock()
	defer o.mu.Unlock()
	o.addLocalRegistryCh <- struct{}{}
	err := o.ormMock.AddLocalRegistry(ctx, localRegistry)
	return err
}

func (o *orm) LatestLocalRegistry(ctx context.Context) (*registrysyncer.LocalRegistry, error) {
	o.mu.Lock()
	defer o.mu.Unlock()
	o.latestLocalRegistryCh <- struct{}{}
	return o.ormMock.LatestLocalRegistry(ctx)
}

func toPeerIDs(ids [][32]byte) []p2ptypes.PeerID {
	var pids []p2ptypes.PeerID
	for _, id := range ids {
		pids = append(pids, id)
	}
	return pids
}

func TestReader_Integration(t *testing.T) {
	ctx := testutils.Context(t)
	reg, regAddress, owner, sim := startNewChainWithRegistry(t)

	_, err := reg.AddCapabilities(owner, []kcr_v1.CapabilitiesRegistryCapability{writeChainCapability})
	require.NoError(t, err, "AddCapability failed for %s", writeChainCapability.LabelledName)
	sim.Commit()

	cid := fmt.Sprintf("%s@%s", writeChainCapability.LabelledName, writeChainCapability.Version)

	hid, err := reg.GetHashedCapabilityId(&bind.CallOpts{}, writeChainCapability.LabelledName, writeChainCapability.Version)
	require.NoError(t, err)

	_, err = reg.AddNodeOperators(owner, []kcr_v1.CapabilitiesRegistryNodeOperator{
		{
			Admin: owner.From,
			Name:  "TEST_NOP",
		},
	})
	require.NoError(t, err)
	sim.Commit()

	nodeSet := [][32]byte{
		randomWord(),
		randomWord(),
		randomWord(),
	}

	signersSet := [][32]byte{
		randomWord(),
		randomWord(),
		randomWord(),
	}

	encPubKey1 := randomWord()
	encPubKey2 := randomWord()
	encPubKey3 := randomWord()

	nodes := []kcr_v1.CapabilitiesRegistryNodeParams{
		{
			// The first NodeOperatorId has id 1 since the id is auto-incrementing.
			NodeOperatorId:      uint32(1),
			Signer:              signersSet[0],
			P2pId:               nodeSet[0],
			EncryptionPublicKey: encPubKey1,
			HashedCapabilityIds: [][32]byte{hid},
		},
		{
			// The first NodeOperatorId has id 1 since the id is auto-incrementing.
			NodeOperatorId:      uint32(1),
			Signer:              signersSet[1],
			P2pId:               nodeSet[1],
			EncryptionPublicKey: encPubKey2,
			HashedCapabilityIds: [][32]byte{hid},
		},
		{
			// The first NodeOperatorId has id 1 since the id is auto-incrementing.
			NodeOperatorId:      uint32(1),
			Signer:              signersSet[2],
			P2pId:               nodeSet[2],
			EncryptionPublicKey: encPubKey3,
			HashedCapabilityIds: [][32]byte{hid},
		},
	}
	_, err = reg.AddNodes(owner, nodes)
	require.NoError(t, err)
	sim.Commit()

	config := &capabilitiespb.CapabilityConfig{
		DefaultConfig: values.Proto(values.EmptyMap()).GetMapValue(),
		RemoteConfig: &capabilitiespb.CapabilityConfig_RemoteTriggerConfig{
			RemoteTriggerConfig: &capabilitiespb.RemoteTriggerConfig{
				RegistrationRefresh: durationpb.New(20 * time.Second),
				RegistrationExpiry:  durationpb.New(60 * time.Second),
				// F + 1
				MinResponsesToAggregate: uint32(1) + 1,
				MessageExpiry:           durationpb.New(120 * time.Second),
			},
		},
	}
	configb, err := proto.Marshal(config)
	if err != nil {
		panic(err)
	}

	cfgs := []kcr_v1.CapabilitiesRegistryCapabilityConfiguration{
		{
			CapabilityId: hid,
			Config:       configb,
		},
	}
	_, err = reg.AddDON(
		owner,
		nodeSet,
		cfgs,
		true,
		true,
		1,
	)
	sim.Commit()

	require.NoError(t, err)

	db := pgtest.NewSqlxDB(t)
	factory := newContractReaderFactory(t, sim)
	syncerORM := registrysyncer.NewORM(db, logger.TestLogger(t))
	syncer, err := registrysyncer.New(logger.TestLogger(t), func() (p2ptypes.PeerID, error) { return p2ptypes.PeerID{}, nil }, factory, regAddress.Hex(), syncerORM)
	require.NoError(t, err)

	l := &launcher{}
	syncer.AddListener(l)

	err = syncer.Sync(ctx, false) // not looking to load from the DB in this specific test.
	s := l.localRegistry
	require.NoError(t, err)
	assert.Len(t, s.IDsToCapabilities, 1)

	gotCap := s.IDsToCapabilities[cid]
	assert.Equal(t, registrysyncer.Capability{
		CapabilityType: capabilities.CapabilityTypeTarget,
		ID:             "write-chain@1.0.1",
	}, gotCap)

	assert.Len(t, s.IDsToDONs, 1)
	expectedDON := capabilities.DON{
		ID:               1,
		ConfigVersion:    1,
		IsPublic:         true,
		AcceptsWorkflows: true,
		F:                1,
		Members:          toPeerIDs(nodeSet),
	}
	gotDon := s.IDsToDONs[1]
	assert.Equal(t, expectedDON, gotDon.DON)
	assert.Equal(t, configb, gotDon.CapabilityConfigurations[cid].Config)

	nodesInfo := []kcr_v1.INodeInfoProviderNodeInfo{
		{
			// The first NodeOperatorId has id 1 since the id is auto-incrementing.
			NodeOperatorId:      uint32(1),
			ConfigCount:         1,
			WorkflowDONId:       1,
			Signer:              signersSet[0],
			P2pId:               nodeSet[0],
			EncryptionPublicKey: encPubKey1,
			HashedCapabilityIds: [][32]byte{hid},
			CapabilitiesDONIds:  []*big.Int{},
		},
		{
			// The first NodeOperatorId has id 1 since the id is auto-incrementing.
			NodeOperatorId:      uint32(1),
			ConfigCount:         1,
			WorkflowDONId:       1,
			Signer:              signersSet[1],
			P2pId:               nodeSet[1],
			EncryptionPublicKey: encPubKey2,
			HashedCapabilityIds: [][32]byte{hid},
			CapabilitiesDONIds:  []*big.Int{},
		},
		{
			// The first NodeOperatorId has id 1 since the id is auto-incrementing.
			NodeOperatorId:      uint32(1),
			ConfigCount:         1,
			WorkflowDONId:       1,
			Signer:              signersSet[2],
			P2pId:               nodeSet[2],
			EncryptionPublicKey: encPubKey3,
			HashedCapabilityIds: [][32]byte{hid},
			CapabilitiesDONIds:  []*big.Int{},
		},
	}

	assert.Len(t, s.IDsToNodes, 3)
	assert.Equal(t, map[p2ptypes.PeerID]kcr_v1.INodeInfoProviderNodeInfo{
		nodeSet[0]: nodesInfo[0],
		nodeSet[1]: nodesInfo[1],
		nodeSet[2]: nodesInfo[2],
	}, s.IDsToNodes)
}

func TestSyncer_DBIntegration(t *testing.T) {
	ctx := testutils.Context(t)
	reg, regAddress, owner, sim := startNewChainWithRegistry(t)

	_, err := reg.AddCapabilities(owner, []kcr_v1.CapabilitiesRegistryCapability{writeChainCapability})
	require.NoError(t, err, "AddCapability failed for %s", writeChainCapability.LabelledName)
	sim.Commit()

	cid, err := reg.GetHashedCapabilityId(&bind.CallOpts{}, writeChainCapability.LabelledName, writeChainCapability.Version)
	require.NoError(t, err)

	_, err = reg.AddNodeOperators(owner, []kcr_v1.CapabilitiesRegistryNodeOperator{
		{
			Admin: owner.From,
			Name:  "TEST_NOP",
		},
	})
	require.NoError(t, err)
	sim.Commit()

	nodeSet := [][32]byte{
		randomWord(),
		randomWord(),
		randomWord(),
	}

	signersSet := [][32]byte{
		randomWord(),
		randomWord(),
		randomWord(),
	}

	nodes := []kcr_v1.CapabilitiesRegistryNodeParams{
		{
			// The first NodeOperatorId has id 1 since the id is auto-incrementing.
			NodeOperatorId:      uint32(1),
			Signer:              signersSet[0],
			P2pId:               nodeSet[0],
			EncryptionPublicKey: randomWord(),
			HashedCapabilityIds: [][32]byte{cid},
		},
		{
			// The first NodeOperatorId has id 1 since the id is auto-incrementing.
			NodeOperatorId:      uint32(1),
			Signer:              signersSet[1],
			P2pId:               nodeSet[1],
			EncryptionPublicKey: randomWord(),
			HashedCapabilityIds: [][32]byte{cid},
		},
		{
			// The first NodeOperatorId has id 1 since the id is auto-incrementing.
			NodeOperatorId:      uint32(1),
			Signer:              signersSet[2],
			P2pId:               nodeSet[2],
			EncryptionPublicKey: randomWord(),
			HashedCapabilityIds: [][32]byte{cid},
		},
	}
	_, err = reg.AddNodes(owner, nodes)
	require.NoError(t, err)
	sim.Commit()

	config := &capabilitiespb.CapabilityConfig{
		DefaultConfig: values.Proto(values.EmptyMap()).GetMapValue(),
		RemoteConfig: &capabilitiespb.CapabilityConfig_RemoteTriggerConfig{
			RemoteTriggerConfig: &capabilitiespb.RemoteTriggerConfig{
				RegistrationRefresh: durationpb.New(20 * time.Second),
				RegistrationExpiry:  durationpb.New(60 * time.Second),
				// F + 1
				MinResponsesToAggregate: uint32(1) + 1,
			},
		},
	}
	configb, err := proto.Marshal(config)
	require.NoError(t, err)

	cfgs := []kcr_v1.CapabilitiesRegistryCapabilityConfiguration{
		{
			CapabilityId: cid,
			Config:       configb,
		},
	}
	_, err = reg.AddDON(
		owner,
		nodeSet,
		cfgs,
		true,
		true,
		1,
	)
	require.NoError(t, err)
	sim.Commit()

	factory := newContractReaderFactory(t, sim)
	syncerORM := newORM(t)
	syncerORM.ormMock.On("LatestLocalRegistry", mock.Anything).Return(nil, errors.New("no state found"))
	syncerORM.ormMock.On("AddLocalRegistry", mock.Anything, mock.Anything).Return(nil)
	syncer, err := newTestSyncer(logger.TestLogger(t), func() (p2ptypes.PeerID, error) { return p2ptypes.PeerID{}, nil }, factory, regAddress.Hex(), syncerORM)
	require.NoError(t, err)
	require.NoError(t, syncer.Start(ctx))
	t.Cleanup(func() {
		syncerORM.Cleanup()
		require.NoError(t, syncer.Close())
	})

	l := &launcher{}
	syncer.AddListener(l)

	var latestLocalRegistryCalled, addLocalRegistryCalled bool
	timeout := time.After(testutils.WaitTimeout(t))

	for !latestLocalRegistryCalled || !addLocalRegistryCalled {
		select {
		case val := <-syncerORM.latestLocalRegistryCh:
			assert.Equal(t, struct{}{}, val)
			latestLocalRegistryCalled = true
		case val := <-syncerORM.addLocalRegistryCh:
			assert.Equal(t, struct{}{}, val)
			addLocalRegistryCalled = true
		case <-timeout:
			t.Fatal("test timed out; channels did not received data")
		}
	}
}

func TestSyncer_LocalNode(t *testing.T) {
	ctx := t.Context()
	lggr := logger.TestLogger(t)

	var pid p2ptypes.PeerID
	err := pid.UnmarshalText([]byte("12D3KooWBCF1XT5Wi8FzfgNCqRL76Swv8TRU3TiD4QiJm8NMNX7N"))
	require.NoError(t, err)

	workflowDonNodes := []p2ptypes.PeerID{
		pid,
		randomWord(),
		randomWord(),
		randomWord(),
	}

	dID := uint32(1)
	// The below state describes a Workflow DON (AcceptsWorkflows = true),
	// which exposes the streams-trigger and write_chain capabilities.
	// We expect receivers to be wired up and both capabilities to be added to the registry.
	localRegistry := registrysyncer.NewLocalRegistry(
		lggr,
		func() (p2ptypes.PeerID, error) { return pid, nil },
		map[registrysyncer.DonID]registrysyncer.DON{
			registrysyncer.DonID(dID): {
				DON: capabilities.DON{
					ID:               dID,
					ConfigVersion:    uint32(2),
					F:                uint8(1),
					IsPublic:         true,
					AcceptsWorkflows: true,
					Members:          workflowDonNodes,
				},
			},
		},
		map[p2ptypes.PeerID]kcr_v1.INodeInfoProviderNodeInfo{
			workflowDonNodes[0]: {
				NodeOperatorId:      1,
				Signer:              randomWord(),
				P2pId:               workflowDonNodes[0],
				EncryptionPublicKey: randomWord(),
			},
			workflowDonNodes[1]: {
				NodeOperatorId:      1,
				Signer:              randomWord(),
				P2pId:               workflowDonNodes[1],
				EncryptionPublicKey: randomWord(),
			},
			workflowDonNodes[2]: {
				NodeOperatorId:      1,
				Signer:              randomWord(),
				P2pId:               workflowDonNodes[2],
				EncryptionPublicKey: randomWord(),
			},
			workflowDonNodes[3]: {
				NodeOperatorId:      1,
				Signer:              randomWord(),
				P2pId:               workflowDonNodes[3],
				EncryptionPublicKey: randomWord(),
			},
		},
		map[string]registrysyncer.Capability{
			"test-target@1.0.0": {
				CapabilityType: capabilities.CapabilityTypeTarget,
				ID:             "write-chain@1.0.1",
			},
		},
	)

	node, err := localRegistry.LocalNode(ctx)
	require.NoError(t, err)

	don := capabilities.DON{
		ID:               dID,
		ConfigVersion:    2,
		Members:          workflowDonNodes,
		F:                1,
		IsPublic:         true,
		AcceptsWorkflows: true,
	}
	expectedNode := capabilities.Node{
		PeerID:              &pid,
		NodeOperatorID:      1,
		Signer:              localRegistry.IDsToNodes[pid].Signer,
		EncryptionPublicKey: localRegistry.IDsToNodes[pid].EncryptionPublicKey,
		WorkflowDON:         don,
		CapabilityDONs:      []capabilities.DON{don},
	}
	assert.Equal(t, expectedNode, node)
}

func TestSyncer_V2Unsupported(t *testing.T) {
	ctx := testutils.Context(t)
	lggr, _ := logger.TestLoggerObserved(t, zapcore.DPanicLevel)
	backendTH := captestutils.NewEVMBackendTH(t)

	// Deploy a test V2 capabilities registry
	regAddress, _, _, err := kcr_v2.DeployCapabilitiesRegistry(backendTH.ContractsOwner, backendTH.Backend.Client(), kcr_v2.CapabilitiesRegistryConstructorParams{})
	require.NoError(t, err, "DeployCapabilitiesRegistry failed")
	backendTH.Backend.Commit()
	backendTH.Backend.Commit()
	backendTH.Backend.Commit()
	require.NoError(t, err)

	db := pgtest.NewSqlxDB(t)

	syncerORM := registrysyncer.NewORM(db, lggr)
	testContractReaderFactory := &testContractReaderFactory{
		backendTH: backendTH,
		t:         t,
	}

	syncer, err := registrysyncer.New(
		lggr,
		func() (p2ptypes.PeerID, error) { return p2ptypes.PeerID{}, nil },
		testContractReaderFactory,
		regAddress.Hex(),
		syncerORM,
	)
	require.NoError(t, err)

	// Add a launcher like in TestReader_Integration
	l := &launcher{}
	syncer.AddListener(l)

	// Call Sync directly - this should return an error for V2 contracts
	err = syncer.Sync(ctx, false)
	require.Error(t, err)

	time.Sleep(500 * time.Millisecond) // Allow some time for the syncer to start
	require.Contains(t, err.Error(), "unsupported version 2.0.0")
}

// Add this helper struct to implement the ContractReaderFactory interface
type testContractReaderFactory struct {
	backendTH *captestutils.EVMBackendTH
	t         *testing.T
}

func (f *testContractReaderFactory) NewContractReader(ctx context.Context, bytes []byte) (types.ContractReader, error) {
	return f.backendTH.NewContractReader(ctx, f.t, bytes)
}

func newTestSyncer(
	lggr logger.Logger,
	getPeerID func() (p2ptypes.PeerID, error),
	relayer registrysyncer.ContractReaderFactory,
	registryAddress string,
	orm *orm,
) (registrysyncer.RegistrySyncer, error) {
	rs, err := registrysyncer.New(lggr, getPeerID, relayer, registryAddress, orm)
	if err != nil {
		return nil, err
	}
	return rs, nil
}
