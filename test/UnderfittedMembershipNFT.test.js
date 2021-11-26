const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UnderfittedMembershipNFT", () => {
    let UnderfittedMembershipNFT;
    let contract;
    let owner;
    let addr1;

    beforeEach(async function () {
        UnderfittedMembershipNFT = await ethers.getContractFactory("UnderfittedMembershipNFT");
        [owner, addr1, addr2] = await ethers.getSigners();

        contract = await UnderfittedMembershipNFT.deploy();

        reservedSupply = (await contract.RESERVED_SUPPLY()).toNumber();
    });

    it("should return the max supply", async () => {
        expect(await contract.MAX_SUPPLY()).to.equal(10);
    });

    it("should return the reserved supply", async () => {
        expect(reservedSupply).to.equal(3);
    });

    it("should return the total supply", async () => {
        expect(await contract.totalSupply()).to.equal(reservedSupply);
    });

    it("should mint the reserved supply to the owner when deployed", async () => {
        expect(await contract.totalSupply()).to.equal(3);
        expect(await contract.balanceOf(owner.address)).to.equal(3);
    });

    it("should have correct baseURI", async () => {
        await contract.mint();

        expect(await contract.tokenURI(0)).to.equal("ipfs://QmSeYu1FZ7cp4mUZHk688BEa2Qiw4YySekhhVTG7Nhr4mP/0");
    });

    it("should mint a token", async () => {
        await contract.mint();

        expect(await contract.totalSupply()).to.equal(reservedSupply + 1);
        expect(await contract.balanceOf(owner.address)).to.equal(reservedSupply + 1);
        expect(await contract.ownerOf(reservedSupply)).to.equal(owner.address);

        await contract.connect(addr1).mint();
        expect(await contract.totalSupply()).to.equal(reservedSupply + 2);
        expect(await contract.balanceOf(addr1.address)).to.equal(1);
        expect(await contract.ownerOf(reservedSupply + 1)).to.equal(addr1.address);
    });

    it("should mint only MAX_SUPPLY tokens", async () => {
        for (let i = reservedSupply; i < (await contract.MAX_SUPPLY()); i++) {
            await contract.mint({ value: await contract.getPrice() });
        }

        try {
            await contract.mint({ value: await contract.getPrice() });
            expect.fail("Should not allow to mint more than MAX_SUPPLY");
        } catch (error) {
            expect(error.message).to.equal(
                "VM Exception while processing transaction: reverted with reason string 'Sold out'"
            );
        }
    });

    it("should pause the contract", async () => {
        await contract.pause();
        expect(await contract.paused()).to.equal(true);

        try {
            await contract.mint();
            expect.fail("Should not allow to mint when paused");
        } catch (error) {
            expect(error.message).to.equal(
                "VM Exception while processing transaction: reverted with reason string 'Pausable: paused'"
            );
        }
    });

    it("should unpause the contract", async () => {
        await contract.pause();
        await contract.unpause();
        await contract.mint();
        expect(await contract.paused()).to.equal(false);
    });

    it("should throw went price is wrong", async () => {
        try {
            await contract.mint({ value: (await contract.getPrice()) + 1 });
            expect.fail("Should not allow to mint with wrong price");
        } catch (error) {
            expect(error.message).to.equal(
                "VM Exception while processing transaction: reverted with reason string 'Incorrect price'"
            );
        }
    });

    it("should set the correct price", async () => {
        for (let i = reservedSupply; i < (await contract.MAX_SUPPLY()); i++) {
            const price = await contract.getPrice();

            // Calculate the expected price
            let expectedPrice = 0;
            if (i < (await contract.SUPPLY_LIMIT_1())) expectedPrice = await contract.SUPPLY_PRICE_0();
            else if (i < (await contract.SUPPLY_LIMIT_2())) expectedPrice = await contract.SUPPLY_PRICE_1();
            else if (i < (await contract.SUPPLY_LIMIT_3())) expectedPrice = await contract.SUPPLY_PRICE_2();
            else expectedPrice = await contract.SUPPLY_PRICE_3();

            expect(price).to.equal(expectedPrice);

            await contract.mint({ value: price });
        }
    });

    it("should store proceeds", async () => {
        // Start with 0
        expect(await ethers.provider.getBalance(contract.address)).to.equal(0);

        // Mint the free supply
        for (let i = reservedSupply; i < (await contract.SUPPLY_LIMIT_1()); i++) {
            await contract.mint({ value: await contract.getPrice() });
        }

        // Balance should still be 0
        expect(await ethers.provider.getBalance(contract.address)).to.equal(0);

        // Mint one more
        await contract.mint({ value: await contract.getPrice() });

        // Balance should be the price of the last mint
        expect(await ethers.provider.getBalance(contract.address)).to.equal(await contract.SUPPLY_PRICE_1());
    });

    it("should withdraw proceeds", async () => {
        const ownerBalance = await ethers.provider.getBalance(owner.address);

        // Mint the free supply + 1 from another address
        for (let i = reservedSupply; i < (await contract.SUPPLY_LIMIT_1()).add(1); i++) {
            await contract.connect(addr1).mint({ value: await contract.getPrice() });
        }

        // Withdraw the proceeds
        await contract.withdraw();

        // New balance should be greater than the old one
        expect(await ethers.provider.getBalance(owner.address)).to.gt(ownerBalance);
    });

    it("should withdraw proceeds only to the owner", async () => {
        try {
            await contract.connect(addr1).withdraw();
            expect.fail("Should not allow withdraw for someone else");
        } catch (error) {
            expect(error.message).to.equal(
                "VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'"
            );
        }
    });

    it("should return max supply, total supply and price", async () => {
        const [maxSupply, totalSupply, price] = await contract.getSupplyAndPrice();
        expect(maxSupply).to.equal(await contract.MAX_SUPPLY());
        expect(totalSupply).to.equal(await contract.totalSupply());
        expect(price).to.equal(await contract.getPrice());
    });
});
