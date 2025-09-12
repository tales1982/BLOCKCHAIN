// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleEstorange {
    uint256 private storedData;

    //funcao para armazenar um valor
    function set(uint256 x) public {
        storedData = x;
    }

    //funcao pra recuperar o valor armazenado
    function get() public view returns (uint256) {
        return storedData;
    }
}
