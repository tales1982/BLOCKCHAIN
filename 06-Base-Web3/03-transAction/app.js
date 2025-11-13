// app.js — ESM + ethers v6 + conversão EUR/USD
const { BrowserProvider, formatEther, parseEther, isAddress } = window.E6;

const btnConnect = document.getElementById('btnConnect');
const accountSpan = document.getElementById('account');
const networkSpan = document.getElementById('network');
const btnEnsureSepolia = document.getElementById('btnEnsureSepolia');

const btnGetBalance = document.getElementById('btnGetBalance');
const addressToCheck = document.getElementById('addressToCheck');
const balanceSpan = document.getElementById('balance');
const balanceEurSpan = document.getElementById('balanceEur');
const balanceUsdSpan = document.getElementById('balanceUsd');

const txToInput = document.getElementById('txTo');
const txValueInput = document.getElementById('txValue');
const btnSendTx = document.getElementById('btnSendTx');
const txInfo = document.getElementById('txInfo');

const logEl = document.getElementById('log');

// Config
const SEPOLIA_CHAIN_ID_HEX = '0xaa36a7';
const EXPLORER = 'https://sepolia.etherscan.io';
const ALCHEMY_SEPOLIA = 'https://eth-sepolia.g.alchemy.com/v2/p1i-6kLnn1uo_cV207LYh';

// Preço ETH (mainnet) em EUR e USD (CoinGecko)
const COINGECKO_SIMPLE_PRICE =
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur,usd';

let provider; // BrowserProvider
let signer;   // JsonRpcSigner
let priceEUR = null;
let priceUSD = null;
let lastPriceTs = 0;

const fmtEUR = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' });
const fmtUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function log(...args) {
  const s = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
  logEl.textContent = `${new Date().toLocaleTimeString()} - ${s}\n` + logEl.textContent;
}

async function fetchPrices(force = false) {
  const now = Date.now();
  if (!force && priceEUR !== null && priceUSD !== null && (now - lastPriceTs) < 60_000) return;
  try {
    const res = await fetch(COINGECKO_SIMPLE_PRICE, { cache: 'no-store' });
    const json = await res.json();
    priceEUR = Number(json?.ethereum?.eur ?? 0);
    priceUSD = Number(json?.ethereum?.usd ?? 0);
    lastPriceTs = now;
    log('Preço ETH → EUR/USD:', priceEUR, priceUSD);
  } catch (e) {
    log('Falha ao buscar preço ETH:', e.message || e);
  }
}

async function updateAccountAndNetwork() {
  if (!window.ethereum) {
    accountSpan.textContent = 'MetaMask não detectado';
    networkSpan.textContent = '—';
    return;
  }
  provider = new BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();
  const chainIdNum = Number(network.chainId);
  networkSpan.textContent = `${network.name || 'unknown'} (chainId=${chainIdNum})`;

  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  if (accounts && accounts.length > 0) {
    accountSpan.textContent = accounts[0];
    signer = await provider.getSigner();
  } else {
    accountSpan.textContent = 'Não conectado';
    signer = null;
  }
}

async function connectWallet() {
  if (!window.ethereum) return alert('MetaMask não encontrado.');
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    log('Contas retornadas:', accounts);
    await updateAccountAndNetwork();
  } catch (err) {
    console.error(err);
    log('Erro ao conectar:', err.message || err);
  }
}

async function ensureSepolia() {
  if (!window.ethereum) return alert('MetaMask não encontrado.');
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }],
    });
    log('Rede alterada para Sepolia.');
    await updateAccountAndNetwork();
  } catch (switchError) {
    if (switchError && switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: SEPOLIA_CHAIN_ID_HEX,
            chainName: 'Sepolia Testnet',
            nativeCurrency: { name: 'Sepolia ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: [ALCHEMY_SEPOLIA],
            blockExplorerUrls: [EXPLORER]
          }]
        });
        log('Sepolia adicionada à carteira.');
        await updateAccountAndNetwork();
      } catch (addError) {
        console.error(addError);
        log('Erro ao adicionar Sepolia:', addError.message || addError);
      }
    } else {
      console.error(switchError);
      log('Erro ao trocar rede:', switchError.message || switchError);
    }
  }
}

async function getBalance() {
  try {
    const addr = (addressToCheck.value && addressToCheck.value.trim())
      || (signer && await signer.getAddress());
    if (!addr) return alert('Informe um endereço ou conecte a carteira.');

    const balWei = await provider.getBalance(addr);
    const balEthStr = formatEther(balWei);
    const balEthNum = Number(balEthStr);

    balanceSpan.textContent = `${balEthStr} ETH`;

    await fetchPrices(); // garante preço atualizado

    if (priceEUR) {
      balanceEurSpan.textContent = `(≈ ${fmtEUR.format(balEthNum * priceEUR)} EUR)`;
    } else {
      balanceEurSpan.textContent = '(≈ — EUR)';
    }
    if (priceUSD) {
      balanceUsdSpan.textContent = `(≈ ${fmtUSD.format(balEthNum * priceUSD)} USD)`;
    } else {
      balanceUsdSpan.textContent = '(≈ — USD)';
    }

    log(`Saldo de ${addr}: ${balEthStr} ETH | ≈ EUR: ${balEthNum * (priceEUR || 0)} | ≈ USD: ${balEthNum * (priceUSD || 0)}`);
  } catch (err) {
    console.error(err);
    log('Erro ao buscar saldo:', err.message || err);
  }
}

async function sendTransaction() {
  if (!signer) return alert('Conecte sua carteira primeiro.');
  const to = txToInput.value?.trim();
  const valueStr = txValueInput.value?.trim();
  if (!to || !valueStr) return alert('Preencha "to" e "value".');

  if (!isAddress(to)) return alert('Endereço inválido.');

  let valueWei;
  try { valueWei = parseEther(valueStr); }
  catch { return alert('Valor inválido. Use, por ex., "0.01".'); }

  try {
    const tx = await signer.sendTransaction({ to, value: valueWei });
    log('Tx enviada. Hash:', tx.hash);
    txInfo.innerHTML = `Tx enviada — hash:
      <a href="${EXPLORER}/tx/${tx.hash}" target="_blank">${tx.hash}</a>
      <br/>Aguardando confirmação...`;

    const receipt = await tx.wait();
    txInfo.innerHTML = `Confirmada! bloco ${receipt.blockNumber} —
      <a href="${EXPLORER}/tx/${tx.hash}" target="_blank">ver</a>`;
    await getBalance();
  } catch (err) {
    console.error(err);
    log('Erro ao enviar tx:', err.message || err);
    txInfo.innerText = `Erro ao enviar tx: ${err.message || err}`;
  }
}

async function handleAccountsChanged(accounts) {
  if (!accounts || accounts.length === 0) {
    accountSpan.textContent = 'Não conectado';
    signer = null;
  } else {
    accountSpan.textContent = accounts[0];
    signer = await provider.getSigner();
    await getBalance();
  }
}

async function handleChainChanged() {
  log('chainChanged');
  await updateAccountAndNetwork();
  await getBalance();
}

// Eventos
btnConnect.addEventListener('click', connectWallet);
btnEnsureSepolia.addEventListener('click', ensureSepolia);
btnGetBalance.addEventListener('click', getBalance);
btnSendTx.addEventListener('click', sendTransaction);

// Inicialização
(async function init() {
  if (window.ethereum) {
    await Promise.all([updateAccountAndNetwork(), fetchPrices(true)]);
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
  } else {
    log('MetaMask não detectado.');
    accountSpan.textContent = 'MetaMask não detectado';
    networkSpan.textContent = '—';
  }
})();
