// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

import {Script} from "forge-std/Script.sol";
import {EventosTransactions} from "../src/EventosTransactions.sol";

contract DeployEventosTransactionsScript is Script {
    EventosTransactions public contractAdreess;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        contractAdreess = new EventosTransactions();

        vm.stopBroadcast();
    }
}