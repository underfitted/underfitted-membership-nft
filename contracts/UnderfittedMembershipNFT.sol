// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UnderfittedMembershipNFT is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public constant MAX_SUPPLY = 10;
    uint256 public constant RESERVED_SUPPLY = 3;

    uint256 public constant SUPPLY_LIMIT_1 = 5;
    uint256 public constant SUPPLY_LIMIT_2 = 7;
    uint256 public constant SUPPLY_LIMIT_3 = 9;

    uint256 public constant SUPPLY_PRICE_0 = 0;
    uint256 public constant SUPPLY_PRICE_1 = 50000 gwei;
    uint256 public constant SUPPLY_PRICE_2 = 70000 gwei;
    uint256 public constant SUPPLY_PRICE_3 = 90000 gwei;

    constructor() ERC721("Underfitted Membership NFT", "UNDERFITTED") {
        for (uint256 i = 0; i < RESERVED_SUPPLY; i++) {
            mint();
        }
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmSeYu1FZ7cp4mUZHk688BEa2Qiw4YySekhhVTG7Nhr4mP/";
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function getPrice() public view returns (uint256) {
        uint256 tokenID = _tokenIdCounter.current();

        if (tokenID < SUPPLY_LIMIT_1) {
            return SUPPLY_PRICE_0;
        } else if (tokenID < SUPPLY_LIMIT_2) {
            return SUPPLY_PRICE_1;
        } else if (tokenID < SUPPLY_LIMIT_3) {
            return SUPPLY_PRICE_2;
        } else {
            return SUPPLY_PRICE_3;
        }
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
        return (MAX_SUPPLY, _tokenIdCounter.current(), getPrice());
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function mint() public payable {
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Sold out");
        require(msg.value == getPrice(), "Incorrect price");

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
