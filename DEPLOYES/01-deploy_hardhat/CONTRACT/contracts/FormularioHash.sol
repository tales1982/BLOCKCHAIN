// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract FormularioHash {
    event FormularioRegistrado(address indexed remetente, bytes32 hash);

    mapping(address => bytes32[]) public formularios;

    function registrarFormulario(bytes32 hashFormulario) public {
        formularios[msg.sender].push(hashFormulario);
        emit FormularioRegistrado(msg.sender, hashFormulario);
    }

    // Opcional: para ler os hashes registrados pelo usuário
    function meusFormularios() public view returns (bytes32[] memory) {
        return formularios[msg.sender];
    }
}
