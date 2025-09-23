// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

/*
 * Escreva um contrato em solidity, que vai armazena favios livros, podendo adcionar pesquizar,
 sinta livre para incrementar outras fucionalidades 
 */

contract BookDatabase {
    struct Book {
        string title;
        uint16 year;
    }

    uint32 private nextId = 0;
    mapping(uint32 => Book) public books;
    address private immutable owner;

    uint32 public count;

    constructor() {
        owner = msg.sender;
    }

    function addBook(Book memory newBook) public {
        nextId++;
        books[nextId] = newBook;
        count++;
    }

    function compare(
        string memory str1,
        string memory str2
    ) public pure returns (bool) {
        bytes memory arraA = bytes(str1);
        bytes memory arraB = bytes(str2);
        return
            arraA.length == arraB.length &&
            keccak256(arraA) == keccak256(arraB);
    }

    function editBook(uint32 id, Book memory newBook) public {
        Book memory oldBook = books[id];

        if (
            !compare(oldBook.title, newBook.title) &&
            !compare(newBook.title, "")
        ) books[id].title = newBook.title;

        if (oldBook.year != newBook.year && newBook.year > 0)
            books[id].year = newBook.year;
    }

    function removeBook(uint32 id) public restricted {
        if (books[id].year > 0) {
            delete books[id];
            count--;
        }
    }

    modifier restricted() {
        //Onde tiver o restricted so o dono posso chamar
        require(owner == msg.sender, "You don't have permission");
        _;
    }
}
