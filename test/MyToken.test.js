const { expect } = require("chai")
const { ethers } = require("hardhat")

let MyToken;
let cMyToken;
let deployer;
let addr1;

describe("MyToken", async function () {
  
    MyToken = await ethers.getContractFactory("MyToken");
    cMyToken = await MyToken.deploy();
    await cMyToken.deployed();

    console.log('Token contract address: ', cMyToken.address)
    
  });