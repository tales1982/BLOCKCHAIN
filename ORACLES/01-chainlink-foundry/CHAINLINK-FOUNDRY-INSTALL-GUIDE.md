# ✅ Guia de Instalação Chainlink com Foundry (Usando `chainlink-local`)

Este guia mostra passo a passo como integrar o pacote `chainlink-local` no seu projeto Foundry para usar o `AggregatorV3Interface` da Chainlink.

---

## 📦 1. Criar um novo projeto Foundry

```bash
forge init chainlink-foundry
cd chainlink-foundry
```

---

## 🔌 2. Instalar o pacote `chainlink-local`

```bash
forge install smartcontractkit/chainlink-local@7d8b2f888e1f10c8841ccd9e0f4af0f5baf11dab
```

> Esse hash garante compatibilidade com dependências como `chainlink-evm` e `chainlink-brownie-contracts`.

---

## 🔧 3. Configurar o remapping no `foundry.toml`

Abra o arquivo `foundry.toml` e adicione:

```toml
[profile.default]
remappings = [
  "@chainlink/local/=lib/chainlink-local/"
]
src = "src"
out = "out"
libs = ["lib"]
```

---

## 🔎 4. Confirmar o caminho da interface

Verifique onde está o contrato `AggregatorV3Interface.sol`:

```bash
find lib/chainlink-local/ -name AggregatorV3Interface.sol
```

Resultado esperado:

```
lib/chainlink-local/src/data-feeds/interfaces/AggregatorV3Interface.sol
```

---

## 🧩 5. Usar o import correto no contrato

Crie o arquivo `src/PriceConsumer.sol` com o seguinte conteúdo:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/local/src/data-feeds/interfaces/AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal priceFeed;

    constructor(address _feedAddress) {
        priceFeed = AggregatorV3Interface(_feedAddress);
    }

    function getLatestPrice() public view returns (int256) {
        (, int256 price,,,) = priceFeed.latestRoundData();
        return price;
    }
}
```

---

## 🧪 6. (Opcional) Teste com Foundry + RPC

Crie um teste em `test/PriceConsumer.t.sol`:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/PriceConsumer.sol";

contract PriceConsumerTest is Test {
    PriceConsumer public priceConsumer;

    // Sepolia ETH/USD Feed
    address constant FEED = 0x694AA1769357215DE4FAC081bf1f309aDC325306;

    function setUp() public {
        priceConsumer = new PriceConsumer(FEED);
    }

    function testGetLatestPrice() public view {
        int256 price = priceConsumer.getLatestPrice();
        console2.log("ETH/USD Price:", price);
        assert(price > 0);
    }
}
```

Rodar com fork:

```bash
export RPC_URL=https://sepolia.infura.io/v3/SUA_INFURA_KEY
forge test --fork-url $RPC_URL -vv
```

---

## ✅ 7. Compilar o projeto

```bash
forge clean
forge build
```

Se tudo estiver correto, você verá:

```
Compiler run successful!
```

---

## 🎉 Pronto!

Agora seu projeto está totalmente integrado com Chainlink e pronto para consumir dados de oráculos reais usando Foundry.
