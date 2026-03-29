// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DataTypes {
    address public immutable OWNER;
    uint256 public age;
    bool public isActive = true;
    uint public constant VERSION = 1;

    constructor() {
        OWNER = msg.sender;
    }

    function setAge(uint256 _age) public {
        age= _age;
    }

    function getAge() public view returns(uint256) {
        return age;
    }

    function setIsctive(bool _isActive) public {
        isActive = _isActive;
    }

    function getIsActive() public view returns(bool){
        return isActive;
    }

    function getVersion() public pure returns(uint){
        return VERSION;
    }
}
