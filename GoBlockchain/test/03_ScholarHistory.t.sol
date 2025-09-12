// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/03_ScholarHistory.sol";

contract ScholarHistoryTest is Test {
    ScholarHistory public scholarHistory;

    function setUp() public {
        scholarHistory = new ScholarHistory();
    }

    function test1InitialValues() public view {
        (string memory name, uint8 notes, string memory status) = scholarHistory.student();
        assertEq(notes, 0);
        assertEq(name, "");
        assertEq(status, "empty"); // Verifica se o estado inicial é "empty"
        console.log("================= Start ====================");
        console.log("Student name:", name);
        console.log("Student notes:", notes);
        console.log("Student status:", status);
    }

    function test2AddDateAprovado() public {
        scholarHistory.addDate("John Doe", 8);
        (string memory name, uint8 notes, string memory status) = scholarHistory.student();
        assertEq(name, "John Doe");
        assertEq(notes, 8);
        assertEq(status, "Aprovado"); // Verifica se o status é "Aprovado" para nota >= 7
        console.log("=============== add dates =================");
        console.log("Student name:", name);
        console.log("Student notes:", notes);
        console.log("Student status:", status);
    }

    function test3AddDateReprovado() public {
        scholarHistory.addDate("John Doe", 5);
        (string memory name, uint8 notes, string memory status) = scholarHistory.student();
        assertEq(name, "John Doe");
        assertEq(notes, 5);
        assertEq(status, "Reprovado"); // Verifica se o status é "Reprovado" para nota < 7 e diferente de 0
        console.log("============= test Reprovado =============");
        console.log("Student name:", name);
        console.log("Student notes:", notes);
        console.log("Student status:", status);
    }

    function test4AddDateZero() public {
        scholarHistory.addDate("John Doe", 0);
        (string memory name, uint8 notes, string memory status) = scholarHistory.student();
        assertEq(name, "John Doe");
        assertEq(notes, 0);
        assertEq(status, "Zero"); // Verifica se o status é "Zero" para nota igual a 0
        console.log("============= test Zero =============");
        console.log("Student name:", name);
        console.log("Student notes:", notes);
        console.log("Student status:", status);
    }
}

