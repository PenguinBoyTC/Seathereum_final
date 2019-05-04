pragma solidity ^0.5.0;
import "./AquariumGarden.sol";
contract SeabyBase is AquariumGarden {

    modifier requireOwnerOf(uint _seabyId) {
        require(msg.sender == SeabyToOwner[_seabyId]);
        _;
    }
    function changeName(uint _seabyId, string calldata _newName) external requireOwnerOf(_seabyId) {
        seabies[_seabyId].name = _newName;
    }
    function changeForSaleStatus(uint _seabyId) external requireOwnerOf(_seabyId) {
        seabies[_seabyId].forSale = !seabies[_seabyId].forSale;
    }
    function getAllSeabies() external view returns(uint[] memory) {
        uint[] memory allSeabies = new uint[](seabies.length);
        uint counter = 0;
        for (uint i = 0; i < seabies.length; i++) {
            allSeabies[counter++] = i;
        }
        return allSeabies;
    }
    function getSeabiesByOwner(address _owner) external view returns(uint[] memory) {
        uint[] memory allSeabies = new uint[](ownerSeabyCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < seabies.length; i++) {
            if (SeabyToOwner[i] == _owner) {
                allSeabies[counter++] = i;
            }
        }
        return allSeabies;
    }
    function getSeabyById(uint _seabyId) external view returns(string memory name, uint16 generation, uint64 birthTime, uint siringPartnerID, uint siringCD, bool forSale) {
        Seaby storage seaby = seabies[_seabyId];
        name = seaby.name;
        generation = seaby.generation;
        birthTime = seaby.birthTime;
        siringPartnerID = seaby.siringPartnerID;
        siringCD = seaby.siringCD;
        forSale = seaby.forSale;
    }
}