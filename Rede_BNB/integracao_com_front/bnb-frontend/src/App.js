import ConnectWallet from "./components/ConnectWallet";
import GetTokenInfo from "./components/GetTokenInfo";
import Transaction from "./components/Transaction";
import "./App.css";


function App() {
  return (
    <div className="App">
      <h1>Sepolia ERC-20 Front-end</h1>

      <ConnectWallet />
      <GetTokenInfo />
      <Transaction />
    </div>
  );
}

export default App;
