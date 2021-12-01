require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();

const { API_URL, PRIVATE_KEY, EHTERSCAN_KEY } = process.env;

module.exports = {
    solidity: "0.8.2",
    networks: {
        hardhat: {
            accounts: [
                // Owner account
                {
                    privateKey: "0x0000000000000000000000000000000000000000000000000000000000000001",
                    balance: "100000000000000000000000",
                },
                // Treasury account
                {
                    privateKey: "0x0000000000000000000000000000000000000000000000000000000000000002",
                    balance: "100000000000000000000000",
                },
                // Other test account
                {
                    privateKey: "0x0000000000000000000000000000000000000000000000000000000000000003",
                    balance: "100000000000000000000000",
                },
            ],
        },
        mumbai: {
            url: API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
    },
    etherscan: {
        apiKey: EHTERSCAN_KEY,
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS ? true : false,
    },
    treasury: {
        mumbai: 0x9fecc154aba86db310cc3a81bb65f81155d6bf98,
    },
};
