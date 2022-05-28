import { ethers } from "ethers";

const contractAddress = require("../abis/contract-address.json");
const SubscriptionNFT = require("../abis/SubscriptionNFTContract.json");

// import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// import express from 'express';
// 1: Mainnet
// 4: Rinkeby
// 1337: localhost network

// process.env['NEXT_PUBLIC_NETWORK_ID'] = "4";

// const networkId = process.env.NEXT_PUBLIC_NETWORK_ID || "1337"
const networkId = "1337";
const networks = {
  1: "mainnet",
  4: "rinkeby",
  1337: "localhost",
};

export const networkName = networks[networkId];

export const fetchSubscriptions = async () => {
  // call the smart contract, read the current greeting value
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress.SubscriptionNFTContract,
      SubscriptionNFT.abi,
      signer
    );

    console.log(contract);

    try {
      let arrData = [];
      for (let i = 1; i < 6; i++) {
        const data = await contract.subscriptionTemplates(i);
        // console.log('data', data);
        // console.log('data name', data[1]);
        // console.log('data price', data[2].toNumber());
        // console.log('data term', data[3].toNumber());
        
        let obj = {
            id: i,
            name: data[1],
            price: data[2].toNumber(),
            term: data[3].toNumber()
        }
        arrData.push(obj);
      }
      
      console.log("arr data: ", arrData);
    } catch (err) {
      console.log("Error: ", err);
    }
    return true;
  }
};

export const addSubscriptionTemplate = async (name, price, term) => {
    if (typeof window.ethereum !== "undefined") {
        // const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        const contract = new ethers.Contract(
          contractAddress.SubscriptionNFTContract,
          SubscriptionNFT.abi,
          signer
        );
    

        console.log(contract);
        // string memory subscriptionName, uint256 price, uint256 term
        try {
          const data = await contract.addCreator(name, price, term);
    
          console.log("data: ", data);
        } catch (err) {
          console.log("Error: ", err);
        }
        return true;
      }
}

export const mintSubscriptionNFT = async (id) => {
    if (typeof window.ethereum !== "undefined") {
        // const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        const contract = new ethers.Contract(
          contractAddress.SubscriptionNFTContract,
          SubscriptionNFT.abi,
          signer
        );
    

        console.log(contract);
        // string memory subscriptionName, uint256 price, uint256 term
        try {
          const data = await contract.issueSubscriptionNFT(id);
          console.log("mint data: ", data);
        } catch (err) {
          console.log("Error: ", err);
        }
        return true;
      }
}

export const getEthereumObject = () => {
  const { ethereum } = window;
  if (!ethereum) return null;

  const nV = ethereum.networkVersion;

  // if (nV != networkId) {
  //     alert(`Please switch to the ${networkName} network`)
  //     return null
  // }

  return ethereum;
};

export const setupEthereumEventListeners = (ethereum) => {
  const provider = new ethers.providers.Web3Provider(ethereum, "any");
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      window.location.reload();
    }
  });

  window.ethereum.on("accountsChanged", async (accounts) => {
    window.location.reload();
  });

  return ethereum;
};


export const connectWallet = async () => {
  const { ethereum } = window;
  console.log("ethereum:", ethereum);
  if (!ethereum) return null;
  console.log("trying to connect wallet!!!");
  await ethereum.request({ method: "eth_requestAccounts" });

  window.location.reload();
};


export const getCurrentAccount = async () => {
  const { ethereum } = window;

  const accounts = await ethereum.request({ method: "eth_accounts" });

  if (!accounts || accounts?.length === 0) {
    return null;
  }
  const account = accounts[0];
  return account;
};

export const getSignedContract = (address, abi) => {
  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(ethereum, "any");

  const signer = provider.getSigner();
  return new ethers.Contract(address, abi, signer);
};
