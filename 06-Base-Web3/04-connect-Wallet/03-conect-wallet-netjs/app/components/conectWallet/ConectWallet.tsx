'use client';

import { ethers } from 'ethers';
import { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #7700ff;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: darkblue;
  }
`;

export default function ConectWallet() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  async function connectWallet() {
    const { ethereum } = window as any;

    if (!ethereum) {
      alert('MetaMask não encontrada. Instale antes de continuar.');
      return;
    }

    try {
      // 1) Pede permissão e pega as contas
      const accounts: string[] = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        alert('Nenhuma conta encontrada na MetaMask.');
        return;
      }

      // 2) Salva a primeira conta no estado
      setAccount(accounts[0]);

      // 3) Cria o provider (ethers v6)
      const _provider = new ethers.BrowserProvider(ethereum);
      setProvider(_provider);

      // 4) Pega o signer (quem assina transações)
      const _signer = await _provider.getSigner();
      setSigner(_signer);

      console.log('Conta conectada:', accounts[0]);
    } catch (err) {
      console.error('Erro ao conectar na MetaMask:', err);
      alert('Erro ao conectar na MetaMask. Veja o console para detalhes.');
    }
  }

  return (
    <>
      <Button onClick={connectWallet}>Conectar Wallet</Button>
      <p>
        Carteira:{' '}
        <span>{account ? account : 'nenhuma carteira conectada!'}</span>
      </p>
    </>
  );
}
