pragma solidity ^0.5.0;

import "./Ownership.sol";
import "./SeabyBase.sol";
contract Auction is Ownership, SeabyBase {
    uint256 public seabyPrice = 2 finney;
    function buy(uint _seabyId) external payable {
        require(msg.value >= seabyPrice);
        takeOwnership(_seabyId);
    }
    function setPrice(uint256 newPrice, uint _seabyId) external {
        seabyPrice = newPrice;
    }
}