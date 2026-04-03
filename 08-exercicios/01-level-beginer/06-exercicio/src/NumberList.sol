// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;


contract NumberList {

    uint256[] public numbers;

    function add(uint256 n) public {
        numbers.push(n);
    }

    function getAll() public view returns(uint256[] memory){
        return numbers;
    }

    function remove(uint256 index) public {
        require(index < numbers.length, "Indice fora dos limites");
        numbers[index] = numbers[numbers.length - 1];
        numbers.pop();
    }

    function length() view public returns (uint256){
        return numbers.length;
    }


function exists(uint256 value) public view returns (bool) {
    for (uint256 i = 0; i < numbers.length; i++) {
        if (numbers[i] == value) return true;
    }
    return false;
}
}