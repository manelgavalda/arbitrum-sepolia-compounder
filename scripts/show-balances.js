require('dotenv').config()
const { Alchemy, Network } = require('alchemy-sdk');

const settings = {
  network: Network.ARB_SEPOLIA,
  apiKey: process.env.ALCHEMY_SEPOLIA_API_KEY
};

const alchemy = new Alchemy(settings);

alchemy.core.getBalance(process.env.WALLET_ADDRESS).then((balance) => {
  const ethBalance = balance / 1e18

  console.log(ethBalance)
})



