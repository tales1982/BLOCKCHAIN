// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/06_Petition.sol";

contract PetitionTest is Test {
    Petition public petition;

    function setUp() public {
        petition = new Petition();
    }

    // Teste para verificar que o valor inicial do estado dos nomes é "undefined"
    function test1InitialValue() public {
        petition.addName("Tales");
        petition.addName("Theo");
        petition.addName("Tomas");
        assertEq(petition.nameStatus("Tales"), "undefined");
        assertEq(petition.nameStatus("Theo"), "undefined");
        assertEq(petition.nameStatus("Tomas"), "undefined");
    }

    function test2addValue() public {
        petition.addName("Tales");
        petition.addName("Theo");
        petition.addName("Tomas");

        petition.addStates("Tales", "signed");
        petition.addStates("Theo", "pending");
        petition.addStates("Tomas", "pending");

        assertEq(petition.nameStatus("Tales"), "signed");
        assertEq(petition.nameStatus("Theo"), "pending");
        assertEq(petition.nameStatus("Tomas"), "pending");
    }
}
