import Web3 from "web3";
import { isAddress } from "web3-validator";

const web3 = new Web3("http://127.0.0.1:8545");

async function conectBlockchain() {
  console.log("=== Web3.js Utils Demo ===\n");

  const owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // conta padrão dev
  const secondaryOwner = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  const chainId = await web3.eth.getChainId();
  console.log("ChainId =", chainId);

  const accounts = await web3.eth.getAccounts();
  console.log("Contas disponíveis:", accounts);

  const txCount = await web3.eth.getTransactionCount(owner);
  console.log(`Nonce de ${owner}: ${txCount}`);

  const block = await web3.eth.getBlock("latest");
  console.log(`Último bloco #${block.number} - minerado por ${block.miner}`);

  console.log(`Endereço válido? ${isAddress(owner)}`);

  // --------- 🔥 TRANSFERÊNCIA DE ETH -------------
  console.log("\nEnviando 0.1 ETH de owner para secondaryOwner...");

  // monta o objeto sem "gas"
  const tx = {
    from: owner,
    to: secondaryOwner,
    value: web3.utils.toWei("0.1", "ether"),
  };

  // pede ao nó para estimar o gas
  const gas = await web3.eth.estimateGas(tx);
  tx.gas = gas;

  const receipt = await web3.eth.sendTransaction(tx);
  console.log("Transação enviada! Hash:", receipt.transactionHash);

  const balanceFrom = await web3.eth.getBalance(owner);
  const balanceTo = await web3.eth.getBalance(secondaryOwner);
  console.log(`Novo saldo de owner: ${web3.utils.fromWei(balanceFrom, "ether")} ETH`);
  console.log(`Novo saldo de secondaryOwner: ${web3.utils.fromWei(balanceTo, "ether")} ETH`);
}

conectBlockchain().catch((err) => console.error("Error in utils demo:", err));
