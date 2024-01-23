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
});
