// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;

import {Test, console} from "forge-std/Test.sol";
import {BookDatabase} from "../src/BookDataBase.sol";

contract BookDatabaseTest is Test {
    BookDatabase public bookData;
    BookDatabase.Book newBook;
    BookDatabase.Book public oldBook;

    function setUp() public {
        bookData = new BookDatabase();
        newBook = BookDatabase.Book("Livro1", 2021); //inicializo com um livro
        oldBook = BookDatabase.Book("oldBook", 2000); //inicializa com um livro
    }

    function testAddBook() public {
        // Utiliza a instância newBook definida no setUp
        bookData.addBook(newBook);

        (string memory title, uint16 year) = bookData.books(1);
        assertEq(title, "Livro1", "O titulo do livro nao corresponde");
        assertEq(year, 2021, "O ano do livro nao corresponde");
    }

    function testCompare() public view {
        // Caso em que as strings são iguais
        bool isEqual = bookData.compare("Livro1", "Livro1");
        assertTrue(isEqual, "Deveria retornar true para strings iguais");

        // Caso em que as strings são diferentes
        bool notEqual = bookData.compare("Livro1", "Livro2");
        assertTrue(!notEqual, "Deveria retornar false para strings diferentes");
    }

    function testEditBook() public {
        // Primeiro adiciona o livro que será editado
        bookData.addBook(oldBook);

        // Em seguida, chama a função editBook do contrato
        // indicando o ID do livro (por exemplo, 1) e a nova struct
        bookData.editBook(1, newBook);
    }

    function testRemoveBook() public {
        // Passo 1: adiciona um livro (assumindo que `newBook` foi definido no setUp())
        bookData.addBook(newBook);

        // Passo 2: remove o livro com ID 1 (o primeiro livro adicionado terá ID 1)
        bookData.removeBook(1);

        // Passo 3: verifica se o livro foi removido
        // Para isso, você pode checar se o título está vazio ("") e o ano está zerado (0)
        (string memory title, uint16 year) = bookData.books(1);

        assertEq(title, "", "O titulo deveria estar vazio apos a remocao");
        assertEq(year, 0, "O ano deveria ser zero apos a remocao");
    }
}
