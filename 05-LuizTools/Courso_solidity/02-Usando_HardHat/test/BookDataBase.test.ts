import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("BookDatabase", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const BookDataBase = await hre.ethers.getContractFactory("BookDatabase");
    const bookDatabase = await BookDataBase.deploy();

    return { bookDatabase, owner, otherAccount };
  }

  it("Should count = 0", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(
      deployFixture
    );
    const count = await bookDatabase.count();
    expect(count).to.equal(0);
  });

  it("Should add book", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(
      deployFixture
    );
    await bookDatabase.addBook({ title: "New Book", year: 2023 });

    const count = await bookDatabase.count();
    expect(count).to.equal(1);
  });

  it("Should edit book", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(
      deployFixture
    );

    await bookDatabase.addBook({ title: "New Book", year: 2023 });
    await bookDatabase.editBook(1, { title: "New Book 2.0", year: 2023 });

    const book = await bookDatabase.books(1);
    expect({ title: book.title, year: book.year }).to.deep.equal({ title: "New Book 2.0", year: 2023 });
    //expect(book.title).to.equal("New Book 2.0");
    //expect(book.year).to.equal(2023);
  });

  it("Should update only the year when edited", async function () {
    const { bookDatabase } = await loadFixture(deployFixture);
    
    // Adiciona um livro com ano 2023
    await bookDatabase.addBook({ title: "New Book", year: 2023 });
    
    // Edita o livro, mantendo o mesmo título e alterando o ano para 2024
    await bookDatabase.editBook(1, { title: "New Book", year: 2024 });
    
    // Obtém o livro editado
    const book = await bookDatabase.books(1);
    
    // Verifica se o ano foi atualizado para 2024
    expect(book.year).to.equal(2024);
  });
  

  it("Should remove book", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(
      deployFixture
    );

    await bookDatabase.addBook({ title: "New Book", year: 2023 });
    await bookDatabase.removeBook(1);

    const count = await bookDatabase.count();
    expect(count).to.equal(0);
  });

  it("Should NOT remove book", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(
      deployFixture
    );

    //para fazer este teste tenho que conectar uma segunda carteira
    const wallet2 = bookDatabase.connect(otherAccount);
    await expect(wallet2.removeBook(1)).to.be.rejectedWith("You don't have permission");
  });
});
