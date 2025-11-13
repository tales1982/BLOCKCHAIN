import './style.css'
import './conectWallet.js'

document.querySelector('#app').innerHTML = `
   <div>
   <h1>Connect with Metamask</h1>
   <button id="connectButton">Conect Metamask</button>
   <p>conta : <span id="accountDisplay">nenhuma carteira conectada</span></p>
   <p>Saldo da carteira : <span id="saldo">0</span> </p>
   <p>Ultimo Block : <span id="block">0</span> </p>

  </div>
`
