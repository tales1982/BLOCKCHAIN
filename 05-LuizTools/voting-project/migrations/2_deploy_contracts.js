// This file is used to deploy the contract to the blockchain network.
const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  const candidates = ["Alice", "Bob", "Charlie"];
  deployer.deploy(Voting, candidates);
};
