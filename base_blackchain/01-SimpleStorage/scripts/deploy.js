const { ethers } = require("hardhat");

async function main() {
  // Obtém a fábrica do contrato
  const SimpleEstorange = await ethers.getContractFactory("SimpleEstorange");

  // Faz o deploy do contrato
  const simpleEstorage = await SimpleEstorange.deploy();

  // Aguarda o contrato ser implantado
  await simpleEstorage.waitForDeployment();

  console.log("SimpleEstorange deployed to:", await simpleEstorage.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
