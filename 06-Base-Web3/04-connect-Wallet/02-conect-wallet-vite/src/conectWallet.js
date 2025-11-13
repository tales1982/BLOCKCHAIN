// Espera o DOM carregar completamente antes de acessar os elementos
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById("connectButton");
  const accountDisplay = document.getElementById("accountDisplay");
  const block = document.getElementById("block");
  const saldoDisplay = document.getElementById("saldo");



  let account = null;
  let signer = null;
  let provider = null;


  button.addEventListener('click', async () => {
    if (!window.ethereum) {
      alert("Metamesk nao encontrada. instale antes de continuar");
      return;
    }

    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      document.getElementById("accountDisplay").textContent = account;

      // Pega o saldo em hexadecimal (wei)
      const getBalance = await ethereum.request({ method: "eth_getBalance", params: [account, "latest"] });

      //pega o ultimo block
      const getLastBlock = await ethereum.request({ method: "eth_blockNumber" });


      // Converte de hexadecimal para decimal
      const balanceInWei = parseInt(getBalance, 16);

      // Converte de wei para ether (1 ETH = 10^18 wei)
      const balanceInEther = balanceInWei / 1e18;

      // Exibe o saldo formatado
      saldoDisplay.textContent = balanceInEther.toFixed(4) + " ETH"

      block.textContent = parseInt(getLastBlock, 16);




    } catch (error) {

    }


    console.log('Botão clicado!');
    accountDisplay.textContent = account;
    saldo.textContent;
  });
});
