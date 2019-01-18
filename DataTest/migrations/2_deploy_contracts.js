var DataTest = artifacts.require("./Data");
var Migrations = artifacts.require('./Migrations')
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(DataTest);
};
