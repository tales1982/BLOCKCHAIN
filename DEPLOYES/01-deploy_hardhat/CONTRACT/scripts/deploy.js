require("dotenv").config();
const { ethers, network } = require("hardhat");

async function main() {
  console.log(`Deploying FormularioHash to network: ${network.name}`);

  const FormularioHash = await ethers.getContractFactory("FormularioHash");
  // No ethers v6, deploy() retorna uma Promise, precisamos aguardar a transação:
  const formularioHash = await FormularioHash.deploy();

  // Agora, para ethers v6, o hash está aqui:
  const deploymentTx = await formularioHash.deploymentTransaction();
  console.log("Transaction hash:", deploymentTx.hash);

  // Espere o deploy terminar
  await formularioHash.waitForDeployment();

  // Mostre o endereço do contrato
  console.log("FormularioHash deployed at:", await formularioHash.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erro no deploy:", error);
    process.exit(1);
  });
