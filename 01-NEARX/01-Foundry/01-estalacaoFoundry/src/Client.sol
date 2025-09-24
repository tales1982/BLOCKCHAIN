// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {console} from "forge-std/console.sol";//serve pra imprimir como console.log

contract Client {
    string public client;

    function setClient(string memory _client) public {
        client = _client;
    }

    function printClient() public view{
       console.log("Nome do client", client);
    }
}
