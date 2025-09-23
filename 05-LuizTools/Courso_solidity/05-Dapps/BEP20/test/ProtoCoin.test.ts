import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";


describe("ProtoCoin Test", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners(); //padrao do codigo sempre usar

    const ProtoCoin = await ethers.getContractFactory("ProtoCoin");
    const protoCoin = await ProtoCoin.deploy();

    return { protoCoin, owner, otherAccount };
  }

  //////////////////////////////////////////////////
  //      Teste para verificar as vareaveis       //
  //////////////////////////////////////////////////
  it("Should have correct name", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture);
    const name = await protoCoin.name();
    expect(name).to.equal("ProtoCoin");
  });

  it("Should have correct symbol", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture);
    const symbol = await protoCoin.symbol();
    expect(symbol).to.equal("PRC");
  });

  it("Should have correct decimal", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture);
    const decimal = await protoCoin.decimals();
    const totalSupply = await protoCoin.totalSupply();
    expect(decimal).to.equal(18);
  });

  it("Should have correct totalSupply", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture);
    const totalSupply = await protoCoin.totalSupply();
    expect(totalSupply).to.equal(10000n * 10n ** 18n); // Coloque o n para teste quando o numero for um big int

  });
  
  //////////////////////////////////////////////////
  //        Teste para verificar balance          //
  //////////////////////////////////////////////////
  it("Should get balance", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture);
    const balance = await protoCoin.balanceOf(owner);
    expect(balance).to.equal(10000n * 10n ** 18n); // Coloque o n para teste quando o numero for um big int

  });
  
  //////////////////////////////////////////////////
  //     Teste para verificar transferencia       //
  //////////////////////////////////////////////////
  it("should transfer", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture);

    await protoCoin.transfer(otherAccount, 5);

    const recipient = await protoCoin.balanceOf(otherAccount.address);
    expect(recipient).to.equal(5); 

  });

  ///////////////////////////////////////////////////////
  // Teste para verificar saldo negativo pra tranferir //
  ///////////////////////////////////////////////////////
  it("should NOT transfer", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture);

    const instance = protoCoin.connect(otherAccount);
    await expect(instance.transfer(owner.address, 5)).to.be.revertedWithCustomError(protoCoin, "ERC20InsufficientBalance");
  });

  ///////////////////////////////////////////////////////
  // Teste para verificar approvacao de transferencia  //
  ///////////////////////////////////////////////////////
  it("should approuver transfer", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture);

    await protoCoin.approve(otherAccount.address, 10n);

    const value = await protoCoin.allowance(owner.address, otherAccount.address);
    expect(value).to.equal(10n);

  });

  ///////////////////////////////////////////////////////////////////
  // Teste para verificar transferencia de 2 pessoa para 3 pessoa ///
  ///////////////////////////////////////////////////////////////////
  it("should transfer from", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture);
    const balanceOwnerBefore = await protoCoin.balanceOf(owner.address);
    const balanceOtherBefore = await protoCoin.balanceOf(otherAccount.address);

    await protoCoin.approve(otherAccount, 10n);

    const instance = protoCoin.connect(otherAccount);
    await instance.transferFrom(owner.address, otherAccount.address, 5);

    const balanceOwnerAfter = await protoCoin.balanceOf(owner.address);
    const balanceOtherAfter = await protoCoin.balanceOf(otherAccount.address);
    const allowance = await protoCoin.allowance(owner.address, otherAccount.address);

    expect(balanceOwnerBefore).to.equal(10000n * 10n ** 18n);
    expect(balanceOwnerAfter).to.equal((10000n * 10n ** 18n) - 5n);
    expect(balanceOtherBefore).to.equal(0);
    expect(balanceOtherAfter).to.equal(5);
    expect(allowance).to.equal(5)
    
  });

  ///////////////////////////////////////////////
  // Teste para verificar o require balance_of //
  ///////////////////////////////////////////////
  it("should NOT transfer from (balance_of)", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture);

    const instance = protoCoin.connect(otherAccount);
    await instance.approve(owner.address, 1n);
    await expect(protoCoin.transferFrom(otherAccount.address ,owner.address, 1n))
      .to.be.revertedWithCustomError(protoCoin,"ERC20InsufficientBalance");
  });

  ///////////////////////////////////////////////
  // Teste para verificar o require allowance  //
  ///////////////////////////////////////////////
  it("should NOT transfer from (allowance)", async function () {
    const { protoCoin, owner, otherAccount } = await loadFixture(deployFixture);

    const instance = protoCoin.connect(otherAccount);
    await expect(instance.transferFrom(owner.address ,otherAccount.address, 1n))
      .to.be.revertedWithCustomError(protoCoin,"ERC20InsufficientAllowance");
  });


});
