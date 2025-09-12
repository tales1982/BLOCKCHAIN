// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import "../src/02_PersonalStorangeV2.sol";

contract PersonalDataStorangeV2Test is Test {
    PersonalDataStorangeV2 personalData;

    function setUp() public {
        // Inicializa o contrato antes de cada teste
        personalData = new PersonalDataStorangeV2();
    }

    function test1InitialName() public view{
        console.log("Nome inicial:");
        console.log(personalData.name());
    }

    function test2SetName() public {
        // Altera o nome usando a função setName
        personalData.setName("Alice");
        
        // Verifica se o nome foi atualizado para "Alice"
        assertEq(personalData.name(), "Alice");
        console.log("Nome atualizado para:");
        console.log(personalData.name());
    }


    function test3InitialAge()public view{
        console.log("Idade inicial:");
        console.log(personalData.getAge());
    }

    function test4SetAge() public{
        //altera a idade
        personalData.setAge(20);
        //teste para saber se a idade foi alterado
        assertEq(personalData.getAge(), 20);
        console.log("Idade atualizado para:");
        console.log(personalData.getAge());
    }

    function test5InitialNacionalidade() public view{
        console.log("Nacionalidade inicial:");
        console.log(personalData.getNacionalidade());
    }



    function test6GetNacionalidade() public{
        personalData.setNacionalidade(false);
        assertEq(personalData.getNacionalidade(),false);
        console.log("Nacionalidade atualizado para:");
        console.log(personalData.getNacionalidade());
    }

    function test7IncrementAge()public{
        console.log("Idade inicial:");
        console.log(personalData.getAge());
        console.log("Idade Incrementada:");
        console.log(personalData.incrementAge(personalData.getAge(),5));
        assertEq(personalData.incrementAge(personalData.getAge(),5), 15);

    }
}
