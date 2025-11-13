// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

//import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
struct Boocks {
    uint8 id;
    string title;
    uint256 rentalPrice;
    bool available;
}

contract Library {
    Boocks[] public books;
    address owner;

    // Quem está com cada livro alugado (0x0 = ninguém)
    mapping(uint8 => address) public renterOf;

    constructor() {
        owner = msg.sender;

        books.push(Boocks(1, "Blockchain Revolution", 1e18, true));
        books.push(Boocks(2, "Solidity for Beginners", 1e18, true));
        books.push(Boocks(3, "DeFi and Contracts", 1e18, true));
        books.push(Boocks(4, "Mastering Ethereum", 1e18, true));
        books.push(Boocks(5, "Tokenization Explained", 1e18, true));
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "only the owner of the contract can add books"
        );
        _;
    }

    function addBoocks(
        string memory _title,
        uint256 _rentalPrice
    ) public onlyOwner {
        uint8 newId = uint8(books.length + 1);
        books.push(Boocks(newId, _title, _rentalPrice, true));
    }

    function getBooksLength() public view returns (uint) {
        return books.length;
    }

    function getBoocks() public view returns (Boocks[] memory) {
        return books;
    }

    function rentBook(uint8 bookId) external payable {
        require(bookId > 0 && bookId <= books.length, "invalid id");
        Boocks storage b = books[bookId - 1];
        require(b.available, "The book is not available");
        require(msg.value >= b.rentalPrice, "Not enough ETH sent");

        b.available = false;
        renterOf[bookId] = msg.sender;
    }

    function returnBool(uint8 _bookId) external {
        require(_bookId > 0 && _bookId <= books.length, "invalid id");
        require(renterOf[_bookId] == msg.sender, "not you rental");

        books[_bookId - 1].available = true;
        renterOf[_bookId] = address(0); 
    }

}
