// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// If using Foundry, update to:
import {ERC20} from "lib/solady/src/tokens/ERC20.sol";


contract Token is ERC20 {
    constructor(uint256 amount, string memory /* name */) {
        _mint(msg.sender, amount * 1e18);
    }

    function name() public pure override returns (string memory) {
        return "My Token";
    }

    function symbol() public pure override returns (string memory) {
        return "TOKEN";
    }

    

    

    // (opcional) padronize 18 casas
    // function decimals() public view override returns (uint8) { return 18; }
}
