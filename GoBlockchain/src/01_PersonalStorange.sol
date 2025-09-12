// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract PersonalStorage {
    string public nome; // Visibilidade: public
    uint256 private idade; // Visibilidade: private
    bool internal brasileiro; // Visibilidade: internal

    constructor() {
        nome = "Jeremias";
        idade = 10;
        brasileiro = true;
    }

    // Função para acessar os dados para testes
    function getClientData()
        public
        view
        returns (string memory, uint256, bool)
    {
        return (nome, idade, brasileiro);
    }
}
