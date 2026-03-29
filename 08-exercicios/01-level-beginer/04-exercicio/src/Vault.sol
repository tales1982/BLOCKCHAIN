// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;


contract Vault {
    address private owner;
    int private price;
    int private balance;

    constructor(int _price) {
        require(_price > 0, "Price must be greater than zero");
        owner = msg.sender;
        price = _price;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner.");
        _;
    }

    function deposit(int value) public {
        require(value >= price ,"The deposit needs to be greater than 0.");
        balance += value;
    }

    function withdraw(int value) public onlyOwner {
        require(balance >= value, "You don't have balance sufficient.");
        balance -= value;
    }

    function checkBalance() public view returns(int){
        return balance;
    }
}