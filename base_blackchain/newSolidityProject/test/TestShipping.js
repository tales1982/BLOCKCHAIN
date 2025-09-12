const ShippingStatus = artifacts.require("./Shipping.sol");
const truffleAssert = require('truffle-assertions');

contract('Shipping', () => {

  it("should return the status Pending", async () => {
    const instance = await ShippingStatus.deployed();
    const status = await instance.Status();
    assert.equal(status, "Pending");
  });

  it("should return the status Shipped", async () => {
    const instance = await ShippingStatus.deployed();
    await instance.Shipped();
    const status = await instance.Status();
    assert.equal(status, "Shipped");
  });

  it("should return the status Delivered", async () => {
    const instance = await ShippingStatus.deployed();
    await instance.Delivered();
    const status = await instance.Status();
    assert.equal(status, "Delivered");
  });

  it('should return correct event description', async () => {
    const instance = await ShippingStatus.deployed();
    const delivered = await instance.Delivered();

    // Verificar o evento emitido com a descrição correta em português
    truffleAssert.eventEmitted(delivered, 'LogNewAlert', (event) => {
      return event.description === 'O pacote foi entregue!';
    });
  });
});
