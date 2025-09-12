package versioning

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/Masterminds/semver/v3"

	commontypes "github.com/smartcontractkit/chainlink-common/pkg/types"
	"github.com/smartcontractkit/chainlink-common/pkg/types/query/primitives"
	"github.com/smartcontractkit/chainlink-evm/gethwrappers/shared/generated/type_and_version"
	"github.com/smartcontractkit/chainlink/v2/core/services/relay/evm/types"
)

type ContractType string

const (
	// default version to use when TypeAndVersion is missing.
	defaultVersion = "1.0.0"
	ContractName   = "TypeAndVersion"
	MethodName     = "typeAndVersion"
)

var (
	Unknown             ContractType = "Unknown" // contracts which have no TypeAndVersion
	ErrNoContractReader              = errors.New("no contract reader returned by factory")
)

type ContractReaderFactory func(context.Context, []byte) (commontypes.ContractReader, error)

func VerifyTypeAndVersion(ctx context.Context, addr string, crFactory ContractReaderFactory, expectedType ContractType) (semver.Version, error) {
	contractType, version, err := TypeAndVersion(ctx, addr, crFactory)
	if err != nil {
		return semver.Version{}, fmt.Errorf("failed getting type and version %w", err)
	}
	if contractType != expectedType {
		return semver.Version{}, fmt.Errorf("wrong contract type %s", contractType)
	}
	return version, nil
}

func TypeAndVersion(ctx context.Context, addr string, crFactory ContractReaderFactory) (ContractType, semver.Version, error) {
	cfg := types.ChainReaderConfig{
		Contracts: map[string]types.ChainContractReader{
			ContractName: {
				ContractABI: type_and_version.ITypeAndVersionABI,
				Configs: map[string]*types.ChainReaderDefinition{
					MethodName: {
						ChainSpecificName: MethodName,
						ReadType:          types.Method,
					},
				},
			},
		},
	}
	marshalledCfg, err := json.Marshal(cfg)
	if err != nil {
		return "", semver.Version{}, err
	}

	reader, err := crFactory(ctx, marshalledCfg)
	if err != nil {
		return "", semver.Version{}, err
	}
	if reader == nil {
		return "", semver.Version{}, ErrNoContractReader
	}

	bc := commontypes.BoundContract{
		Name:    ContractName,
		Address: addr,
	}
	err = reader.Bind(ctx, []commontypes.BoundContract{bc})
	if err != nil {
		return "", semver.Version{}, err
	}
	err = reader.Start(ctx)
	if err != nil {
		return "", semver.Version{}, err
	}

	var typeAndVersion string
	err = reader.GetLatestValue(ctx, bc.ReadIdentifier(MethodName), primitives.Finalized, map[string]any{}, &typeAndVersion)
	if err != nil {
		return "", semver.Version{}, err
	}

	err = reader.Unbind(ctx, []commontypes.BoundContract{bc})
	if err != nil {
		return "", semver.Version{}, err
	}
	err = reader.Close()
	if err != nil {
		return "", semver.Version{}, err
	}

	contractType, versionStr, err := ParseTypeAndVersion(typeAndVersion)
	if err != nil {
		return "", semver.Version{}, err
	}
	v, err := semver.NewVersion(versionStr)
	if err != nil {
		return "", semver.Version{}, fmt.Errorf("failed parsing version %s: %w", versionStr, err)
	}
	return ContractType(contractType), *v, nil
}

func ParseTypeAndVersion(tvStr string) (string, string, error) {
	if tvStr == "" {
		tvStr = string(Unknown) + " " + defaultVersion
	}
	typeAndVersionValues := strings.Split(tvStr, " ")

	if len(typeAndVersionValues) != 2 {
		return "", "", fmt.Errorf("invalid type and version %s", tvStr)
	}
	return typeAndVersionValues[0], typeAndVersionValues[1], nil
}
