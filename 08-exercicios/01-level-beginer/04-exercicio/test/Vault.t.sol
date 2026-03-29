// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import {Vault} from "../src/Vault.sol";

contract VaultTest is Test {
    Vault vault;

    function setUp() public{
        vault = new Vault(10);
    }

    function testCheckBalanceZero() public view{
        assertEq(vault.checkBalance(),0, "The balance should be equal 0");
    }

    function testDeposit() public {
        vault.deposit(100);
         assertEq(vault.checkBalance(),100, "The balance should be equal 100");
    }

    function testDepositNegative() public {
        vm.expectRevert("The deposit needs to be greater than 0.");
        vault.deposit(-10);
    }

    function testWithdrawOnlyOwner() public {
        vault.deposit(100);
        vault.withdraw(50);
        assertEq(vault.checkBalance(), 50, "Balance should be 50 after withdraw");
    }

    function testWithdrawNotOwner() public {
        vault.deposit(100);
        vm.prank(address(0xBEEF));// simula outro usuario
        vm.expectRevert("You are not the owner.");
        vault.withdraw(50);
    }

}