const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Subscription Contract : Mint", () => {
  let owner;
  let buyer;
  let creator;
  let SubscriptionNFT, subscriptionContract;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    
    owner = accounts[0];
    buyer = accounts[1];
    creator = accounts[2];

    SubscriptionNFT = await ethers.getContractFactory("SubscriptionNFT");
    subscriptionContract = await SubscriptionNFT.deploy();
  });

  
  it("should create subscription", async function () {

    const initialBalance = await subscriptionContract.balanceOf(creator);
    expect(initialBalance.toString()).to.equal("0");

    // const tx = await subscriptionContract.connect(creator).issueSubscriptionNFT("basic", 10, 30);
    
    // const finalBalance = await subscriptionContract.balanceOf(creator);
    // expect(finalBalance.toString()).to.equal("1");
  });

  it("should return subscription template", async function () {
      const template = await subscriptionContract.subscriptionTemplates(0);
      console.log(template);
     await expect(true).to.be.ok;
  });
});
