import Web3 from "web3";
import "dotenv/config";               // carrega .env
import { isAddress } from "web3-validator";

const { ALCHEMY_SEPOLIA_URL, PRIVATE_KEY, TO } = process.env;

/** Sanitiza a chave privada */
function sanitizePk(pk) {
  if (!pk) throw new Error("❌ PRIVATE_KEY não definida.");
  let v = pk.trim().replace(/\s+/g, "");
  v = v.replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, "");
  if (v.startsWith("0x")) v = v.slice(2);
  if (!/^[0-9a-fA-F]+$/.test(v)) throw new Error("❌ PRIVATE_KEY tem caracteres não-hex.");
  if (v.length !== 64) throw new Error(`❌ PRIVATE_KEY deve ter 64 hex chars (tem ${v.length}).`);
  return "0x" + v;
}

/** Checa se variáveis existem */
function assertEnv() {
  if (!ALCHEMY_SEPOLIA_URL) throw new Error("❌ ALCHEMY_SEPOLIA_URL não definida.");
  if (!PRIVATE_KEY) throw new Error("❌ PRIVATE_KEY não definida.");
  if (!TO) throw new Error("❌ TO (endereço destino) não definido.");
}

async function main() {
  console.log("=== Web3.js Sepolia Transfer ===\n");
  assertEnv();

  const web3 = new Web3(ALCHEMY_SEPOLIA_URL);
  const pk = sanitizePk(PRIVATE_KEY);

  // cria a conta e adiciona ao wallet interno
  const acct = web3.eth.accounts.privateKeyToAccount(pk);
  web3.eth.accounts.wallet.add(acct);

  const from = acct.address;
  console.log("From address =", from);

  const to = TO;
  if (!isAddress(to)) throw new Error("❌ Endereço de destino inválido.");

  // valor a enviar
  const amountEth = "0.010";
  const valueWei = web3.utils.toWei(amountEth, "ether");

  // mostra saldos antes
  const beforeFrom = await web3.eth.getBalance(from);
  const beforeTo = await web3.eth.getBalance(to);
  console.log(
    `Saldo antes => From: ${web3.utils.fromWei(beforeFrom, "ether")} ETH | To: ${web3.utils.fromWei(beforeTo, "ether")} ETH`
  );

  const chainId = await web3.eth.getChainId();
  console.log("ChainId =", chainId);

  const nonce = await web3.eth.getTransactionCount(from, "latest");
  console.log("Nonce =", nonce);

  // --- fees EIP-1559 ---
  const pending = await web3.eth.getBlock("pending");
  const base = BigInt(pending.baseFeePerGas ?? "0");
  const maxPriority = BigInt(web3.utils.toWei("2", "gwei"));
  const maxFee = (base * 2n + maxPriority).toString();

  const tx = {
    from,
    to,
    value: valueWei,
    gas: 21000, // transf simples de ETH
    nonce,
    chainId: Number(chainId),
    maxFeePerGas: maxFee,
    maxPriorityFeePerGas: maxPriority.toString(),
  };

  console.log("Enviando tx...", tx);

  const signed = await web3.eth.accounts.signTransaction(tx, pk);
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

  console.log("Hash:", receipt.transactionHash);
  console.log("Status:", receipt.status);

  // mostra saldos depois
  const afterFrom = await web3.eth.getBalance(from);
  const afterTo = await web3.eth.getBalance(to);
  console.log(
    `Saldo depois => From: ${web3.utils.fromWei(afterFrom, "ether")} ETH | To: ${web3.utils.fromWei(afterTo, "ether")} ETH`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
