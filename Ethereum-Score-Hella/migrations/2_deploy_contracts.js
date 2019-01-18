var Score = artifacts.require("./Score.sol")
var Vote = artifacts.require('./Vote.sol')
var testEvent = artifacts.require('./Test.sol')

module.exports = function(deployer) {
  deployer.deploy(Score);
  deployer.deploy(Vote);
  deployer.deploy(testEvent);
};
