/**
 * Local para programa a logica da pagina todo o codigo de logica deve ficar aqui:
 */
import Web3, { AbiItem } from "web3";
import ABI from './abi.json'

const CONTRACT_ADDRESS = `${process.env.REACT_APP_CONTRACT_ADDRESS}`;

export async function mint() {
    if(!window.ethereum) throw new Error('No MetaMask found!') ;

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || !accounts.length) 
        throw new Error(`No account allowed!`)

    //conecsao ao contrato 
    const contract = new web3.eth.Contract(ABI as AbiItem[], CONTRACT_ADDRESS,{from: accounts[0]});
    const tx = await contract.methods.mint().send();

    console.log(tx.transactionHash);
    return(tx.transactionHash);
}