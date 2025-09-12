// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
/*
Baixe e instale o Foundry
Para baixar e instalar o Foundry, você pode usar o comando abaixo:
- curl -L https://foundry.paradigm.xyz | bash

Após instalar, você precisa inicializar o Foundry para baixar as ferramentas:
- foundryup

Verifique a instalação
- forge --version

Para conpilar e rodar o teste
- forge build && forge test -vv, para compila e executar
- forge test -vv --match-path test/01_PersonalStorange.t.sol , testa 1 unico arquivo
*/