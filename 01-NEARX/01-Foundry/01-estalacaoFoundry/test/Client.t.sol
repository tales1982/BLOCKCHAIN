// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Client} from "../src/Client.sol"; // ajuste o caminho se necessário

contract ClientTest is Test {
    Client c;

    function setUp() public {
        c = new Client();
    }

    function test_PrintClient() public {
        c.setClient("Alice");
        // isso vai imprimir "Alice" no terminal (via console.log no contrato)
        c.printClient();
        // sem assert aqui, é só um smoke test de log
    }
}
