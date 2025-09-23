// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// Interface ERC20
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// Implementação do token ERC20
contract TokenPadraoERC20 is IERC20 {
    // Nome do token
    string public constant name = "TokenPadrao";
    string public constant symbol = "TP";
    uint8 public constant decimals = 18;

    // Mapeamento para armazenar o saldo de cada endereço
    mapping(address => uint256) private balances;

    // Mapeamento para autorizações de gasto entre endereços
    mapping(address => mapping(address => uint256)) private allowed;

    // Quantidade total de tokens emitidos
    uint256 private totalSupply_ = 10 ether;

    // Construtor: define o deployer como dono inicial de todos os tokens
    constructor() {
        balances[msg.sender] = totalSupply_;
        emit Transfer(address(0), msg.sender, totalSupply_);
    }

    // Retorna o total de tokens emitidos
    function totalSupply() public view override returns (uint256) {
        return totalSupply_;
    }

    // Retorna o saldo de tokens de um endereço específico
    function balanceOf(address account) public view override returns (uint256) {
        return balances[account];
    }

    // Retorna o quanto um endereço foi autorizado a gastar de outro endereço
    function allowance(address owner, address spender) public view override returns (uint256) {
        return allowed[owner][spender];
    }

    // Transfere tokens do chamador da função para outro endereço
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(amount <= balances[msg.sender], "ERC20: transfer amount exceeds balance");

        balances[msg.sender] -= amount;
        balances[recipient] += amount;

        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    // Autoriza outro endereço a gastar uma quantidade específica de tokens do chamador
    function approve(address spender, uint256 amount) public override returns (bool) {
        require(spender != address(0), "ERC20: approve to the zero address");

        allowed[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);
        return true;
    }

    // Transfere tokens de um endereço autorizado para outro
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(amount <= balances[sender], "ERC20: transfer amount exceeds balance");
        require(amount <= allowed[sender][msg.sender], "ERC20: transfer amount exceeds allowance");

        balances[sender] -= amount;
        balances[recipient] += amount;
        allowed[sender][msg.sender] -= amount;

        emit Transfer(sender, recipient, amount);
        return true;
    }
}
