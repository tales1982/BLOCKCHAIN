// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Factorial {
    function calcFact(uint256 _facN) public pure returns (uint256) {
        uint256 factResult = 1;
        for (uint256 i = _facN; i > 1; i--) {
            factResult *= i;
        }
        return factResult;
    }
}
