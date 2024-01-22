require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
      sepolia: {
        url: `https://arb-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_API_KEY}`,
        accounts: [process.env.SEPOLIA_PRIVATE_KEY]
      }
    },
    etherscan: {
      apiKey: process.env.ARBISCAN_API_KEY,
      customChains: [
          {
            network: "sepolia",
            chainId: 421614,
            urls: {
              apiURL: "https://api-sepolia.arbiscan.io/api",
              browserURL: "https://sepolia.arbiscan.io"
            }
          }
        ]
    },
};
