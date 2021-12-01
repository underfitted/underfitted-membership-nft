async function main() {
    const treasury = process.env.TREASURY;

    if (!treasury) {
        console.log("No treasury specified");
        throw new Error("No treasury specified");
    }

    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    console.log("Treasury account:", treasury);

    const UnderfittedSocialClubMembershipMock = await ethers.getContractFactory("UnderfittedSocialClubMembershipMock");

    const contract = await UnderfittedSocialClubMembershipMock.deploy(treasury);

    console.log("Contract address:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
