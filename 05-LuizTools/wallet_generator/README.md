# Intruducao

- Build our bitcoin wallet generator;
- Import into portfolio management software;
- Perform bitcoin sending and receiving transactions

## Technology used

- Language JavaScript
- Electrum Bitcoin
- Bitcoin Faucet Generator

## Dependencies

//
```bash
npm install bip39 bip32@2.0.6 bitcoinjs-lib --save
```

- 1. **bip39**:
Function: This library implements the BIP-39 (Bitcoin Improvement Proposal 39) standard. BIP-39 defines a method for generating a recovery seed (mnemonic phrase) from a list of words, which can be used to create a private key.

- 2. **bip32@2.0.6**:
Function: This is a library that implements the BIP-32 standard for Hierarchical Deterministic Wallets (HD wallets). BIP-32 allows you to create multiple private keys derived from a single "master" key. This is used in HD wallets, which can generate an infinite number of Bitcoin addresses from a single seed.

- 3. **bitcoinjs-lib**:
Function: This is a general library for creating, signing, and verifying transactions on the Bitcoin network. It provides a robust interface for handling Bitcoin transactions, managing wallets, and building P2PKH (Pay to Public Key Hash), P2SH (Pay to Script Hash) transactions, among others.

## In summary:
- **bip39**: Manages mnemonic phrases (seed words) used to restore wallets.
- **bip32**: Generates public and private keys from a seed, creating hierarchical deterministic wallets (HD wallets).
- **bitcoinjs-lib**: Handles Bitcoin transactions, keys, and wallets directly within the application.


## Portugues

- 1. **bip39**:
Função: Esta biblioteca implementa o padrão BIP-39 (Bitcoin Improvement Proposal 39). 
O BIP-39 define um método para gerar uma seed de recuperação (frase mnemônica) a partir de uma lista de palavras, que pode ser usada para criar uma chave privada.

- 2. **bip32@2.0.6**:
Função: Esta é uma biblioteca que implementa o padrão BIP-32 para Hierarchical Deterministic Wallets (carteiras determinísticas hierárquicas). 
O BIP-32 permite que você crie várias chaves privadas derivadas a partir de uma única chave "master". 
Isso é utilizado em carteiras HD (Hierarchical Deterministic) que podem gerar um número infinito de endereços Bitcoin a partir de uma única seed.

- 3. **bitcoinjs-lib**:
Função: Esta é uma biblioteca geral para criar, assinar e verificar transações na rede Bitcoin. Ela oferece uma interface robusta para manipular transações Bitcoin, gerenciar carteiras, construir transações P2PKH (Pay to Public Key Hash), P2SH (Pay to Script Hash), entre outras.

## Em resumo:
- **bip39**: Gerencia frases mnemônicas (seed words) usadas para restaurar carteiras.
- **bip32**: Gera chaves públicas e privadas a partir de uma seed, criando carteiras determinísticas hierárquicas (HD wallets).
- **bitcoinjs-lib**: Manipula transações, chaves e carteiras de Bitcoin diretamente na aplicação.
