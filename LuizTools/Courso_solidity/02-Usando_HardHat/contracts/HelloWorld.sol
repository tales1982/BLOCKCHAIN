// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
// descomente esta linha para usar o console.log
import "hardhat/console.sol";

contract HelloWorld {
    string public message = "Hello World";


    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
