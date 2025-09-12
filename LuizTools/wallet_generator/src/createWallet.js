/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   createWallet.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/09/21 17:23:47 by tales             #+#    #+#             */
/*   Updated: 2024/09/21 17:24:03 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


// Importando as dependências necessárias
const bip32 = require("bip32"); // Biblioteca para BIP32 (criação de árvore de chaves determinísticas)
const bip39 = require("bip39"); // Biblioteca para BIP39 (geração de mnemônicos)
const bitcoin = require("bitcoinjs-lib"); // Biblioteca para BitcoinJS, que fornece várias funções relacionadas ao Bitcoin

// Definindo a rede
const network = bitcoin.networks.testnet; // Aqui estamos configurando a rede para a Testnet (rede de teste do Bitcoin)
// Se você quiser usar a rede principal (mainnet), você pode alterar para bitcoin.networks.bitcoin

// Definindo o caminho de derivação
// m / purpose' / coin_type' / account' / change / address_index
// O caminho m/49'/1'/0'/0 é um caminho de derivação BIP49, que é usado para gerar endereços P2WPKH em uma Testnet.
// 49' é o tipo de propósito (SegWit)
// 1' é o tipo de moeda (1' para Testnet e 0' para Mainnet)
// 0' é o número da conta
// 0 é a mudança (usada para diferenciar entre endereços de recebimento e de troco)
const path = `m/49'/1'/0'/0`;

// Criando a carteira
let mnemonic = bip39.generateMnemonic(); // Gera um mnemônico (frase de recuperação) aleatório
// Esse mnemônico é uma sequência de 12 a 24 palavras que podem ser usadas para gerar a seed da carteira

// Criando a seed da carteira
const seed = bip39.mnemonicToSeedSync(mnemonic); // Gera a seed (semente) a partir do mnemônico gerado
// A seed é um valor que será usado para derivar a raiz da árvore de chaves da carteira

// Criando a raiz da carteira
let root = bip32.fromSeed(seed, network); // Gera a raiz da carteira a partir da seed usando BIP32
// A raiz da carteira é o ponto de partida para derivar todas as chaves privadas e públicas subsequentes

// Criando a chave privada
let account = root.derivePath(path); // Deriva a chave da conta com base no caminho definido (BIP49)
let node = account.derive(0); // Deriva o primeiro nó (index 0) do caminho
// Esse nó contém a chave privada e pública da primeira conta derivada da raiz

// Criando o endereço da carteira (chave pública)
let btcAddress = bitcoin.payments.p2wpkh({
  pubkey: node.publicKey, // Usamos a chave pública derivada para gerar o endereço
  network: network, // Especificamos a rede Testnet
}).address; // Gera o endereço Bitcoin SegWit (P2WPKH) a partir da chave pública

// Exibindo os dados da carteira gerada
console.log("Carteira gerada\nEndereço:", btcAddress); // Mostra o endereço gerado no console
console.log("Chave privada:", node.toWIF()); // Mostra a chave privada no formato WIF (Wallet Import Format)
console.log("Seed:", mnemonic); // Mostra a frase mnemônica que foi usada para gerar a seed


/*
    para rodar o código, basta rodar o comando node src/createWallet.js
    sera gerado um endereço, uma chave privada e uma seed
    ex:
    Generated wallet
    Adress: 0000000000000000000000000000000000000000
    Private key: 00000000000000000000000000000000000000000000000000
    Seed: explain crunch cube cluster deliver father magnet abuse pony satoshi invite trigger
*/
