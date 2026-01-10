// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';

function App() {
  const [carteira, setCarteira] = useState(null);
  const [saldo, setSaldo] = useState(null);
  
  

  // Função para conectar
  const conectar = async () => {
    if (window.ethereum) {
      try {
        // 1. Pede permissão para conectar
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const endereco = await signer.getAddress();
        
        setCarteira(endereco);
        
        // 2. Busca o saldo (opcional)
        const balance = await provider.getBalance(endereco);
        setSaldo(ethers.formatEther(balance));
        
      } catch (error) {
        console.error("Erro ao conectar:", error);
      }
    } else {
      alert("Por favor, instale a MetaMask!");
    }
  };

async function converterEthParaEur(quantidadeEth) {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
  );

  const data = await response.json();

  const precoEthEmEur = data.ethereum.eur;

  const valorEmEur = quantidadeEth * precoEthEmEur;

  return valorEmEur;
}

// Exemplo de uso
converterEthParaEur(1).then(valor => {
  console.log(`0.5 ETH = €${valor.toFixed(2)}`);
});




  // Função para desconectar (simulada no Front)
  const desconectar = () => {
    setCarteira(null);
    setSaldo(null);
  };

  return (
    <div className="app-container">
      <h1>Minha DApp</h1>
      
      {!carteira ? (
        <button onClick={conectar}>Conectar Carteira</button>
      ) : (
        <div>
          <p>Conectado: {carteira}</p>
          <p>Saldo: {saldo} ETH</p>
          <button onClick={desconectar}>Desconectar</button>
        </div>
      )}
    </div>
  );
}

export default App;
