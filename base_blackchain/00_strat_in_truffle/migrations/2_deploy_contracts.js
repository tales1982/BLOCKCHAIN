const giftcoin = artifacts.require("GiftCoin");
module.exports = function(deployer) {
    deployer.deploy(giftcoin);
};