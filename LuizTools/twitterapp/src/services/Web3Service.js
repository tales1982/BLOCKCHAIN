import Web from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x78D9d2E84ED9cc960baB6496DC141c8A44e27123";


export async function Login() {
  //se nao tiver metamask erro
  if (!window.ethereum) throw new Error("Metamask is not installed");

  //conectar com metamask
  const web3 = new Web(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length)
    throw new Error("Wallet not found or not allowed");

  localStorage.setItem("Wallet", accounts[0]);
  return accounts[0];
}

function getContract() {
  if (!window.ethereum) throw new Error("Metamask is not installed");

  const web3 = new Web(window.ethereum);
  const from = localStorage.getItem("Wallet");

  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function addTweet(text) {
  const contract = getContract();
  return contract.methods.addTweet(text).send();
}

export async function changeUsername(newUsername) {
  const contract = getContract();
  return contract.methods.addTweet(newUsername).send();
}

export async function getLastTweets(page) {
  const contract = getContract();
  const tweets = await contract.methods.getLastTweets(page).call();
  return tweets.map(t => {return{...t}}).filter(t => t.text != "");
}
