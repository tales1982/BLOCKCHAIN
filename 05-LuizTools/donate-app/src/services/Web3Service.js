import Web3 from "web3";    
import ABI from "./ABI.json";

const ADRESSCONTRACT = "0xb49569fD817EE2E7B40D592aD029747dB6bF7154";


export async function doLogin() {

    //verificar se o metamask está instalado
    if(!window.ethereum) throw new Error("No metamask installed!!");
    
    //conectar ao metamask
    const web3 = new Web3(window.ethereum);

    //pedir permissão para acessar a conta do usuário
    const accounts = await web3.eth.requestAccounts();

    //agora verificamos se o usuário deu permissão
    if(!accounts || accounts.length === 0) throw new Error("User denied access");

    //salvamos a conta do usuário no localStorage
    localStorage.setItem("wallet", accounts[0]);

    //retornamos a conta que o usuário escolheu
    return accounts[0];
}


//funcao pra conectar ao contrato
function getContract() {
    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");
    return new web3.eth.Contract(ABI, ADRESSCONTRACT, {from: window.ethereum.selectedAddress});
}

//funcao para pegar as campanhas e enviar pra blockchain
export async function addCampaign(campaign) {
    const contract = getContract();

    // Estimar o gas necessário para a transação
    const gas = await contract.methods.addCampaign(campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl).estimateGas();
    
    // Enviar a transação com o gas estimado
    return contract.methods
        .addCampaign(campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl)
        .send({ gas });
}

export function getLastCampaignId() {
    const contract = getContract();
    return contract.methods.nextId().call();
}

//funcao para pegar (buscar) as campanhas
export function getCampaign(id) {
    const contract = getContract();
    return contract.methods.campaigns(id).call();
}

//funcao para doar
export async function donate(id, donation) {
    const contract = getContract();
    return contract.methods.donate(id).send({ value: Web3.utils.toWei(donation, "ether") });
}