// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {StorangerSimple} from "../src/StorangerSimple.sol";

contract CounterScript is Script {
    StorangerSimple public data;
    address owner;
    function setUp() public {
        owner = address(0x1111);
    }

    function run() public {
        vm.startBroadcast();

        data = new StorangerSimple();

        vm.stopBroadcast();
    }
}
