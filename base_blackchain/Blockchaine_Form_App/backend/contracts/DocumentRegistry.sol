// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Document Registry
/// @notice Registra hashes de documentos e permite que o dono firme um “termo de aceite”.
contract DocumentRegistry {
    /// Mapeia hash do documento ao proprietário que o registrou.
    mapping(bytes32 => address) public ownerOfHash;

    /// Emitted when um documento é registrado.
    event DocumentRegistered(
        address indexed user,
        bytes32 indexed docHash,
        uint256 timestamp
    );

    /// Emitted quando o proprietário assina o termo de aceite.
    event AgreementSigned(
        address indexed user,
        bytes32 indexed docHash,
        uint256 timestamp
    );

    /// Registra um novo documento (hash) na blockchain.
    /// @param docHash SHA-256 do PDF.
    function registerDocument(bytes32 docHash) external {
        require(ownerOfHash[docHash] == address(0), "Hash already registered");
        ownerOfHash[docHash] = msg.sender;
        emit DocumentRegistered(msg.sender, docHash, block.timestamp);
    }

    /// O dono do hash confirma que está de acordo com os dados.
    /// @param docHash hash previamente registrado.
    function signAgreement(bytes32 docHash) external {
        require(ownerOfHash[docHash] == msg.sender, "Only owner can sign");
        emit AgreementSigned(msg.sender, docHash, block.timestamp);
    }
}
