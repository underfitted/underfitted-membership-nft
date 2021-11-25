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

To run the tests:

```
npn run test:light
```

To create the coverage report:

```
npm run test
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

The contract is deployed on the Polygon Mumbai test chain:
[https://mumbai.polygonscan.com/address/0x1ddf3aC5e5e788FC3a5f4b4E628B5C6De9A1b1D7](https://mumbai.polygonscan.com/address/0x1ddf3aC5e5e788FC3a5f4b4E628B5C6De9A1b1D7)
