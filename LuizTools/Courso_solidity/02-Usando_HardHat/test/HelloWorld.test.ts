import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("HelloWorld", function () {
// Definimos um acessório para reutilizar a mesma configuração em todos os testes.
// Usamos o LoadFixture para executar esta configuração uma vez, instantânea esse estado,
// e redefina a rede hardhat para esse instantâneo em todos os testes.
  async function deployFixture() {

// Os contratos são implantados usando o primeiro assinante/conta por padrão
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy();

    return { helloWorld, owner, otherAccount };
  }

// Here and where should I initialize my tests.
  it("Should hello World", async function () {
    const { helloWorld, owner, otherAccount } = await loadFixture(deployFixture);
    const message = await helloWorld.message();
    expect(message).to.equal("Hello World");

  })

  it("Should set hello World", async function () {
    const { helloWorld, owner, otherAccount } = await loadFixture(deployFixture);
    await helloWorld.setMessage("New Message");
    expect(await helloWorld.message()).to.equal("New Message");

  })


});
