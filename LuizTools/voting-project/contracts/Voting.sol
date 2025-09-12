// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;

contract Voting {

    // Lista de candidatos
    string[] public candidateList;

    // Mapeamento para contar os votos recebidos por cada candidato
    mapping (string => uint256) public votesReceived;

    // Construtor que inicializa a lista de candidatos
    constructor (string[] memory candidateNames) {
        candidateList = candidateNames;
    }

    // Função para obter o total de votos de um candidato específico
    function totalVotesFor(string memory candidate) public view returns (uint256) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    // Função para votar em um candidato
    function voteForCandidate(string memory candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }

    // Função para verificar se o candidato é válido
    function validCandidate(string memory candidate) public view returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if(keccak256(abi.encodePacked(candidateList[i])) == keccak256(abi.encodePacked(candidate))) {
                return true;
            }
        }
        return false;
    }
}
