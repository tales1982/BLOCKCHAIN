// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ScolarGrade {
    enum ScholarState {
        Approved,
        Reproved,
        Zero,
        Undefined
    }

    struct Students  {
        string name;
        uint age;
        bool brasilian;
        uint note;
        ScholarState stateScolar;
    }

    mapping(string => Students) public student;

    constructor() {
        student[""] = Students(
            "",
            0,
            true,
            0,
            ScholarState.Undefined
        );
    }

    function addStudent(
        string memory _name,
        uint _age,
        bool _brasilien,
        uint _note,
        ScholarState _stateScolar
    ) public {
        student[_name] = Students(_name, _age, _brasilien, _note,_stateScolar);
    }

     function checkStudentStates(string memory _nameStudent, uint _note) public returns (Students memory) {
        student[_nameStudent].note = _note;
        
        if (_note >= 7) {
            student[_nameStudent].stateScolar = ScholarState.Approved;
        } else if (_note == 0) {
            student[_nameStudent].stateScolar = ScholarState.Zero;
        } else {
            student[_nameStudent].stateScolar = ScholarState.Reproved;
        }

        return student[_nameStudent];
    }
}
