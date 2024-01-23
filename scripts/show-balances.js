require('dotenv').config()
const { ethers } = require('ethers')
var token = require('../artifacts/contracts/Token.sol/Token.json')

const provider = new ethers.AlchemyProvider('arbitrum-sepolia', process.env.ALCHEMY_SEPOLIA_API_KEY)

const contract = new ethers.Contract(process.env.TOKEN_ADDRESS, token.abi, provider)

provider.getBalance(process.env.WALLET_ADDRESS).then(balance => {
  const ethBalance = Number(balance) / 1e18

  console.log(`ETH balance: ${ethBalance.toFixed(3)}`)
})

contract.balanceOf(process.env.WALLET_ADDRESS).then(balance => {
  const ethBalance = Number(balance) / 1e18

  console.log(`TKN balance: ${ethBalance.toFixed(3)}`)

})

