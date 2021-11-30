// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "contracts/UnderfittedSocialClubMembership.sol";

contract UnderfittedSocialClubMembershipMock is
    UnderfittedSocialClubMembership
{
    function MAX_SUPPLY() public pure override returns (uint256) {
        return 10;
    }

    function RESERVED_SUPPLY() public pure override returns (uint256) {
        return 3;
    }

    function BASE_PRICE() public pure override returns (uint256) {
        return 500000 gwei;
    }

    function PRICE_FACTOR() public pure override returns (uint256) {
        return 50000 gwei;
    }
}
