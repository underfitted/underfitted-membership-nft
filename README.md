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
npm run deploy:verify -- <smart contract address>
```

## Example

### Smart contract

The contract is deployed on the Polygon Mumbai test chain:

-   Full contract (all 1000 NFTs): [https://mumbai.polygonscan.com/address/0x56BF26F05A469116639e8B382141b26a00f3676f](https://mumbai.polygonscan.com/address/0x56BF26F05A469116639e8B382141b26a00f3676f)
-   Mock contract (only 10 NFTs): [https://mumbai.polygonscan.com/address/0x84FE583a401015B4Ba32eA5982d6953957F5f9Db](https://mumbai.polygonscan.com/address/0x84FE583a401015B4Ba32eA5982d6953957F5f9Db)

### OpenSea collection

The OpenSea collection can be found here:

-   Full contract: [https://testnets.opensea.io/collection/underfitted-social-club-membership-v3](https://testnets.opensea.io/collection/underfitted-social-club-membership-v3)
-   Mock contract: [https://testnets.opensea.io/collection/underfitted-social-club-membership-v4](https://testnets.opensea.io/collection/underfitted-social-club-membership-v4)
