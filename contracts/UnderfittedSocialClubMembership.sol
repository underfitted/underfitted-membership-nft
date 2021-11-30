// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UnderfittedSocialClubMembership is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    function MAX_SUPPLY() public pure virtual returns (uint256) {
        return 1000;
    }

    function RESERVED_SUPPLY() public pure virtual returns (uint256) {
        return 100;
    }

    function BASE_PRICE() public pure virtual returns (uint256) {
        return 5 ether;
    }

    function PRICE_FACTOR() public pure virtual returns (uint256) {
        return 69000000 gwei;
    }

    constructor() ERC721("Underfitted Social Club Membership", "UNDERFITTED") {
        for (uint256 i = 0; i < RESERVED_SUPPLY(); i++) {
            _tokenIdCounter.increment();
            _safeMint(msg.sender, _tokenIdCounter.current());
        }
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmSeYu1FZ7cp4mUZHk688BEa2Qiw4YySekhhVTG7Nhr4mP/";
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function getPrice() public view returns (uint256) {
        return
            BASE_PRICE() + (totalSupply() - RESERVED_SUPPLY()) * PRICE_FACTOR();
    }

    function getSupplyAndPrice()
        external
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (MAX_SUPPLY(), _tokenIdCounter.current(), getPrice());
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function mint() external payable {
        require(_tokenIdCounter.current() < MAX_SUPPLY(), "Sold out");
        require(msg.value == getPrice(), "Incorrect price");
        require(
            msg.sender == owner() || balanceOf(msg.sender) == 0,
            "Only one token per wallet allowed"
        );

        _tokenIdCounter.increment();
        _safeMint(msg.sender, _tokenIdCounter.current());
    }

    function withdraw() external onlyOwner {
        address payable recipient = payable(address(msg.sender));
        recipient.transfer(address(this).balance);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
