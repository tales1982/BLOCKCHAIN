// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Client} from "../src/Client.sol";

contract ClientScript is Script {
    Client public client;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        client = new Client();

        vm.stopBroadcast();
    }
}
