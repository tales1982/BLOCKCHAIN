// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

contract EventosTransactions {
    address public owner;
    uint256 public amount;      // saldo “interno” rastreado pelo contrato
    bool public success;

    event GetNewAmountEvent(uint256 newAmount);
    event Sent(address indexed to, uint256 value);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    // Recebe ETH e atualiza o saldo interno, emite evento
    receive() external payable {
        amount += msg.value;
        emit GetNewAmountEvent(amount);
    }

    // Envia ETH do contrato para `to`
    function transfer(address payable to, uint256 _amount) external onlyOwner {
        require(_amount > 0, "Zero amount");
        require(address(this).balance >= _amount, "Insufficient balance!");

        // Effects
        amount -= _amount;

        // Interactions
        (success, ) = to.call{value: _amount}("");
        require(success, "Transfer failed");

        emit Sent(to, _amount);
        emit GetNewAmountEvent(amount); // atualiza quem escuta
    }

    function getBalance() external view returns (uint256) {
        return amount;
    }
}
