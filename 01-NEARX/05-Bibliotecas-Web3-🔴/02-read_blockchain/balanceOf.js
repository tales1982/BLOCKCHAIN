// 1. Install and import the Web3.js libary
import Web3 from "web3";
import readLine from "readline"
import { error } from "console";

// 2. Configure Provider
const RPC_URL = "http://127.0.0.1:8545"
const web3 = new Web3(RPC_URL);

// 3. Get the account address via readline input.
const rl = readLine.createInterface({
    input: process.stdin,
      output: process.stdout,
});


rl.question("Digite o endereco da conta: ", (address)=>{
    web3.eth
        .getBalance(address)
        .then((balance)=>{
            
            console.log("Saldo em wei:", balance)
        })
        .catch((error) => {
            console.log("Erro ao consulta op saldo ", error)
        });
        rl.close();
} )

//Console.log
rl.on('line', (line) => {
  console.log(`Received: ${line}`);
});

