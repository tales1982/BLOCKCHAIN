//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract StudentsContract {
    struct Student {
        string studentName;
        uint studentAge;
    }

    mapping(address => Student) private _enrolledStudents;

  function getEnrolledStudentByAddress(address _studentAddress) public view returns (Student memory) {
    return _enrolledStudents[_studentAddress];
}


   function isStudentAgeValid(uint _studentAge) private pure returns (bool) {
        return _studentAge > 0;
    }

    function isStudentNameValid(string memory _studentName) private pure returns (bool) {
        bytes memory tempString = bytes(_studentName);
        return tempString.length > 0;
    }

    function isStudentValid(Student memory _student) private pure returns (bool) {
        return isStudentNameValid(_student.studentName) && isStudentAgeValid(_student.studentAge);
    }

    function enrollStudent(string memory _studentName, uint _studentAge) public {
        require(isStudentNameValid(_studentName), "Student name is not valid");
        require(isStudentAgeValid(_studentAge), "Student age is not valid");
        require(!isStudentValid(getEnrolledStudentByAddress(msg.sender)), "Student is already enrolled");

        Student memory student;
        student.studentName = _studentName;
        student.studentAge = _studentAge;

        assert(isStudentValid(student));

        _enrolledStudents[msg.sender] = student;
    }

}
