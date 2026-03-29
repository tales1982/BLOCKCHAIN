 //SPDX-License-Identifier: MIT
 pragma solidity ^0.8.13;

 import "forge-std/Test.sol";
 import "../src/HelloFoundry.sol";

 contract HelloFoundryTest is Test {
     HelloFoundry hello;
     function setUp() public {
         hello = new HelloFoundry();
     }
     function testMessage() public {
         assertEq(hello.getMessage(), "Tales Lima");
     }
 }