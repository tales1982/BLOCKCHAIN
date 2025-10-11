# 1) Enunciado (melhorado — usar como exercício)

Crie um contrato `Library` que gerencie livros e clientes. Regras:

* O contrato gerenciado por um `owner` (bibliotecário) pode **adicionar** e **remover** livros.
* Cada **livro** tem: `id`, `title`, `rentalPrice` (wei), `available` (bool).
* Cada **cliente** deve estar registrado (nome, dataNascimento) e ser **maior de 18 anos** para alugar.
* Cada cliente  **só pode ter 1 livro alugado ao mesmo tempo** .
* Para alugar, o cliente deve:
  * estar registrado e maior de idade;
  * não ter livro atualmente alugado;
  * estar “em dia” com pagamentos (se houver cobrança recorrente);
  * pagar **exatamente** o `rentalPrice` do livro no momento do aluguel.
* Ao devolver, o livro volta a ficar disponível; o contrato **usa Checks-Effects-Interactions** e emite eventos.
* O contrato deve registrar `dueDate` (por exemplo: aluguel por 7 dias) e permitir penalidade se vencido (opcional).
* Expor funções de leitura: listar livros disponíveis, status do cliente, livro alugado por cliente.
* Emitir eventos: `BookAdded`, `BookRemoved`, `BookRented`, `BookReturned`, `ClientRegistered`, `PaymentReceived`.
* Escrever testes que cubram: registro, aluguel válido, tentar alugar sem pagar, tentar alugar tendo um livro, devolução, tentativa de alugar menor de 18, cobrança de penalidade.
