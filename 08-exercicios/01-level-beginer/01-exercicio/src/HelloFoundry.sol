// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract HelloFoundry {

    string public  message = "Tales Lima";

    function getMessage() public view returns (string memory){
        return message;
    }

}