package types

import "github.com/smartcontractkit/chainlink-common/pkg/workflows/sdk"

type WorkflowConfig struct {
	// name of the secret that stores authentication key
	AuthKeySecretName string `yaml:"auth_key_secret_name"`
	ComputeConfig
}

type ComputeConfig struct {
	FeedID                string          `yaml:"feed_id"`
	URL                   string          `yaml:"url"`
	DataFeedsCacheAddress string          `yaml:"consumer_address"`
	WriteTargetName       string          `yaml:"write_target_name"`
	AuthKey               sdk.SecretValue `yaml:"auth_key_secret_name,omitempty"`
}
