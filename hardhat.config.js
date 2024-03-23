require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    hardhat: {},
    optimism: {
      url: "sua url",
      accounts: ["sua chave privada"],
    }
  },
};
