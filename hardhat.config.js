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
                {
                    privateKey: "0x0000000000000000000000000000000000000000000000000000000000000001",
                    balance: "100000000000000000000000",
                },
                {
                    privateKey: "0x0000000000000000000000000000000000000000000000000000000000000002",
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
};
