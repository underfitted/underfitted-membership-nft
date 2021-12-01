# Underfitted Membership NFT

This is the smart contract for the Underfitted Membership NFT.

## Setup

To setup your environment:

```
npm install
```

To setup your API keys and private keys create an `.env` file with the following content:

```
API_URL="<Alachemy HTTP URL>"
PRIVATE_KEY="<deploy wallet private key>"
EHTERSCAN_KEY="<Etherscan/Ployscan API key for verification>"
```

## Develop

The smart contract code is in [contracts/UnderfittedMembershipNFT.sol](/contracts/UnderfittedMembershipNFT.sol).

To compile it run:

```
npm run build
```

## Test

The tests for the smart contract are in [test/UnderfittedMembershipNFT.test.js](/test/UnderfittedMembershipNFT.test.js).

To run the quick tests (only the small mock contract):

```
npm run test
```

To run the full test suite:

```
npm run test:full
```

To create the coverage report:

```
npm run coverage
```

To run the gas price estimation:

```
npm run gas
```

## Deploy

To deploy the smart contract on the Mumbai test chain (Polygon):

```
npm run deploy:mumbai
```

To verify the smart contract:

```
npm run deploy:verify -- <smart contract address> <treasury address>
```

## Example

### Smart contract

The contract is deployed on the Polygon Mumbai test chain:

-   Full contract (all 1000 NFTs): [https://mumbai.polygonscan.com/address/0x7670d6b0B654Ff4596a9CEfaBD77fd289d36fc17](https://mumbai.polygonscan.com/address/0x7670d6b0B654Ff4596a9CEfaBD77fd289d36fc17)
-   Mock contract (only 10 NFTs): [https://mumbai.polygonscan.com/address/0xab6Ce24ddcf4008EAc00E4061306a5Df1b30ECF7](https://mumbai.polygonscan.com/address/0xab6Ce24ddcf4008EAc00E4061306a5Df1b30ECF7)

### OpenSea collection

The OpenSea collection can be found here:

-   Full contract: [https://testnets.opensea.io/collection/underfitted-social-club-membership-jfs6xay5lj](https://testnets.opensea.io/collection/underfitted-social-club-membership-jfs6xay5lj)
-   Mock contract: [https://testnets.opensea.io/collection/underfitted-social-club-membership-vlkwhlqhqk](https://testnets.opensea.io/collection/underfitted-social-club-membership-vlkwhlqhqk)
