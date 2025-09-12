// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/08_ScolarGradeV2.sol";
import "forge-std/console.sol";

contract ScolarGradeTest is Test {
    ScolarGrade public scolarGrade;


    function setUp() public {
        scolarGrade = new ScolarGrade();
    }

   function test1InitialValue() public view {
        // Verifica os valores iniciais da entrada padrão com chave ""
        (string memory actualName, uint actualAge, bool actualBrasilian, uint actualNote, ScolarGrade.ScholarState actualStateScolar) = scolarGrade.student("");

        // Define os valores esperados
        string memory expectedName = "";
        uint expectedAge = 0;
        bool expectedBrasilian = true;
        uint expectedNote = 0;
        ScolarGrade.ScholarState expectedStateScolar = ScolarGrade.ScholarState.Undefined;

        // Verificações
        assertEq(actualName, expectedName, "O valor inicial de name deve ser uma string vazia");
        assertEq(actualAge, expectedAge, "O valor inicial de age deve ser 0");
        assertEq(actualBrasilian, expectedBrasilian, "O valor inicial de brasilian deve ser true");
        assertEq(actualNote, expectedNote, "O valor inicial de note deve ser 0");
        assertEq(uint(actualStateScolar), uint(expectedStateScolar), "O valor inicial de stateScolar deve ser Undefined");
    }

       function test2AddValue() public {
        // Adiciona um novo estudante
        scolarGrade.addStudent("Tales", 41, true, 10, ScolarGrade.ScholarState.Approved);

        // Verifica os valores para o estudante "Tales"
        (string memory actualName, uint actualAge, bool actualBrasilian, uint actualNote, ScolarGrade.ScholarState actualStateScolar) = scolarGrade.student("Tales");

        // Valores esperados
        string memory expectedName = "Tales";
        uint expectedAge = 41;
        bool expectedBrasilian = true;
        uint expectedNote = 10;
        ScolarGrade.ScholarState expectedStateScolar = ScolarGrade.ScholarState.Approved;

        // Verificações
        assertEq(actualName, expectedName, "O valor de name deve ser 'Tales'");
        assertEq(actualAge, expectedAge, "O valor de age deve ser 41");
        assertEq(actualBrasilian, expectedBrasilian, "O valor de brasilian deve ser true");
        assertEq(actualNote, expectedNote, "O valor de note deve ser 10");
        assertEq(uint(actualStateScolar), uint(expectedStateScolar), "O valor de stateScolar deve ser Approved");
    }

}
