const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { runTests } = require("./common.js");

describe("UnderfittedSocialClubMembershipMock", () => {
    runTests(
        "UnderfittedSocialClubMembershipMock",
        10,
        4,
        BigNumber.from("500000000000000"),
        BigNumber.from("50000000000000"),
        2
    );
});
