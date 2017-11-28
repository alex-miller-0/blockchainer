const Migrations = artifacts.require('./Migrations.sol');
const Checkpoint = artifacts.require('./Checkpoint.sol');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Checkpoint);
};
