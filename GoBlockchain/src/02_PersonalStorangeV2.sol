// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
import "forge-std/console.sol";

contract PersonalDataStorangeV2 {
    string public name; // Visibilidade: public
    uint256 private age; // Visibilidade: private
    bool internal brasileiro; // Visibilidade: internal

    constructor() {
        name = "Jeremias";
        age = 10;
        brasileiro = true;
    }

    function setName(string memory _name) public {
        name = _name;
    }

    function setAge(uint256 _age) public {
        age = _age;
    }

    //Retorno do valor age
    function getAge() public view returns (uint256) {
        return age;
    }

    function setNacionalidade(bool _brasileiro) public {
        brasileiro = _brasileiro;
    }

    function getNacionalidade() public view returns (bool) {
        return brasileiro;
    }

    function incrementAge(uint _age, uint _s) public pure returns (uint) {
        uint result;
        result = _age + _s;
        return result;
    }
}
