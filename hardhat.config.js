require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();

const { MUMBAI_API_URL, POLYGON_API_URL, PRIVATE_KEY, POLYSCAN_KEY } = process.env;

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
            url: MUMBAI_API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
        polygon: {
            url: POLYGON_API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
    },
    etherscan: {
        apiKey: POLYSCAN_KEY,
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS ? true : false,
    },
};
