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
npm run verify:mumbai -- <smart contract address> <treasury address>
```

## Example

### Smart contract

The contract is deployed on the Polygon Mumbai test chain:

-   Full contract (all 1000 NFTs): [https://polygonscan.com/address/0xa1f1a1d644ae2ef075cfab4416f9350d1cced5e6](https://polygonscan.com/address/0xa1f1a1d644ae2ef075cfab4416f9350d1cced5e6)

### OpenSea collection

The OpenSea collection can be found here:

-   Full contract: [https://opensea.io/collection/underfitted-social-club-membership](https://opensea.io/collection/underfitted-social-club-membership)
