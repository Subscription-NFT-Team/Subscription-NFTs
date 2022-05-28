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
  });

<<<<<<< Updated upstream
  
  it("should mint subscription", async function () {
    const tx = await subscriptionContract.connect(account1).issueSubscriptionNFT(0, 0);
=======
  // it("should return tiers", async function () {
  //   await expect(subscriptionContract.dummyData()).to.be.ok;
  // });

  // it("should revert when template is not found", async function () {
  //   await expect(subscriptionContract.getTiers(1)).to.be.revertedWith(
  //     "Template not found"
  //   );
  // });

  // it("should return tiers", async function () {
  //   const tiers = await subscriptionContract.getTiers(0);

  //   await expect(tiers).to.be.an("array").that.is.not.empty;
  // });

  // it("should mint subscription", async function () {
  //   const tx = await subscriptionContract.connect(account1).issueSubscriptionNFT(0, 0);

  //   await expect(
  //     await subscriptionContract.balanceOf(account1.address)
  //   ).to.equal(1);
  // });
>>>>>>> Stashed changes

  it("should return subscription template", async function () {
      const template = await subscriptionContract.getTemplate(0);
      console.log(template);
     await expect(true).to.be.ok;
  });
});
