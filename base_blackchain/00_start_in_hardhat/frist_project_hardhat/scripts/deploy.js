const hre = require("hardhat");

async function main() {
  const Lock = await hre.ethers.getContractFactory("Lock");

  // Define o tempo de desbloqueio em segundos (60 segundos no futuro)
  const unlockTime = Math.floor(Date.now() / 1000) + 60;

  // Faz o deploy do contrato passando o unlockTime como argumento
  const lock = await Lock.deploy(unlockTime);

  // Aguarda o contrato ser implantado
  await lock.waitForDeployment();

  console.log(`Contract deployed to: ${await lock.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
