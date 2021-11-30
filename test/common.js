const { expect } = require("chai");
const { ethers } = require("hardhat");

module.exports = {
    runTests: function (
        contractName,
        expectedMaxSupply,
        expectedReservedSupply,
        expectedBasePrice,
        expectedPriceFactor,
        expectedPriceStep
    ) {
        let UnderfittedSocialClubMembershipMock;
        let contract;
        let owner;
        let addr1;

        beforeEach(async function () {
            UnderfittedSocialClubMembershipMock = await ethers.getContractFactory(contractName);
            [owner, addr1] = await ethers.getSigners();

            contract = await UnderfittedSocialClubMembershipMock.deploy();

            reservedSupply = (await contract.RESERVED_SUPPLY()).toNumber();
        });

        it("should have all constants set correctly", async () => {
            expect(await contract.MAX_SUPPLY()).to.equal(expectedMaxSupply);
            expect(await contract.RESERVED_SUPPLY()).to.equal(expectedReservedSupply);
            expect(await contract.BASE_PRICE()).to.equal(expectedBasePrice);
            expect(await contract.PRICE_FACTOR()).to.equal(expectedPriceFactor);
            expect(await contract.PRICE_STEP()).to.equal(expectedPriceStep);
        });

        it("should return the total supply", async () => {
            expect(await contract.totalSupply()).to.equal(reservedSupply);
        });

        it("should mint the reserved supply to the owner when deployed", async () => {
            expect(await contract.totalSupply()).to.equal(reservedSupply);
            expect(await contract.ownerOf(1)).to.equal(owner.address);
            expect(await contract.balanceOf(owner.address)).to.equal(reservedSupply);
        });

        it("should have correct baseURI", async () => {
            expect(await contract.tokenURI(1)).to.equal("ipfs://QmSeYu1FZ7cp4mUZHk688BEa2Qiw4YySekhhVTG7Nhr4mP/1");
        });

        it("should mint a token", async () => {
            await contract.connect(addr1).mint({ value: await contract.getPrice() });

            expect(await contract.totalSupply()).to.equal(reservedSupply + 1);
            expect(await contract.balanceOf(addr1.address)).to.equal(1);
            expect(await contract.ownerOf(reservedSupply + 1)).to.equal(addr1.address);
        });

        it("should start counting tokens from 1", async () => {
            // Expect getting the owner of token 0 to fail
            await expect(contract.ownerOf(0)).to.be.revertedWith(
                "VM Exception while processing transaction: reverted with reason string 'ERC721: owner query for nonexistent token'"
            );

            // Expect getting the owner of token 1 to not fail
            await expect(contract.ownerOf(1)).to.not.be.reverted;
        });

        it("should mint only MAX_SUPPLY tokens", async () => {
            // Mint all available tokens
            for (let i = reservedSupply; i < (await contract.MAX_SUPPLY()); i++) {
                await contract.mint({ value: await contract.getPrice() });
            }

            // Expect next mint to fail
            await expect(contract.mint({ value: await contract.getPrice() })).to.be.revertedWith(
                "VM Exception while processing transaction: reverted with reason string 'Sold out'"
            );
        });

        it("should pause the contract", async () => {
            // Pause the minting
            await contract.pause();
            expect(await contract.paused()).to.equal(true);

            // Expect minting to fail
            await expect(contract.mint({ value: await contract.getPrice() })).to.be.revertedWith(
                "VM Exception while processing transaction: reverted with reason string 'Pausable: paused'"
            );
        });

        it("should unpause the contract", async () => {
            // Pause and unpause the contract
            await contract.pause();
            await contract.unpause();

            // Minting should work
            await contract.mint({ value: await contract.getPrice() });
            expect(await contract.paused()).to.equal(false);
        });

        it("should raise error when price is wrong", async () => {
            // Expect minting with lower price to fail
            await expect(contract.mint({ value: (await contract.getPrice()).sub(1) })).to.be.revertedWith(
                "VM Exception while processing transaction: reverted with reason string 'Incorrect price'"
            );

            // Expect minting with higher price to pass
            await expect(contract.mint({ value: (await contract.getPrice()).add(1) })).to.not.be.reverted;

            // Expect minting with exact price to pass
            await expect(contract.mint({ value: await contract.getPrice() })).to.not.be.reverted;
        });

        it("should set the correct price", async () => {
            // Price is equal to the base price after deployment
            const basePrice = await contract.BASE_PRICE();
            const priceFactor = await contract.PRICE_FACTOR();
            const priceStep = await contract.PRICE_STEP();

            // The price is equal to the base price for the first price step after deployment
            for (let i = 1; i <= priceStep; i++) {
                expect(await contract.getPrice()).to.equal(basePrice);
                await contract.mint({ value: await contract.getPrice() });
            }

            // Price increases by 1x price factor for the next price step
            for (let i = 1; i <= priceStep; i++) {
                expect(await contract.getPrice()).to.equal(basePrice.add(priceFactor));
                await contract.mint({ value: await contract.getPrice() });
            }

            // Price increases by 2x price factor for the next price step
            for (let i = 1; i <= priceStep; i++) {
                expect(await contract.getPrice()).to.equal(basePrice.add(priceFactor.mul(2)));
                await contract.mint({ value: await contract.getPrice() });
            }
        });

        it("should store proceeds", async () => {
            // Start with 0
            expect(await ethers.provider.getBalance(contract.address)).to.equal(0);

            // Mint one paid token
            const price = await contract.getPrice();
            await contract.mint({ value: await contract.getPrice() });

            // Balance should be the price of the last mint
            expect(await ethers.provider.getBalance(contract.address)).to.equal(price);
        });

        it("should withdraw proceeds", async () => {
            const ownerBalance = await ethers.provider.getBalance(owner.address);

            // Mint one paid token
            await contract.connect(addr1).mint({ value: await contract.getPrice() });

            // Withdraw the proceeds
            await contract.withdraw();

            // New balance should be greater than the old one
            expect(await ethers.provider.getBalance(owner.address)).to.gt(ownerBalance);
        });

        it("should withdraw proceeds only to the owner", async () => {
            // Expect withdrawing from another address to fail
            await expect(contract.connect(addr1).withdraw()).to.be.revertedWith(
                "VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'"
            );
        });

        it("should return max supply, total supply and price", async () => {
            const [maxSupply, totalSupply, price] = await contract.getSupplyAndPrice();

            expect(maxSupply).to.equal(await contract.MAX_SUPPLY());
            expect(totalSupply).to.equal(await contract.totalSupply());
            expect(price).to.equal(await contract.getPrice());
        });

        it("should allow only one token per non-owner wallet", async () => {
            // Minting one token should work
            await contract.connect(addr1).mint({ value: await contract.getPrice() });

            // Minting another token should fail
            await expect(contract.connect(addr1).mint({ value: await contract.getPrice() })).to.be.revertedWith(
                "VM Exception while processing transaction: reverted with reason string 'Only one token per wallet allowed'"
            );
        });
    },
};
