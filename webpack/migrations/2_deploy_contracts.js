// var ConvertLib = artifacts.require('./ConvertLib.sol')
// var MetaCoin = artifacts.require('./MetaCoin.sol')
var Score = artifacts.require('./score.sol')

module.exports = function (deployer) {
  // deployer.deploy(ConvertLib)
  // deployer.link(ConvertLib, MetaCoin)
  // deployer.deploy(MetaCoin)
  deployer.deploy(score);
  deployer.deploy(Greeter);
}
