//I am going to create an offline wallet
import {Web3} from"web3"
import 'dotenv/config'


const web3 = new Web3()

//create account
const account = web3.eth.accounts.wallet.create(1);
console.log("wallet address",account);
