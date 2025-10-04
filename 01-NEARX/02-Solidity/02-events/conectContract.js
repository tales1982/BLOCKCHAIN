import { ethers } from "ethers";


// 1) RPC local (anvil) ou outro provider
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// 2) Endereço do contrato já deployado
const CONTRACT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

// 3) ABI mínima (só o evento e variáveis que vai usar)
const ABI = [
  { "type":"receive", "stateMutability":"payable" },
  { "type":"function","name":"owner","inputs":[],"outputs":[{"type":"address"}],"stateMutability":"view" },
  { "type":"function","name":"amount","inputs":[],"outputs":[{"type":"uint256"}],"stateMutability":"view" },
  { "type":"function","name":"getBalance","inputs":[],"outputs":[{"type":"uint256"}],"stateMutability":"view" },
  { "type":"function","name":"transfer","inputs":[{"name":"to","type":"address"},{"name":"_amount","type":"uint256"}],"outputs":[],"stateMutability":"nonpayable" },
  { "type":"event","name":"GetNewAmountEvent","inputs":[{"name":"newAmount","type":"uint256","indexed":false}],"anonymous":false },
  { "type":"event","name":"Sent","inputs":[{"name":"to","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false }
]
;

// 4) Instancia o contrato
const c = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

// 5) Escuta eventos
console.log("👂 ouvindo...");
c.on("GetNewAmountEvent", (newAmount, ev) => {
  console.log("💧 Depósito/Atualização:", ethers.formatEther(newAmount), "ETH | bloco:", ev.blockNumber);
});
c.on("Sent", (to, value, ev) => {
  console.log("📤 Saída:", to, ethers.formatEther(value), "ETH | bloco:", ev.blockNumber);
});
