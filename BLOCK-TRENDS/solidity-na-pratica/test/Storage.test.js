const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Storage Contract", function () {
  let Storage, storage, owner, addr1;

  beforeEach(async function () {
    // Obtém as contas da rede local
    [owner, addr1] = await ethers.getSigners();

    // Implementa o contrato antes de cada teste
    Storage = await ethers.getContractFactory("Storage");
    storage = await Storage.deploy();
  });

  it("Deve definir o dono corretamente", async function () {
    expect(await storage.getOwner()).to.equal(owner.address);
  });

  it("Apenas o dono pode armazenar um número", async function () {
    await storage.store(100);
    expect(await storage.retrieve()).to.equal(100);
  });

  it("Deve falhar se não for o dono ao armazenar um número", async function () {
    await expect(storage.connect(addr1).store(200)).to.be.revertedWith("only owner");
  });

  it("Apenas o dono pode alterar o dono", async function () {
    await storage.changeOwner(addr1.address);
    expect(await storage.getOwner()).to.equal(addr1.address);
  });

  it("Deve falhar se um usuário não autorizado tentar alterar o dono", async function () {
    await expect(storage.connect(addr1).changeOwner(addr1.address)).to.be.revertedWith("only owner");
  });

  it("Deve aceitar pagamentos corretamente", async function () {
    const tx = await storage.connect(addr1).pay({ value: ethers.parseEther("1") });
    await tx.wait();
    expect(await storage.getBalance()).to.equal(ethers.parseEther("1"));
  });

  it("Deve retornar o balance correto após múltiplos depósitos", async function () {
    await storage.connect(addr1).pay({ value: ethers.parseEther("1") });
    await storage.connect(owner).pay({ value: ethers.parseEther("2") });
    expect(await storage.getBalance()).to.equal(ethers.parseEther("3"));
  });
});
