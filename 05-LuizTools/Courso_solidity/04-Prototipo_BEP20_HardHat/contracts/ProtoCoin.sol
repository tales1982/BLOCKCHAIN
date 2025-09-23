// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ProtoCoin is ERC20 {

    address private _owner; 
    uint private _mintAmount = 0;
    uint private _mintDelay = 60 * 60 * 24; // 1day in secunds

    mapping(address => uint256) private nextMint;

    constructor() ERC20("ProtoCoin", "PRC") {
        _mint(msg.sender, 10000 * 10 ** 18);
    }

    function mint() public {
        require(_mintAmount > 0, "Minting is not enabled");
        require(block.timestamp > nextMint[msg.sender], "You cannot mint twice in a row.");
        _mint(msg.sender, _mintAmount);
        nextMint[msg.sender] = block.timestamp + _mintDelay;
    }

    function setMintAmount( uint newAmount ) public restricted{
        _mintAmount = newAmount;
    }

    modifier restricted(){
        require(_owner == msg.sender, "You do not have permission");
        _;
    }
}
