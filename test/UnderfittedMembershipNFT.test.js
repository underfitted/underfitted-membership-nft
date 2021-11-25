const { expect } = require("chai");

describe("UnderfittedMembershipNFT", () => {
    let UnderfittedMembershipNFT;
    let contract;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        UnderfittedMembershipNFT = await ethers.getContractFactory("UnderfittedMembershipNFT");
        [owner, addr1, addr2] = await ethers.getSigners();

        contract = await UnderfittedMembershipNFT.deploy();
    });

    it("should return the max supply", async () => {
        expect(await contract.MAX_SUPPLY()).to.equal(10);
    });

    it("should return the total supply", async () => {
        expect(await contract.totalSupply()).to.equal(0);
    });

    it("should return the reserved supply", async () => {
        expect(await contract.RESERVED_SUPPLY()).to.equal(3);
    });

    it("should have correct baseURI", async () => {
        await contract.mint();

        expect(await contract.tokenURI(0)).to.equal("ipfs://QmSeYu1FZ7cp4mUZHk688BEa2Qiw4YySekhhVTG7Nhr4mP/0");
    });

    it("should mint a token", async () => {
        await contract.mint();

        expect(await contract.totalSupply()).to.equal(1);
        expect(await contract.balanceOf(owner.address)).to.equal(1);
        expect(await contract.ownerOf(0)).to.equal(owner.address);

        await contract.connect(addr1).mint();
        expect(await contract.totalSupply()).to.equal(2);
        expect(await contract.balanceOf(addr1.address)).to.equal(1);
        expect(await contract.ownerOf(1)).to.equal(addr1.address);
    });

    it("should mint only MAX_SUPPLY tokens", async () => {
        for (let i = 0; i < (await contract.MAX_SUPPLY()); i++) {
            await contract.mint();
        }

        try {
            await contract.mint();
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

    it("should mint the reserved supply to the owner", async () => {
        await contract.mintReserved();

        expect(await contract.totalSupply()).to.equal(3);
        expect(await contract.balanceOf(owner.address)).to.equal(3);
    });

    it("should only mint reserved for the owner", async () => {
        try {
            await contract.connect(addr1).mintReserved();
            expect.fail("Should not allow to mint reserved supply for someone else");
        } catch (error) {
            expect(error.message).to.equal(
                "VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'"
            );
        }
    });

    it("should only mint reserved if enough left", async () => {
        const reservedSupply = await contract.RESERVED_SUPPLY();
        const maxSupply = await contract.MAX_SUPPLY();

        for (let i = 0; i < maxSupply - reservedSupply + 1; i++) {
            await contract.mint();
        }

        try {
            await contract.mintReserved();
            expect.fail("Should not allow to mint reserved if not enough available");
        } catch (error) {
            expect(error.message).to.equal(
                "VM Exception while processing transaction: reverted with reason string 'Sold out'"
            );
        }
    });
});
