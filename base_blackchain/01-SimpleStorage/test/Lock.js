const { expect } = require("chai");

describe("HelloWorld", function () {
  it("Should return the greeting 'Hello World'", async function () {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const hello = await HelloWorld.deploy(); // Deploy o contrato
    await hello.waitForDeployment(); // Atualização: aguarde o deploy do contrato

    expect(await hello.greet()).to.equal("Hello World");
  });
});
