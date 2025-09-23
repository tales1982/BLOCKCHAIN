// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.2 <8.9.0;

contract Token {
    uint256 totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    event Transfer(address indexed from, address indexed to, uint amount);
    event Approval(address indexed approver, address indexed spender, uint allowance);

    constructor(uint256 supply) {
        totalSupply = supply;
        balanceOf[msg.sender] = totalSupply;
    } 

    function transfer(address to, uint amount) public {
        require(balanceOf[msg.sender] >= amount, "Saldo insuficiente.");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function approve(address spender, uint256 amount) public {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
    }

    function transferFrom(address from, address to, uint amount) public {
        require(allowance[from][msg.sender] >= amount, "Allowance insuficiente.");
        require(balanceOf[from] >= amount, "Saldo insuficiente do remetente.");
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
    }
}
