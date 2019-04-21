// const MyStringStore = artifacts.require('MyStringStore');
const SeabyBase = artifacts.require('SeabyBase');
// const Access = artifacts.require('AccessControl');
module.exports = (deployer) => {
  // deployer.deploy(MyStringStore);
  deployer.deploy(SeabyBase);
  // deployer.deploy(Access);
};
