// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/05_ArrayMapping.sol";

contract GradeBookTest is Test {
    GradeBook public gradeBook;

    function setUp() public {
        gradeBook = new GradeBook();
    }

    // Teste para verificar que o valor inicial de um aluno sem notas é um array vazio
    function testInitialValue() public view {
        uint8[] memory grades = gradeBook.getGrades("Alice");
        console.log("Initial grades length:", grades.length); // Log do comprimento do array
        assertEq(grades.length, 0, "Initial grade array should be empty");
    }

    // Teste para adicionar uma única nota
    function testAddSingleGrade() public {
        gradeBook.addGrade("Alice", 85);
        
        uint8[] memory grades = gradeBook.getGrades("Alice");
        console.log("Grades length after adding one grade:", grades.length); // Log do comprimento do array
        console.log("First grade added:", grades[0]); // Log da primeira nota
        assertEq(grades.length, 1, "Grade array length should be 1 after adding one grade");
        assertEq(grades[0], 85, "First grade should be 85");
    }

    // Teste para adicionar múltiplas notas e verificar a integridade dos valores
    function testAddMultipleGrades() public {
        // Adicionar várias notas diretamente ao contrato
        gradeBook.addGrade("Alice", 85);
        gradeBook.addGrade("Alice", 90);
        gradeBook.addGrade("Alice", 78);

        uint8[] memory grades = gradeBook.getGrades("Alice");

        console.log("Grades length after adding three grades:", grades.length); // Log do comprimento do array
        for (uint i = 0; i < grades.length; i++) {
            console.log("Grade", i, ":", grades[i]); // Log de cada nota
        }

        assertEq(grades.length, 3, "Grade array length should be 3 after adding three grades");
        assertEq(grades[0], 85, "First grade should be 85");
        assertEq(grades[1], 90, "Second grade should be 90");
        assertEq(grades[2], 78, "Third grade should be 78");
    }
}
