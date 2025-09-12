// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GradeBook {
    // Mapping para associar um estudante (string) a um array de notas (uint8[])
    mapping(string => uint8[]) private studentGrades;

    // Função para adicionar uma nota para um estudante específico
    function addGrade(string memory _student, uint8 grade) public {
        studentGrades[_student].push(grade);
    }

    // Função para retornar todas as notas de um estudante específico
    function getGrades(
        string memory _student
    ) public view returns (uint8[] memory) {
        return studentGrades[_student];
    }
}
