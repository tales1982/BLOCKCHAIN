import Web3 from "web3";
import ABI  from "./ABI.json";

const CONTRACT_ADDRESS = "0xe2899bddFD890e320e643044c6b95B9B0b84157A";//tem q ser o endereco do deploy do contrato

export async function doLogin() {

  if (!window.ethereum) throw new Error("Metamask not found");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length)throw new Error("Metamask account not found");

  localStorage.setItem("wallet", accounts[0]);

  return accounts[0];
}

function getContract() {
  const web3 = new Web3(window.ethereum);
  const from = localStorage.getItem("wallet");
  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

/*
export async function addCampaign(campaign){
  const contract = getContract();
  return contract.methods.addCampaign(campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl).send();
}
*/

export async function addCampaign(campaign) {
  const contract = getContract();
  
  const gasEstimate = await contract.methods.addCampaign(
    campaign.title,
    campaign.description,
    campaign.videoUrl,
    campaign.imageUrl
  ).estimateGas({ from: localStorage.getItem("wallet") });

  return contract.methods.addCampaign(
    campaign.title,
    campaign.description,
    campaign.videoUrl,
    campaign.imageUrl
  ).send({
    from: localStorage.getItem("wallet"),
    gas: gasEstimate
  });
}
