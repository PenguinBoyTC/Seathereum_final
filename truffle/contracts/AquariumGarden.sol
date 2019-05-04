pragma solidity ^0.5.0;

import "./Ownable.sol";
contract AquariumGarden is Ownable {

    //  The Birth event is called whenever a new creature is created.
    event SeabyBirth(uint indexed seabyId, string indexed name);
    //  The TransferFinish is called when a transaction is over.
    event TransferFinish(address indexed from, address indexed to, uint256 indexed seabyId);

    //  The data structure of Seaby
    struct Seaby {
      string name;
      uint16 generation;//
      uint64 birthTime;
      // The coolddown for the next breeding
      uint siringPartnerID;
      uint siringCD;
      bool forSale;
      mapping (uint8 => uint16) features;//0-eyes. 1-mouth. 2-color 3-body
    }
    uint8 _numberOfFeatures = 4;
    Seaby[] public seabies;
    // A mapping from Seaby IDs to the address of owns them. Gen0 Seabies are created with a non-zero owner.
    mapping (uint => address) public SeabyToOwner;
    // A mapping from owner address to count of tokens that address owns.
    mapping (address => uint) ownerSeabyCount;

    mapping (uint => address) public seabyApprovals;

    mapping (uint256 => address) public seabyAllowedBreedToAddress;
    
    function _getNumberOfFeatures() internal view returns(uint8) {
        return _numberOfFeatures;    
    }
    function _updateNumberOfFeatures(uint8 _newNumber) internal {
        _numberOfFeatures = _newNumber;
    }
    
    //  An internal method that creates a new Seaby and stores it. Will generate both a Birth event
    //  and a Transfer event.
    function _createSeaby(string memory _name, uint16 _generation, address _owner, uint16[] memory _features) internal {
        uint _siringCD = 1 days;
        
        Seaby memory _seaby = Seaby({
            name: _name,
            generation: _generation,
            birthTime: uint64(now),
            siringPartnerID: 0,
            siringCD:  _siringCD,
            forSale: true
        });

        uint NewCBId = seabies.push(_seaby)-1;
        _setFeatures(NewCBId,_features);
        //emit SeabyBirth(NewCBId, _name);
        _transfer(0x0000000000000000000000000000000000000000, _owner, NewCBId);
    }
    function _setFeatures(uint _seabyId, uint16[] memory _features) internal{
        Seaby storage _seaby = seabies[_seabyId];
        for (uint8 i = 0; i < _features.length; i++){
            _seaby.features[i] = _features[i];
        }
    }
    function getFeaturesById(uint _seabyId) public view returns (uint16[] memory) {
        //require(msg.sender == SeabyToOwner[_seabyId]);
        uint16[] memory _features = new uint16[](_numberOfFeatures);
        for (uint8 i = 0; i < _numberOfFeatures; i++) {
            _features[i] = seabies[_seabyId].features[i];
        }
        return _features;
    }
    // A return function that will generate a random style by a feature index and return style of feature
    function _generateRandomFeatures() internal view returns (uint16) {
        // uint rand = uint(keccak256(_str));
        uint8 randNonce = 3;//should be a seed of random number
        uint random = uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % 3;//0-100 random number
        return uint16(random);
    }
    // A return function that will generate a new Seaby by calling _createSeaby function and return an array of features
    function createRandomSeaby(string memory _name) public {
        //require(ownerSeabyCount[msg.sender] == 0);
        address _owner = msg.sender;
        // int size = 4;
        uint16[] memory _randFeatures = new uint16[](_numberOfFeatures); 
        for(uint i = 0; i < _numberOfFeatures; i++){
            _randFeatures[i] = _generateRandomFeatures();
        }
        _createSeaby(_name, 0, _owner, _randFeatures);
    }
    // A internal function that can transfer a Seaby from one to other and generate a TransferFinish event.
    function _transfer(address _from, address _to, uint256 _seabyId) internal {
        ownerSeabyCount[_to]++;
        SeabyToOwner[_seabyId] = _to;
        if(_from != address(0)){
            ownerSeabyCount[_from]--;
            delete seabyAllowedBreedToAddress[_seabyId];
            delete seabyApprovals[_seabyId];
        }
        emit TransferFinish(_from,_to,_seabyId);
    }
}
