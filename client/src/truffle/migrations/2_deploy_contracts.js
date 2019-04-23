const Auction = artifacts.require('Auction');
module.exports = (deployer) => {
  deployer.deploy(Auction);
};
