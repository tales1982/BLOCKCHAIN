// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {StorangerSimple} from "../src/StorangerSimple.sol";

contract StorangerSimpleTest is Test {
    StorangerSimple public data;
    address deployer = address(0x1111);

    function setUp() public {
        vm.prank(deployer);        // faz o deploy "como" 0x1111
        data = new StorangerSimple();
    }

    function testOwnerIsDeployer() public view {
        assertEq(data.getOwner(), deployer, "Should be equal");
    }
}
