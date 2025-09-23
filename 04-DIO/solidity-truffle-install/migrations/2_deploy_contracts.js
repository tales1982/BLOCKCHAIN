var MyfristContract_v1 = artifacts.require("MyfristContract");

module.exports = function(deployer) {
  deployer.deploy(MyfristContract_v1);
}