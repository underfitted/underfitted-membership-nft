const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { runTests } = require("./common.js");

describe("UnderfittedSocialClubMembership", () => {
    runTests(
        "UnderfittedSocialClubMembership",
        1000,
        100,
        BigNumber.from("5000000000000000000"),
        BigNumber.from("690000000000000000"),
        10
    );
});
