// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "forge-std/console.sol";

contract ScholarHistory {
    struct Person {
        string name;
        uint8 notes;
        string status; // Armazena o status escolar
    }

    Person public student;

    constructor() {
        student.notes = 0;
        student.name = "";
        student.status = "empty"; // Estado inicial como "empty"
    }

    function addDate(
        string memory _name,
        uint8 _notes
    ) public returns (Person memory) {
        student.name = _name;
        student.notes = _notes;

        if (_notes >= 7) {
            student.status = "Aprovado";
        } else if (_notes == 0) {
            student.status = "Zero";
        } else {
            student.status = "Reprovado";
        }

        return student;
    }

    function printStudent() public view returns (Person memory) {
        return student;
    }
}
