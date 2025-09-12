// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/04_Factorial.sol";

contract FactorialTest is Test {
    Factorial public factorial;

    function setUp() public{
        factorial = new Factorial();
    }

    function testFactorialOf1() public view {
        uint256 result = factorial.calcFact(1);
        assertEq(result, 1, "Factorial of 1 should be 1");
        console.log("Factorial of 1:", result);
    }

    function testFactorialOf5() public view {
        uint256 result = factorial.calcFact(5);
        assertEq(result, 120, "Factorial of 5 should be 120");
        console.log("Factorial of 5:", result);
    }

    function testFactorialOf10() public view {
        uint256 result = factorial.calcFact(10);
        assertEq(result, 3628800, "Factorial of 10 should be 3628800");
        console.log("Factorial of 10:", result);
    }
}
