// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/07_StruckEnum.sol";

contract OrderManagerTest is Test {
    OrderManager public orderManager;

    function setUp() public {
        orderManager = new OrderManager();
    }

    function test1AddOrder() public {
        // Call addOrder to create a new order
        string memory productName = "Laptop";
        uint256 quantity = 10;
        orderManager.addOrder(productName, quantity);

        // Check if the order was created correctly
        (uint orderId, string memory savedProductName, uint256 savedQuantity, address clientId, OrderManager.OrderStatus status) = orderManager.orders(0);
        
        assertEq(orderId, 0);
        assertEq(savedProductName, productName);
        assertEq(savedQuantity, quantity);
        assertEq(clientId, address(this)); // Should be the test contract's address
        assertEq(uint(status), uint(OrderManager.OrderStatus.Pending));
    }

    function test2UpdateStatus() public {
        // First, add an order
        string memory productName = "Laptop";
        uint256 quantity = 10;
        orderManager.addOrder(productName, quantity);

        // Update the status of the order
        // As the contract owner, we should be able to update the status
        vm.prank(orderManager.owner()); // Ensures that only the owner can update status
        orderManager.updateStatus(0, OrderManager.OrderStatus.Shipped);

        // Retrieve the updated order
        (, , , , OrderManager.OrderStatus status) = orderManager.orders(0);
        
        // Check if the status was updated to Shipped
        assertEq(uint(status), uint(OrderManager.OrderStatus.Shipped));
    }

    function test3GetOrder() public {
        // Add an order to test getOrder
        string memory productName = "Laptop";
        uint256 quantity = 10;
        orderManager.addOrder(productName, quantity);

        // Retrieve the order using getOrder function
        OrderManager.Order memory order = orderManager.getOrder(0);

        // Check if the order details match
        assertEq(order.orderId, 0);
        assertEq(order.productName, productName);
        assertEq(order.quantity, quantity);
        assertEq(order.clientId, address(this)); // Should be the test contract's address
        assertEq(uint(order.status), uint(OrderManager.OrderStatus.Pending));
    }

    function test4ListClientOrders() public {
        // Add two orders for the same client (test contract)
        orderManager.addOrder("Laptop", 5);
        orderManager.addOrder("Phone", 3);

        // Retrieve the list of orders for the client
        uint[] memory clientOrderIds = orderManager.listClientOrders(address(this));

        // Check that the client has two orders and IDs match
        assertEq(clientOrderIds.length, 2);
        assertEq(clientOrderIds[0], 0);
        assertEq(clientOrderIds[1], 1);
    }
}
