const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Subscription Contract : Mint", () => {
    let owner;
	let account1;
    let SubscriptionNFT, subscriptionContract;

    beforeEach(async () => {
        const accounts = await ethers.getSigners();

		owner = accounts[0];
		account1 = accounts[1];
        
        SubscriptionNFT = await ethers.getContractFactory("SubscriptionNFT");
        subscriptionContract = await SubscriptionNFT.deploy();
        subscriptionContract.dummyData();
    });

	it("should return tiers", async function () {
        await expect(
            subscriptionContract.dummyData()
        ).to.be.ok;
    });

    it("should revert when template is not found", async function () {
        await expect(
            subscriptionContract.getTiers(1)
        ).to.be.revertedWith("Template not found");
    });

    it("should return tiers", async function () {

        const tiers = await subscriptionContract.getTiers(0);
        // console.log(tiers);
        await expect(tiers
        ).to.be.an('array').that.is.not.empty;
    });    

});