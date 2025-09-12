// src/components/ConnectWallet.jsx
import { useState, useEffect } from "react";
import { BrowserProvider, formatEther } from "ethers";
import "../button.css";
import "../stylesGlobal.css";

function ConnectWallet() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [eurBalance, setEurBalance] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Instale a MetaMask para continuar.");
      return;
    }
    try {
      const [walletAddress] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(walletAddress);
    } catch (err) {
      console.error(err);
      alert("Falha ao conectar à MetaMask.");
    }
  }

  // Busca saldo em ETH sempre que a conta mudar
  useEffect(() => {
    if (!account) return;
    const provider = new BrowserProvider(window.ethereum);
    provider.getBalance(account)
      .then(bal => setBalance(formatEther(bal)))
      .catch(console.error);
  }, [account]);

  // Converte ETH → EUR usando a API do CoinGecko
  useEffect(() => {
    if (balance === null) return;
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    )
      .then(res => res.json())
      .then(data => {
        const rate = data.ethereum.eur;
        setEurBalance((parseFloat(balance) * rate).toFixed(2));
      })
      .catch(console.error);
  }, [balance]);

  return (
    <>
      {account ? (
        <div>
          <p>
            Conta conectada: <strong>{account}</strong>
          </p>
          {balance !== null ? (
            <p>
              Saldo:{" "}
              <strong>
                {Number(balance).toFixed(4)} ETH{" "}
                {eurBalance !== null && <>≈ €{eurBalance}</>}
              </strong>
            </p>
          ) : (
            <p>Carregando saldo...</p>
          )}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="btn-metamask"
          type="button"
        >
          <span className="btn-icon">
            {/* SVG oficial da MetaMask */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 318.6 318.6"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* cole aqui o conteúdo do SVG */}
            </svg>
          </span>
          <span className="btn-text">Conectar MetaMask</span>
        </button>
      )}
    </>
  );
}

ConnectWallet.displayName = "ConnectWallet";
export default ConnectWallet;
