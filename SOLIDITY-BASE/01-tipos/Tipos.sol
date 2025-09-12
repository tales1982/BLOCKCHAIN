// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Tipos{
    string public msgPublica = "Ola Mundo Publico";
    //a variavel marcado como publica e acessivel a qualquer um 

    string private msgPrivada = "Ola mundo Privado";
    //aqui somente pode ser acessado dentro desse contrato, nao pode ser exportado

    bool condicao = true;
    // uma variavel para condicao verdadeiro ou falso true or false

    int number = -1;
    // poder amazena numeros possitivos e negativos

    uint numberU = 1;
    // so pode armazena numeros possitivos

    address owner = msg.sender;
    //Armazena o proprietario da carteira

    /***************************************************************************************** 
     ** Public   | pode ser lido de fora do contrato , mas apenas escrito pelo contrato.    **
     ** Private  | Somente pode ser lido e escrito por este contrato                        **
     ** internal | pode ser lido e escrito por esse contrato e contratos filhos via eranca. **
     *****************************************************************************************/
    

}