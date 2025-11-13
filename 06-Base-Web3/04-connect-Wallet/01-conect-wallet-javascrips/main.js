let account = null;
let signer = null;
let provider = null;

// ---- 1) Conectar na MetaMask ----
async function connect() {

    // Verifica se a MetaMask existe
    if (!window.ethereum) {
        alert("MetaMask não encontrada. Instale antes de continuar.");
        return;
    }

    try {
        // Solicita permissão do usuário
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        account = accounts[0];
        document.getElementById("account").textContent = account;

        // Cria provider e signer
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();

        console.log("Conta conectada:", account);
        alert("Conectado com sucesso!");

    } catch (err) {
        console.error(err);

        // Erro clássico: usuário cancelou na Metamask
        if (err.code === 4001) {
            alert("Você cancelou a conexão na MetaMask.");
        } else {
            alert("Erro ao conectar MetaMask: " + (err.message || err));
        }
    }

}


// ---- 2) Botão chama a função ----
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnConnect").onclick = connect;
});
