// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/////////////////////////////////////////////////////////////////////////////////////////////
/// @title Contract written in the erc20 standard                           /////////////////
/// @author Tales                                                           /////////////////
/// @notice contract used for study purposes.                               /////////////////
/// @dev                                                                    /////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ProtoCoin {
//////////////////////////////////////////////////
//             Variable declaration             //
//////////////////////////////////////////////////
    string public name = "TalesCoin"; // Token name
    string public symbol = "TLC"; // Token Symbol
    uint8 public decimals = 18; // Total number of decimal places the token has
    uint256 public totalSupply = 1000 * 10 ** decimals; // The total token value that will be issued

//////////////////////////////////////////////////
//              Mapping declaration             //
//////////////////////////////////////////////////
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
///////////////////////////////////////////    
// Exemplo deste mapping:                //
//-->Tales                               //
//        --> joao                       // 
//        --> maria                      //
///////////////////////////////////////////

//////////////////////////////////////////////////
//              Event declaration               //
//////////////////////////////////////////////////
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner,address indexed _spender,uint256 _value);

//////////////////////////////////////////////////
//            Construct declaration             //
//////////////////////////////////////////////////
    constructor(){
        _balances[msg.sender] = totalSupply;
        // Inicializo o usuario dono com saldo total do contrato 
    }

//////////////////////////////////////////////////
//             Function declaration             //
//////////////////////////////////////////////////
    function balanceOf(address _owner) public view returns (uint256 balance){
//////////////////////////////////////////////////////////////////////////////
//         Funcao que retornal o saldo que o usuario tem na carteira.       //
///        A blockchain so salva na sua rede o saldo da moeda nativa.       //
///        Os saldo dos tokens sao salvo no contracto.                      // 
///        Por isso presisio do mapping para salvar os usuarios.            //
////////////////////////////////////////////////////////////////////////////// 
    return _balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
/////////////////////////////////////////////////////////////////////////////////
// Esta funcao envia uma quantidade de tokens do owner para outra pessoa.      //
/////////////////////////////////////////////////////////////////////////////////    
        require(balanceOf(msg.sender) >= _value, "Insufficient balance");
        //Condicao pra que posso ser feita a transferencia tem que ter saldo
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        // Ativar o evento 
        return true;
        // Retorno que foi feito a transzacao.
    }


    function approve(address _spender, uint256 _value) public returns(bool success){
        // Esta funcao da atorizacao para terceiros transferi no meu nome
        // Crie um mapping das pessoas que eu vou atorizar.
        _allowances[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remainig){
        // Esta funcao confere se o spender tem permicao para gasta o token do owner
        // e Retorna o valor que o spender pode gastar
        return _allowances[_owner][_spender];
        //entra na lista dos usuarias para ver se tem pewrmicao e valor suficiente.
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Esta funcao envia tokens de uma 2 pessoa para 3 pessoa com a autorizacao da 1 pessoa dono do fundos //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success){
        require(balanceOf(_from) >= _value, "insufficient balance");
        require(allowance(_from, msg.sender) >= _value, "Insufficient allowance");

        _balances[_from] -= _value;//retira do dono 
        _allowances[_from][msg.sender] -= _value; // diminuir do valor autorizado a gasta pelo 2 pessoa
        _balances[_to] += _value;// adciona no destinatario

        emit Transfer(_from, _to, _value);// anucia na blockchain
        return true;
    }

}
