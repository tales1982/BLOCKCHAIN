// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";

import {Token} from "../src/Token.sol";

import {console} from "forge-std/console.sol";

contract TestToken is Test {
    Token token;

    address Bob = address(0x111);
    address Alice = address(0x222);

    function setUp() public {
        vm.label(Bob, "BOB");
        vm.label(Alice, "ALICE");

        vm.prank(Bob);
        token = new Token(100, "TRC");
    }

    function testInitialSupply() public view{
                // totalSupply = amount * 1e18
        assertEq(token.totalSupply(), 100 * 1e18, "totalSupply incorreto");
        assertEq(token.balanceOf(Bob), 100 * 1e18, "saldo inicial do Bob incorreto");
        assertEq(token.balanceOf(Alice), 0, "Alice deveria iniciar com 0");
    }

    function testMetadata() public view {
        assertEq(token.name(), "My Token");
        assertEq(token.symbol(), "TOKEN");
        assertEq(token.decimals(), 18);
    }

    function testTransfer() public {
        vm.prank(Bob);
        token.transfer(Alice, 90 * 1e18);
        //console.log("Bob balance:", token.balanceOf(Bob));
        //console.log("Alice balance:", token.balanceOf(Alice));
        assertEq(token.balanceOf(Alice), 90 * 1e18, "saldo da Alice deveria ser 90 * 1e18");
    }
    
    function testTransferFail() public {
        vm.prank(Alice);
        vm.expectRevert();
        token.transfer(Bob, 200);
    }

    function testAddBalance() public {

        console.log("Alice balance:", token.balanceOf(Alice));
        vm.prank(Alice);
        vm.deal(Alice, 200 * 1e18);
        console.log("Alice balance:", token.balanceOf(Alice));
        assertEq(token.balanceOf(Alice), 200 * 1e18);
    }
}
