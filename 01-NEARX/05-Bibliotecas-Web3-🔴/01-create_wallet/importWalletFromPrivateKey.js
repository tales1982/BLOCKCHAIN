import { Web3 } from "web3";

const web3 = new Web3();

// Create Account
const PRIVATE_KEY = "0xb762c5177d93ae67873060b655b652eecddca5085d918c2de4ca23b1e6be4812";
const account = web3.eth.accounts.wallet.add(PRIVATE_KEY);
console.log(account);