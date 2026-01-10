// 1. Instale e importe a biblioteca Web3.js
import Web3 from "web3";
import readline from "readline";

// 2. Configure o provider
const RPC_URL = "http://127.0.0.1:8545";
const web3 = new Web3(RPC_URL);
const daiAbi = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

// 3. Obtenha o endereço do contrato e da conta via readline input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função para solicitar o endereço do contrato
const askForContractAddress = () => {
  rl.question("Digite o endereço do contrato: ", (contractAddress) => {
    askForAccountAddress(contractAddress);
  });
};

// Função para solicitar o endereço da conta
const askForAccountAddress = (contractAddress) => {
  rl.question("Digite o endereço da conta: ", (accountAddress) => {
    checkBalance(contractAddress, accountAddress);
  });
};

// Função para verificar o saldo
const checkBalance = (contractAddress, accountAddress) => {
  const daiContract = new web3.eth.Contract(daiAbi, contractAddress);

  daiContract.methods
    .balanceOf(accountAddress)
    .call()
    .then((balance) => {
      console.log("Saldo do Token:", web3.utils.fromWei(balance, "ether"));
    })
    .catch((error) => {
      console.error("Erro ao consultar o saldo de DAI:", error);
    })
    .finally(() => {
      rl.close();
    });
};

// Inicia o processo
askForContractAddress();

