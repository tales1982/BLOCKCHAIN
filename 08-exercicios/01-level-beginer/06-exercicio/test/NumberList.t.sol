// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import {NumberList} from "../src/NumberList.sol";

contract NumberListTest is Test {
    NumberList num;
    //uint256 public number[];

    function setUp()public{
        num = new NumberList();
    }

    function test_add() public {
        num.add(7);
        uint256[] memory all = num.getAll();
        assertEq(all.length, 1, "The All Should be equal 1");
        assertEq(all[0], 7, "The number Should be equal 7");
    }

    function test_removeSwap() public {
        num.add(10);
        num.add(20);
        num.add(30);
        num.add(40);
        num.add(50);
        uint256[] memory all = num.getAll();
        assertEq(all.length, 5, "Should be equal 5");
        
        num.remove(1);
        all = num.getAll();
        assertEq(all.length, 4, "Should be equal 4");
        assertEq(all[1], 50, "Should be equal 50");
        assertEq(all[3], 40, "Should be equal 40");
    }

    function test_getLength() public {
        num.add(10);
        num.add(20);
        num.add(30);
        num.add(40);
        uint256[] memory all = num.getAll();

        assertEq(num.length(), all.length, "Should be equal 4");
    }

    function test_exist() public {
        num.add(10);
        num.add(20);
        num.add(30);
        num.add(40);
        num.add(50);

        uint256[] memory all = num.getAll();
        
        assertEq(num.exists(30), true, "Should be TRUE");
        assertEq(num.exists(70), false, "Should be TRUE");

    }
 

}