const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyTokenModule", (m) => {

  const MyToken = m.contract("MyToken")
  
  return { MyToken };
});
