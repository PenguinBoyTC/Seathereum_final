pragma solidity ^0.5.0;
// ERC 721 interface

contract ERC721 {

    // returns the number of tokens owned by _owner
    function balanceOf(address _owner) public view returns(uint);

    // returns the address (owner) of a token
    function ownerOf(uint _tokenId) public view returns(address);

    // grants ownership of token
    function transfer(address _to, uint _tokenId) public;

    // affirms the address for a token
    function approve(address _to, uint _tokenId) public;

    // emits when ownership of a token is altered by any means even creation and
    // destruction
    event Transfer(
        address indexed from,
        address indexed to,
        uint indexed tokenId
    );

    // emits when the approved address of a token is changed or affirmed
    event Approval(
        address indexed owner,
        address indexed approved,
        uint indexed tokenId
    );
}