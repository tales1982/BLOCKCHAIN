// Transaction.jsx
import { useState } from "react";
import { BrowserProvider, Contract, isAddress, parseUnits } from "ethers";
import "../button.css";
import "../stylesGlobal.css";
import "../transaction.css"; // novo arquivo de estilos

function Transaction() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const tokenAddress = "0x188599e4a85cf6e107dd23f199c5647229a1242a";
  const tokenABI = [
    "function decimals() view returns (uint8)",
    "function transfer(address to, uint256 amount) returns (bool)",
  ];

  async function sendTokens() {
    if (!isAddress(recipient)) {
      alert("Endereço inválido");
      return;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      alert("Quantia inválida");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(tokenAddress, tokenABI, signer);

    const decimals = await contract.decimals();
    const value = parseUnits(amount, decimals);

    const tx = await contract.transfer(recipient, value);
    console.log("Tx hash:", tx.hash);

    await tx.wait();
    alert(`Enviados ${amount} tokens para ${recipient}`);
  }

  return (
    <div className="tx-card">
      <h2>Enviar Tokens</h2>
      <div className="tx-field">
        <label>Destinatário</label>
        <input
          type="text"
          className="tx-input"
          placeholder="0x..."
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <div className="tx-field">
        <label>Quantidade</label>
        <input
          type="text"
          className="tx-input"
          placeholder="ex: 10.5"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={sendTokens} className="btn-metamask" type="button">
        Enviar Tokens
      </button>
    </div>
  );
}

Transaction.displayName = "Transaction";
export default Transaction;
