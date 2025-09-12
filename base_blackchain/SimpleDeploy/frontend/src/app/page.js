// src/app/page.js
"use client";

import { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { setName, setAge } from './store/userSlice';
import axios from 'axios';
import { ethers } from 'ethers';

function HomeInner() {
  const dispatch = useDispatch();
  const name = useSelector((s) => s.user.name);
  const age = useSelector((s) => s.user.age);

  const [contractData, setContractData] = useState(null);
  const [signer, setSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('info'); // 'info' | 'success' | 'error'

  useEffect(() => {
    axios.get('/api/contract')
      .then((res) => setContractData(res.data))
      .catch(() => {
        setStatusType('error');
        setStatusMessage('Não foi possível carregar o contrato.');
      });
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setStatusType('error');
      setStatusMessage('MetaMask não detectado. Instale a extensão.');
      return;
    }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      let provider, signerObj;
      if (typeof ethers.BrowserProvider !== 'undefined') {
        provider = new ethers.BrowserProvider(window.ethereum);
        signerObj = await provider.getSigner();
      } else {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signerObj = provider.getSigner();
      }
      const address = await signerObj.getAddress();
      setSigner(signerObj);
      setWalletAddress(address);
      setStatusType('success');
      setStatusMessage(`Carteira conectada: ${address}`);
    } catch {
      setStatusType('error');
      setStatusMessage('Falha ao conectar carteira.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contractData || !signer) {
      setStatusType('error');
      setStatusMessage('Conecte a carteira antes de assinar.');
      return;
    }
    try {
      setStatusType('info');
      setStatusMessage('Enviando transação...');
      const contract = new ethers.Contract(
        contractData.address,
        contractData.abi,
        signer
      );
      const tx = await contract.signer(name, age);
      await tx.wait();
      setStatusType('success');
      setStatusMessage('Assinatura registrada com sucesso!');
    } catch {
      setStatusType('error');
      setStatusMessage('Erro ao enviar transação.');
    }
  };

  // Estilos inline
  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f4ff 0%, #dce3f8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  };
  const cardStyle = {
    background: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    borderRadius: '16px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '400px',
  };
  const titleStyle = {
    fontSize: '1.875rem',
    fontWeight: '700',
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: '1.5rem',
  };
  const statusStyles = {
    info:    { background: '#e0f2fe', borderColor: '#38bdf8', color: '#0369a1' },
    success: { background: '#ecfdf5', borderColor: '#34d399', color: '#065f46' },
    error:   { background: '#fef2f2', borderColor: '#f87171', color: '#991b1b' },
  };
    const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
    outline: 'none',
    background: '#fff', // sempre branco para permitir digitação
    color: '#000',      // cor do texto para ser visível
  };
  const buttonStyle = (bg) => ({
    width: '100%',
    padding: '0.75rem',
    marginTop: '1rem',
    background: bg,
    color: '#fff',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  });
  const hover = (e, color) => e.currentTarget.style.background = color;

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Assine Nome e Idade</h1>

        {statusMessage && (
          <div
            style={{
              padding: '0.75rem',
              marginBottom: '1.5rem',
              borderLeft: `4px solid ${statusStyles[statusType].borderColor}`,
              background: statusStyles[statusType].background,
              color: statusStyles[statusType].color,
              borderRadius: '4px',
            }}
          >
            {statusMessage}
          </div>
        )}

        {!signer ? (
          <button
            onClick={connectWallet}
            style={buttonStyle('#3b82f6')}
            onMouseOver={e => hover(e, '#2563eb')}
            onMouseOut={e => hover(e, '#3b82f6')}
          >
            Conectar Wallet
          </button>
        ) : (
          <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#374151' }}>
            Conectado como <code style={{ fontFamily: 'monospace' }}>{walletAddress}</code>
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name" style={{ fontWeight: '500', color: '#334155' }}>
            Nome
          </label>
          <input
            id="name"
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={e => dispatch(setName(e.target.value))}
            style={inputStyle}
          />

          <label htmlFor="age" style={{ fontWeight: '500', color: '#334155' }}>
            Idade
          </label>
          <input
            id="age"
            type="number"
            placeholder="Digite sua idade"
            min="1"
            value={age}
            onChange={e => dispatch(setAge(Number(e.target.value)))}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={!signer}
            style={{
              ...buttonStyle('#10b981'),
              opacity: signer ? 1 : 0.6,
              cursor: signer ? 'pointer' : 'not-allowed',
            }}
            onMouseOver={e => signer && hover(e, '#059669')}
            onMouseOut={e => signer && hover(e, '#10b981')}
          >
            Assinar
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Provider store={store}>
      <HomeInner />
    </Provider>
  );
}
