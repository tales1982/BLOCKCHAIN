const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
  let Token;
  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Obtém os signers (contas) do Hardhat
    [owner, addr1, addr2] = await ethers.getSigners();
    
    // Compila e implanta o contrato
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(1000); // Por exemplo, totalSupply = 1000
    await token.waitForDeployment();
  });
  
  it("Deve atribuir o totalSupply ao owner", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(1000);
  });

  it("Deve transferir tokens entre contas quando chamado pelo owner", async function () {
    // Transfere 50 tokens do owner para addr1
    await token.transfer(addr1.address, 50);
    
    const addr1Balance = await token.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(50);
    
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(950);
  });

});
