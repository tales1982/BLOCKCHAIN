// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract GradingSystem {
    address private owner;
    mapping(address => uint8) student;
    mapping(address => bool) approved;
    string private grade = "";

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner.");
        _;
    }

    function registerStudent(address _student, uint8 _grade) public {
        require(
            _student != address(0) &&
                student[_student] == 0 &&
                _grade > 0 &&
                _grade <= 100,
            "You need to provide the student's name and grade."
        );
        student[_student] = _grade;
    }

    function addGrade(
        address _student
    ) public onlyOwner returns (string memory) {
        require(_student != address(0), "Invalid student");
        require(student[_student] != 0, "Student not registered");

        if (student[_student] <= 20) {
            approved[_student] = false;
            grade = "F";
            approved[_student] = false;
        } else if (student[_student] >= 21 && student[_student] <= 39) {
            approved[_student] = false;
            grade = "D";
            approved[_student] = false;
        } else if (student[_student] >= 40 && student[_student] <= 59) {
            approved[_student] = false;
            grade = "C";
            approved[_student] = false;
        } else if (student[_student] >= 60 && student[_student] <= 79) {
            approved[_student] = true;
            grade = "B";
            approved[_student] = true;
        } else if (student[_student] >= 80 && student[_student] <= 100) {
            approved[_student] = true;
            grade = "A";
            approved[_student] = true;
        } else grade = "";
        return grade;
    }

    function isApproved(address user) public view returns (bool) {
    return student[user] < 60 ? false : true;
}
}
