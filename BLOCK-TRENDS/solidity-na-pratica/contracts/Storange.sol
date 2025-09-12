// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.2 <8.9.0;

/**
 * @title Storange
 * @author Tales
 * @notice retrieve value in a variable
 */

contract Storage{

    uint256 number;
    address owner;

    //Onde eu aplicar esta funcao somente o dono pode executar a funcao
    modifier onlyOwner(){
        require(msg.sender == owner, "only owner");//somente o dono pode exercutar (owner)
        _;
    }

    constructor(){
        owner = msg.sender;
    }

    //Guarda um numero,  somente o dono.
    function store(uint256 num)public onlyOwner {
        number = num;
    }

    //retorna o valor guardado
    function retrieve()public view returns(uint256){
        return number;
    }

    //Altera de dono do contrato
    function changeOwner(address newOwner) public onlyOwner{
       owner = newOwner;
    }

    function pay()public payable{}

    //retorna o dono. 
    function getOwner() public view returns(address){
        return owner;
    }

    //retorna o valor que tenho depois de chamar o pay
    function getBalance() public view returns(uint256 bal){
        bal = address(this).balance;//funcao padrao pr aretorna o balance
    }




}