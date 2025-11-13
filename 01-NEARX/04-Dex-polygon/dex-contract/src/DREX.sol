// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DREX is ERC20, Ownable {
    // OZ v5: precisa passar o owner no construtor
    constructor() ERC20("DREX", "DRX") Ownable(msg.sender) {}

    /// Mint controlado pelo owner
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid to");
        require(amount > 0, "Zero amount");
        _mint(to, amount);
    }
}

contract REAL is ERC20, Ownable {
    constructor() ERC20("Real", "BRT") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid to");
        require(amount > 0, "Zero amount");
        _mint(to, amount);
    }
}
