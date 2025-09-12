const GiftCoin = artifacts.require("GiftCoin");

contract('GiftCoin', function(accounts) {
  it("should start an account with 0 coins", async function() {
    const contract = await GiftCoin.deployed();
    const balance = await contract.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf(), 0, "addresses should initially have zero coins");
  });
  
  it("should allow the owner to minting and gifting from the owner", async function() {
    const owner = web3.eth.defaultAccount = accounts[0];
    const contract = await GiftCoin.deployed();
    
    await contract.mintCoins(owner, 100);
    let ownerBalance = await contract.balanceOf.call(owner);
    assert.equal(ownerBalance.valueOf(), 100);
    
    await contract.sendGift(accounts[1], 5, { from: owner });
    ownerBalance = await contract.balanceOf.call(owner);
    assert.equal(ownerBalance.valueOf(), 95);
    let otherBalance = await contract.balanceOf.call(accounts[1]);
    assert.equal(otherBalance.valueOf(), 5);
  });
});