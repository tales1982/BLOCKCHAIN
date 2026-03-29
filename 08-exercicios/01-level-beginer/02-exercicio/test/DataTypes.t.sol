// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/DataTypes.sol";

contract DataTypesTest is Test {
    DataTypes data;
    address owner;
    

    function setUp() public {
        data = new DataTypes();
        owner = msg.sender;
        

    }

   function  testAgeStartZero() public view {
    assertEq(data.getAge(), 0, "The age shoud be 0");
   }

   function testAge() public{
    data.setAge(40);
    assertEq(data.getAge(), 40,"The Age shoud be 40");
   }

   function testIsActive() public view {
    assertEq(data.getIsActive(), true, "isActive shoud be true");
   }

   function testIsActiveFalse() public {
    data.setIsctive(false);
    assertEq(data.getIsActive(), false,"IsActive shoud be false");
   }

   function testVersionOne() public view {
    assertEq(data.getVersion(), 1, "The VERSION sould be version 1");
   }

   function testOwner() public view {
    assertEq(data.OWNER(), address(this));
   }
}
