// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/TokenPadraoERC20.sol";

contract TokenPadraoERC20Test is Test {
    TokenPadraoERC20 token; // Instância do contrato

    address deployer = address(1); // Endereço do deployer
    address user1 = address(2);    // Endereço do usuário 1
    address user2 = address(3);    // Endereço do usuário 2

    function setUp() public {
        // Configurar o ambiente inicial
        vm.startPrank(deployer); // Define o deployer como remetente da transação
        token = new TokenPadraoERC20(); // Implanta o contrato
        vm.stopPrank(); // Para o "prank" do deployer
    }

    function testInitialSupply() public {
        // Verifica se o deployer recebeu o total de tokens
        assertEq(token.balanceOf(deployer), 10 ether);
    }

    function testTransfer() public {
        // Simula uma transação de transferência
        vm.startPrank(deployer);
        bool success = token.transfer(user1, 5 ether);
        vm.stopPrank();

        // Verifica o resultado
        assertTrue(success);
        assertEq(token.balanceOf(deployer), 5 ether); // Saldo reduzido
        assertEq(token.balanceOf(user1), 5 ether);    // Saldo aumentado
    }

    function testApproveAndAllowance() public {
        // Simula uma aprovação
        vm.startPrank(deployer);
        bool success = token.approve(user1, 3 ether);
        vm.stopPrank();

        // Verifica o resultado
        assertTrue(success);
        assertEq(token.allowance(deployer, user1), 3 ether); // Verifica a permissão
    }

    function testTransferFrom() public {
        // Aprova `user1` para gastar tokens do deployer
        vm.startPrank(deployer);
        token.approve(user1, 3 ether);
        vm.stopPrank();

        // Simula a transferência autorizada de `user1` para `user2`
        vm.startPrank(user1);
        bool success = token.transferFrom(deployer, user2, 2 ether);
        vm.stopPrank();

        // Verifica o resultado
        assertTrue(success);
        assertEq(token.balanceOf(deployer), 8 ether); // Saldo reduzido
        assertEq(token.balanceOf(user2), 2 ether);    // Saldo aumentado
        assertEq(token.allowance(deployer, user1), 1 ether); // Permissão restante
    }

    function testRevertOnInsufficientBalance() public {
        // Tenta transferir mais do que o saldo disponível
        vm.startPrank(user1);
        vm.expectRevert("ERC20: transfer amount exceeds balance");
        token.transfer(user2, 1 ether);
        vm.stopPrank();
    }

    function testRevertOnInsufficientAllowance() public {
        // Aprova `user1` para gastar tokens do deployer
        vm.startPrank(deployer);
        token.approve(user1, 1 ether);
        vm.stopPrank();

        // Tenta transferir mais do que a permissão
        vm.startPrank(user1);
        vm.expectRevert("ERC20: transfer amount exceeds allowance");
        token.transferFrom(deployer, user2, 2 ether);
        vm.stopPrank();
    }
}
