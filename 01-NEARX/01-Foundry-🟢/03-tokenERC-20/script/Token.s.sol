// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {Token} from "../src/Token.sol";
import{console} from "forge-std/console.sol";


/*
contract Deploy is Script {
    function run() external {
        // recomendo usar env var, mas ok para anvil/local:
        vm.startBroadcast(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80);

        Token token = new Token(1_000_000, "TRC");
        console.log("Contract Deploy Address is:", address(token));

        vm.stopBroadcast();
    }
}
*/
//Para fazer o deploy na rede de verdade tenho que executa o comando abaixo
// forge script script/Token.s.sol:Deploy --rpc-url http://127.0.0.1:8545 --broadcast 



contract Deploy is Script {
    uint256 public amount = 25 * 1e18;
    address[] public clients;

    function setUp() public {
        clients = [
            address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8),
            address(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC),
            address(0x90F79bf6EB2c4f870365E785982E1f101E93b906),
            address(0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65)
        ];
    }

    function run() external {
        setUp(); // <- importante!

        uint256 PK = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        vm.startBroadcast(PK);

        // Mint suficiente: 1_000_000 * 1e18 (seu Token multiplica por 1e18 no construtor)
        Token  enderecoContrato = new Token(100, "SPV");//endereco do contrato
        address owner = vm.addr(PK);//pega a cheve publica

        console.log("Owner:", owner);
        console.log("Owner Private Key :", PK);
        //console.log("SPV:", address(spv));
        console.log("Owner balance (before):", enderecoContrato.balanceOf(owner));

        for (uint i = 0; i < clients.length; i++) {
            enderecoContrato.transfer(clients[i], amount);
        }

        console.log("Owner balance (after):", enderecoContrato.balanceOf(owner));
        console.log("Tales:",  enderecoContrato.balanceOf(clients[0]));
        console.log("Ricardo:", enderecoContrato.balanceOf(clients[1]));
        console.log("Andre:",   enderecoContrato.balanceOf(clients[2]));
        console.log("Sandro:",  enderecoContrato.balanceOf(clients[3]));

        vm.stopBroadcast();
    }
}
