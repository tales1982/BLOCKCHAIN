**Passo 1: Instalar o Hardhat e o dontenv**

npm install --save-dev hardhat

npm install dotenv

**Passo 2: Criar um novo projeto Hardhat**

npx hardhat

**Passo 3: Criar o smart contract**

Crie um novo arquivo chamado `SimpleContract.sol` na pasta `contracts`

**Passo 4: Configurar o Hardhat**

module.exports = {
  solidity: "0.8.10",//versao do contrato
  networks: {
    rinkeby: { //rede de deploy configura no alchimia
      url: "https://rinkeby.infura.io/v3/YOUR_PROJECT_ID",
      accounts: ["YOUR_PRIVATE_KEY"],
    },
  },
};


**Passo 5: criar um arquivo `deploy.js` na pasta `scripts`**

require("dotenv").config();
const { ethers, network } = require("hardhat");async function main() {
  console.log(`Deploying SimpleContract to network: ${network.name}`);
  const SimpleContract = await ethers.getContractFactory("SimpleContract");
  const simpleContract = await SimpleContract.deploy();
  const txResponse =
    simpleContract.deployTransaction ??
    simpleContract.deploymentTransaction();
  const receipt = await txResponse.wait();
  console.log("SimpleContract deployed at:", receipt.contractAddress);
  console.log("Transaction hash:", receipt.transactionHash);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erro no deploy:", error);
    process.exit(1);
  });

**Passo 6: Compilar e deployar o contrato**

npx hardhat run scripts/deploy.js --network sepolia
