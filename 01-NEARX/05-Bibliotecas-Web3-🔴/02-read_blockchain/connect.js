// 1. Install and import the Web3.js library
import Web3 from "web3";

// 2. Configure the provider (Infura, Alchemy -> online) or (Anvil -> offline)
const RPC_URL = "http://127.0.0.1:8545"
const web3 = new Web3(RPC_URL);

// Verify the connection with the blockchain
web3.eth.getBlockNumber().then((number)=>{
    console.log(`Block number ${number}`)
})