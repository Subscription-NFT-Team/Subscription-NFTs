const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const contract = require("../artifacts/contracts/SubscriptionNFT.sol/SubscriptionNFT.json");

// Contract
const subscriptionContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);


async function main() {
    
    const message = await subscriptionContract.getTiers(0);
    console.log("The message is: " + message);
  }

  main();