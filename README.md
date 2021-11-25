# Underfitted Membership NFT

This is the smart contract for the Underfitted Membership NFT.

## Setup

To setup your environment:

```
npm install
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
