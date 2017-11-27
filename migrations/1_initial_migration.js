var Migrations = artifacts.require("./Migrations.sol");
var Checkpoint = artifacts.require('./Checkpoint.sol');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Checkpoint);
};
