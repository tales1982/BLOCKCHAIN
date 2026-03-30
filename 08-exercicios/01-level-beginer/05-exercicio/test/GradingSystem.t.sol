// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import {GradingSystem} from "../src/GradingSystem.sol";

contract GradingSystemTest is Test {
    GradingSystem grading;
    address user1 = address(0xBEEF);
    address user2 = address(0xBAAF);
    address user3 = address(0xBDEF);
    address user4 = address(0xAAAF);
    address user5 = address(0xBEAF);
    
    

    function setUp() public {
        grading = new GradingSystem();
    }

    function test_RegisterStudent_SetsGrade() public {
        grading.registerStudent(user1, 85);
        grading.registerStudent(user2, 45);
    }

    function test_addGrade() public {
        grading.registerStudent(user1, 5);
        grading.registerStudent(user2, 35);
        grading.registerStudent(user3, 55);
        grading.registerStudent(user4, 75);
        grading.registerStudent(user5, 95);

        assertEq(grading.addGrade(user1), "F", "Shoud be to equal 'F'");
        assertEq(grading.addGrade(user2), "D", "Shoud be to equal 'D'");
        assertEq(grading.addGrade(user3), "C", "Shoud be to equal 'C'");
        assertEq(grading.addGrade(user4), "B", "Shoud be to equal 'B'");
        assertEq(grading.addGrade(user5), "A", "Shoud be to equal 'A'");
    }

    function test_isAproved() public{
        grading.registerStudent(user1, 5);
        grading.registerStudent(user2, 95);
        assertEq(grading.isApproved(user1), false, "Shoud be to equal 'False'");
        assertEq(grading.isApproved(user2), true, "Shoud be to equal 'true'");
    }


}
