// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract SimpleContract {
    uint public age;
    string public name;
    address public owner;

    // Custom error (Solidity >=0.8.4) para economizar gás
    error Unauthorized(address caller);

    constructor() {
        owner = msg.sender;
    }

    /// @notice Define uma nova idade, maior que zero
    function setAge(uint _age) public {
        require(_age > 0, "A idade tem que ser maior que 0");
        age = _age;
    }

    /// @notice Define um novo nome
    function setName(string memory _name) public {
        name = _name;
    }

    /// @notice Apenas o owner pode "assinar" com nome e idade
    function signer(string memory _name, uint _age) public {
        // check de autorização
        if (msg.sender != owner) {
            revert Unauthorized(msg.sender);
        }

        // Exemplo de lógica: atualiza nome e idade juntos
        require(_age > 0, "A idade tem que ser maior que 0");
        name = _name;
        age  = _age;
    }

    /// @return idade atual armazenada
    function getAge() public view returns (uint) {
        return age;
    }

    /// @return nome atual armazenado
    function getName() public view returns (string memory) {
        return name;
    }
}
