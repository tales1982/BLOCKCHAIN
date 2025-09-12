// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrderManager {
    address public owner;

    struct Order {
        uint orderId;
        string productName;
        uint256 quantity;
        address clientId;
        OrderStatus status;
    }

    enum OrderStatus {
        Pending,
        Processing,
        Shipped,
        Delivered,
        Cancelled
    }

    uint public nextOrderId;
    mapping(uint => Order) public orders;
    mapping(address => uint[]) public clientOrders;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addOrder(string memory _productName, uint256 _quantity) public {
        require(_quantity > 0, "Quantity must be greater than zero");

        orders[nextOrderId] = Order({
            orderId: nextOrderId,
            productName: _productName,
            quantity: _quantity,
            clientId: msg.sender,
            status: OrderStatus.Pending
        });

        clientOrders[msg.sender].push(nextOrderId);
        nextOrderId++;
    }

    function updateStatus(uint _orderId, OrderStatus _newStatus) public onlyOwner {
        require(_orderId < nextOrderId, "Order does not exist");
        orders[_orderId].status = _newStatus;
    }

    function getOrder(uint _orderId) public view returns (Order memory) {
        require(_orderId < nextOrderId, "Order does not exist");
        return orders[_orderId];
    }

    function listClientOrders(address _client) public view returns (uint[] memory) {
        return clientOrders[_client];
    }
}
