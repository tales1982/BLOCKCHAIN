import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";

function App() {
  async function connect() {
    if (!window.ethereum) {
      alert("MetaMask não está instalado!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      const balance = await provider.getBalance(accounts[0]);
      alert(`Saldo: ${ethers.formatEther(balance)} ETH`);
      console.log(`Saldo: ${ethers.formatEther(balance)} ETH`);
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar ao MetaMask");
    }
  }

  useEffect(() => {
    connect();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.tsx</code> and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
