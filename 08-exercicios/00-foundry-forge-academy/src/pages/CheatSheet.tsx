import { useLanguage } from "@/contexts/LanguageContext";
import { CodeBlock } from "@/components/CodeBlock";

const sections = [
  {
    titleKey: "cheatsheet.projectSetup",
    commands: `# Create a new Foundry project
forge init my-project
cd my-project

# Project structure:
# src/          → Your Solidity contracts
# test/         → Test files (*.t.sol)
# script/       → Deployment scripts (*.s.sol)
# lib/          → Dependencies
# foundry.toml  → Configuration`,
  },
  {
    titleKey: "cheatsheet.buildingCompiling",
    commands: `# Compile all contracts
forge build

# Clean build artifacts
forge clean

# Check contract sizes
forge build --sizes

# Inspect storage layout
forge inspect MyContract storage-layout

# Get ABI
forge inspect MyContract abi`,
  },
  {
    titleKey: "cheatsheet.testing",
    commands: `# Run all tests
forge test

# Verbose output (show logs)
forge test -vvv

# Ultra verbose (show traces)
forge test -vvvv

# Run specific test
forge test --match-test testMyFunction

# Run tests in specific file
forge test --match-path test/MyContract.t.sol

# Gas report
forge test --gas-report

# Fuzz with more runs
forge test --fuzz-runs 10000

# Gas snapshot
forge snapshot
forge snapshot --diff`,
  },
  {
    titleKey: "cheatsheet.localBlockchain",
    commands: `# Start local blockchain
anvil

# Start with specific chain ID
anvil --chain-id 1337

# Start with more accounts
anvil --accounts 20

# Fork mainnet
anvil --fork-url https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY

# Default RPC: http://localhost:8545
# Default Chain ID: 31337
# 10 pre-funded accounts with 10000 ETH each`,
  },
  {
    titleKey: "cheatsheet.deployment",
    commands: `# Deploy with forge create
forge create src/MyContract.sol:MyContract \\
  --rpc-url http://localhost:8545 \\
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# Deploy with constructor args
forge create src/MyContract.sol:MyContract \\
  --constructor-args "Hello" 42 \\
  --rpc-url http://localhost:8545 \\
  --private-key 0xac0974...

# Deploy with script
forge script script/Deploy.s.sol \\
  --rpc-url http://localhost:8545 \\
  --broadcast

# Verify on Etherscan
forge verify-contract <ADDRESS> MyContract --chain mainnet`,
  },
  {
    titleKey: "cheatsheet.interacting",
    commands: `# Call a view function (free, no gas)
cast call <CONTRACT> "balanceOf(address)" <ADDRESS> --rpc-url http://localhost:8545

# Send a transaction (costs gas)
cast send <CONTRACT> "transfer(address,uint256)" <TO> 1000 \\
  --rpc-url http://localhost:8545 \\
  --private-key 0xac0974...

# Send ETH with transaction
cast send <CONTRACT> "deposit()" --value 1ether \\
  --rpc-url http://localhost:8545 \\
  --private-key 0xac0974...

# Check ETH balance
cast balance <ADDRESS> --rpc-url http://localhost:8545

# Get transaction receipt
cast receipt <TX_HASH> --rpc-url http://localhost:8545

# Decode calldata
cast calldata-decode "transfer(address,uint256)" <CALLDATA>

# Convert units
cast to-wei 1.5 ether
cast from-wei 1500000000000000000`,
  },
  {
    titleKey: "cheatsheet.debugging",
    commands: `# Debug a transaction
forge debug src/MyContract.sol --sig "myFunction(uint256)" 42

# Trace a transaction
cast run <TX_HASH> --rpc-url http://localhost:8545

# Console logging in tests
# import "forge-std/console.sol";
# console.log("Value:", myVar);
# Run with: forge test -vvv`,
  },
  {
    titleKey: "cheatsheet.dependencies",
    commands: `# Install OpenZeppelin
forge install OpenZeppelin/openzeppelin-contracts

# Install with specific version
forge install OpenZeppelin/openzeppelin-contracts@v4.9.3

# Update dependencies
forge update

# Remove dependency
forge remove openzeppelin-contracts

# Remappings (foundry.toml)
# remappings = ["@openzeppelin/=lib/openzeppelin-contracts/"]`,
  },
];

export default function CheatSheet() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-slide-in">
      <h1 className="text-3xl font-display font-bold text-gradient-green mb-2">{t("cheatsheet.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("cheatsheet.subtitle")}</p>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display font-semibold text-lg mb-2">{t(section.titleKey)}</h2>
            <CodeBlock code={section.commands} language="bash" />
          </div>
        ))}
      </div>
    </div>
  );
}
