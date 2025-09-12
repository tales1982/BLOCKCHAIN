// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Petition {
    string[] public firstThreeNames;
    string[] public othersNames;
    mapping(string => string) public nameStatus;

    function addName(string memory _name) public {
        if (firstThreeNames.length < 3) firstThreeNames.push(_name);
        else othersNames.push(_name);
        nameStatus[_name] = "undefined";
    }

    function addStates(
        string memory _name,
        string memory _status
    ) public returns (string memory) {
        nameStatus[_name] = _status;
        return nameStatus[_name];
    }
}
