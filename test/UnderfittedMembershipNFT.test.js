const { expect } = require("chai");

describe("UnderfittedMembershipNFT", () => {
    let UnderfittedMembershipNFT;
    let contract;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        UnderfittedMembershipNFT = await ethers.getContractFactory("UnderfittedMembershipNFT");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        contract = await UnderfittedMembershipNFT.deploy();
    });

    it("should return the max supply", async () => {
        expect(await contract.MAX_SUPPLY()).to.equal(10);
    });

    it("should return the total supply", async () => {
        expect(await contract.totalSupply()).to.equal(0);
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
});
