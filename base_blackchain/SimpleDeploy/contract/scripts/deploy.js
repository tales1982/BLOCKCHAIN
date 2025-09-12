// 1. Carrega variáveis de ambiente do .env (ex: MNEMONIC, INFURA_KEY)
require("dotenv").config();

// 2. Importa do Hardhat:
//    - ethers: para compilar e interagir com contratos
//    - network: para obter informações da rede (nome, chainId, etc.)
const { ethers, network } = require("hardhat");

async function main() {
  // 3. Indica no console em qual rede estamos deployando
  console.log(`Deploying SimpleContract to network: ${network.name}`);

  // 4. Recupera o "ContractFactory" do seu contrato compilado
  const SimpleContract = await ethers.getContractFactory("SimpleContract");

  // 5. Envia a transação de criação do contrato
  const simpleContract = await SimpleContract.deploy();

  // 6. Pega o objeto TransactionResponse da transação de deploy.
  //    Em ethers v5 era `.deployTransaction`, em v6 é `.deploymentTransaction()`
  const txResponse = 
    simpleContract.deployTransaction ??          // ethers v5
    simpleContract.deploymentTransaction();      // ethers v6 :contentReference[oaicite:0]{index=0}

  // 7. Aguarda o deploy ser minerado e obtém o receipt
  const receipt = await txResponse.wait();       // universal (v5 & v6) :contentReference[oaicite:1]{index=1}

  // 8. Exibe o endereço do contrato recém-deployado
  console.log("SimpleContract deployed at:", receipt.contractAddress);

  // 9. Exibe o hash da transação (útil para Etherscan, Blockscout etc.)
  console.log("Transaction hash:", receipt.transactionHash);
}

// 10. Executa e trata possíveis erros:
//     - .exit(0): sucesso
//     - .exit(1): falha (e imprime o erro)
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erro no deploy:", error);
    process.exit(1);
  });

  