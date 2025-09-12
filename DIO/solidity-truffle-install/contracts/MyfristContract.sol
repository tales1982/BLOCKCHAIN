// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract MyfristContract {
    string public myString = "Hello World!";

    function getString() public view returns(string memory) {
        return myString;
    }
}
