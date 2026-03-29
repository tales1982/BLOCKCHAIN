// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Calculator {
    int private result;

    function add(int numA, int numB) public returns(int){
        return result = numA + numB;   
    }

    function sub(int numA, int numB) public returns(int){
        return result =  numA - numB;
    }

    function mult(int numA, int numB) public pure returns(int){
        return numA * numB;
    }

    function operation(int numA, bytes1 caract, int numB) public returns(int){
    if(caract == '+')
        result = add(numA, numB);
    else if(caract == '-')
        result = sub(numA, numB);
    else if(caract == '*')
        result = mult(numA, numB);
    else
        revert("Operador invalido. Use: +, - ou *");

    return result;
}

    function _getResult() private view returns(int256)  {
        return result;
    }

    function revealResult() public view returns(int256){
        return _getResult();
    }

}

