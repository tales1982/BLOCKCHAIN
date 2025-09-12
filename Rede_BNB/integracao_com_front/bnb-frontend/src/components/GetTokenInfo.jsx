import { useState } from "react";
import "../button.css";
import "../stylesGlobal.css";
import { BrowserProvider, Contract, formatUnits } from "ethers";

function GetTokenInfo() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");

  const tokenAddress = "0x188599e4a85cf6e107dd23f199c5647229a1242a";
  const tokenABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function transfer(address to, uint256 amount) returns (bool)",
  ];

  async function readTokenInfo() {
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(tokenAddress, tokenABI, provider);

    const [name, symbol, rawSupply, decimals] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.totalSupply(),
      contract.decimals(),
    ]);

    setTokenName(name);
    setTokenSymbol(symbol);
    setTokenSupply(formatUnits(rawSupply, decimals));
  }
  return (
    <>
      <button onClick={readTokenInfo} className="btn-metamask" type="button">
        Ler Dados do Token
      </button>
      {tokenName && (
        <div style={{ marginTop: 20 }}>
          <p>
            <strong>Nome:</strong> {tokenName}
          </p>
          <p>
            <strong>Símbolo:</strong> {tokenSymbol}
          </p>
          <p>
            <strong>Total em circulação:</strong> {tokenSupply}
          </p>
        </div>
      )}
    </>
  );
}

GetTokenInfo.displayName = "GetTokenInfo";
export default GetTokenInfo;
