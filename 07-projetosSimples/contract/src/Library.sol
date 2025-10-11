// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

struct Boocks {
    uint8 id;
    string title;
    uint256 rentalPrice;
    bool available;
}

struct Clientes {
    string name;
    uint8 age;
    bool legalAge;
}

contract Library {
    Boocks[] public books;
    Clientes[] client;
    address owner;

    constructor() {
        owner = msg.sender;
        books.push(
            Boocks(1, "The Blockchain Revolution", 1000000000000000000, true)
        ); // 1 ETH
        books.push(
            Boocks(2, "Solidity for Beginners", 500000000000000000, true)
        ); // 0.5 ETH
        books.push(
            Boocks(3, "DeFi and Smart Contracts", 750000000000000000, true)
        ); // 0.75 ETH
        books.push(Boocks(4, "Mastering Ethereum", 1200000000000000000, true)); // 1.2 ETH
        books.push(
            Boocks(5, "Tokenization Explained", 900000000000000000, true)
        );
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "only the owner of the contract can add books"
        );
        _;
    }

    function addBoocks(Boocks memory _book) public onlyOwner {
        books.push(_book);
    }

    function getBooksLength() public view returns (uint) {
        return books.length;
    }

    function getBoocks() public view returns (Boocks[] memory){
        return books;
    }
}
