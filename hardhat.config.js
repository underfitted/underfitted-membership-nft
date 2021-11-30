require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();

const { API_URL, PRIVATE_KEY, EHTERSCAN_KEY } = process.env;

module.exports = {
    solidity: "0.8.2",
    networks: {
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
