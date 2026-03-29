// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import {Calculator} from "../src/Calculator.sol";

contract CalculatorTest is Test {
    Calculator calc;

    function setUp() public {
        calc = new Calculator();
    }

    function test_initialResult() public view {
        assertEq(calc.revealResult(), 0, "The rusuld shoud be 0");
    }

    function test_add() public {
        assertEq(calc.add(2, 5), 7, "The sum shoud be 7");
    }

    function testAdd() public {
        assertEq(calc.operation(3,'+',5), 8, "The sum shoud be 8");
        assertEq(calc.revealResult(), 8, "The result shoud be 8");
    }

        function testmult() public {
        assertEq(calc.operation(3,'*',5), 15, "The Multiplication shoud be 15");
        assertEq(calc.revealResult(), 15, "The result shoud be 15");
    }

     function testSub() public {
        assertEq(calc.operation(3,'-',5), -2, "The sum shoud be -2");
        assertEq(calc.revealResult(), -2, "The result shoud be -2");
    }

    function testMsgFail() public {
    vm.expectRevert("Operador invalido. Use: +, - ou *");
    calc.operation(2, '?', 5);
}
    
}
