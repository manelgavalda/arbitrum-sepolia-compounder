const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Staking", function () {
  async function deploy() {
    const Token = await ethers.getContractFactory("Token");

    const token = await Token.deploy();

    const Staking = await ethers.getContractFactory("Staking");

    const staking = await Staking.deploy(token.target);

    return { staking, token };
  }

  beforeEach(async function () {
    const data = await loadFixture(deploy);

    this.token = data.token
    this.staking = data.staking
  })

  it("should have a token", async function () {
    expect(await this.staking.token()).to.eq(this.token.target)
  })

  it("should have 0 staked", async function () {
    expect(await this.staking.totalStaked()).to.eq(0)
  })

  it("should have 80,000,000 rewards", async function () {
    expect(await this.staking.totalRewards()).to.eq(80000000)
  })

  it("should have 0.01% rewards per hour", async function () {
    expect(await this.staking.rewardsPerHour()).to.eq(1000)
  })
});
