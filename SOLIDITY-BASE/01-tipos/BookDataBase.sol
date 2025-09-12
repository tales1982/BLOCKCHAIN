// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract BookDataBase{

    struct Book{
        string title;
        string author;
        string isb;
        uint16 pages;
        uint year;
    }

    // Cria um array da struck Book
    Book[] public books;
    

    // funcao que vai adcionar o payloads do book
    // dentro do array books
    function addBook(string memory _title, string memory _author, string memory _isb, uint16 _pages, uint _year) public{
        books.push(Book({
            title: _title,
            author: _author,
            isb: _isb,
            pages: _pages,
            year: _year
        }));
    }

    function updateBook(uint _index, string memory _title, string memory _author, string memory _isb, uint16 _pages, uint _year) public{
        require(_index < books.length, "Book does not exist");
        books[_index] = Book({
            title: _title,
            author: _author,
            isb: _isb,
            pages: _pages,
            year: _year
        });
    }

    function deleteBook(uint index) public{
        delete books[index];
    } 
    
    function getBook(uint index) public view returns(Book memory){
        return books[index];
    }
    
}
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //  Palavra	    |   Onde vive?          |	Duração	Mutável?    |	Quando usar?                //
    //----------------------------------------------------------------------------------------------//
    //  storage 	|   Blockchain	        |   Permanente	        |   Sim	Dados do contrato       //
    //  memory	    |   RAM temporária	    |   Só na função	    |   Sim	Processamento local     //
    //  calldata	|   RAM, só de leitura	|   Só na função	    |   Não	Parâmetro externo       //
    //////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //      Public   | pode ser lido de fora do contrato , mas apenas escrito pelo contrato.        //
    //      Private  | Somente pode ser lido e escrito por este contrato                            //
    //      internal | pode ser lido e escrito por esse contrato e contratos filhos via eranca.     //
    //////////////////////////////////////////////////////////////////////////////////////////////////