pragma solidity ^0.5.0;

import "./Ownership.sol";
import "./SeabyBase.sol";

contract Auction is Ownership, SeabyBase {
    address private buyer;
    address private curOwner;
    uint256 private tradingSeaby;
    uint256 private seabyPrice = 0.1 ether;
    bool startTransaction = false;
    event requestToBuy(address indexed _buyer, uint indexed _seabyId, uint256 indexed _price);
    
    modifier isValidTrade() {
        require(startTransaction);
        require(curOwner == msg.sender);
        require(buyer != address(0));
        //require(address(this).balance != 0);
        _;
    }
    
    function buy(uint _seabyId) external payable {
        // require(msg.value >= seabyPrice);
        require(!startTransaction);
        buyer = msg.sender;
        curOwner = SeabyToOwner[_seabyId];
        tradingSeaby = _seabyId;
        startTransaction = true;
        emit requestToBuy(buyer, _seabyId, msg.value);
    }
    
    function approveCurTransaction() external requireOwnerOf(tradingSeaby) isValidTrade(){
        if (address(uint160(curOwner)).send(address(this).balance)) {
            approve(buyer, tradingSeaby);
            transfer(buyer, tradingSeaby);
        } else {
            address(uint160(buyer)).send(address(this).balance);
            emit DisApproval();
        }
        cleanAuction();
    }
    function rejectTransaction() external requireOwnerOf(tradingSeaby) isValidTrade(){
        address(uint160(buyer)).send(address(this).balance);
        emit DisApproval();
        cleanAuction();
    }
    function cleanAuction() private {
        buyer = address(0);
        curOwner = address(0);
        tradingSeaby = 0;
        seabyPrice = 0.1 ether;
        startTransaction = false;
    }
}