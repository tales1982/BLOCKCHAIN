// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract StorangerSimple {
    uint256 public _number;
    string private _name;
    address private _owner;

    constructor() {
        _owner = msg.sender;   // <--- define o owner no deploy
        _name = "Default";
    }

    function getOwner() public view returns (address) {
        return _owner;
    }

    function setNumber(uint256 newNumber) public {
        _number = newNumber;
    }

    function setName(string memory name) public {
        _name = name;
    }
}
