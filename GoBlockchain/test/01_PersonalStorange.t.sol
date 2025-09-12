// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "lib/forge-std/src/Test.sol";
import "../src/01_PersonalStorange.sol";

contract PersonalStorageTest is Test {
    PersonalStorage personalStorage;

    function setUp() public {
        // Inicializa o contrato antes de cada teste
        personalStorage = new PersonalStorage();
    }

    function testInitialValues() public view {  // Adiciona 'view' conforme recomendado
        // Verifica o valor inicial de "nome"
        assertEq(personalStorage.nome(), "Jeremias");

        // Usa getClientData para obter idade e nacionalidade
        (, uint256 idade, bool brasileiro) = personalStorage.getClientData();

        // Verifica o valor de "idade" e "nacionalidade"
        assertEq(idade, 10);
        assertTrue(brasileiro);//true
    }
}

