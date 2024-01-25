const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Staking", function () {
  async function deploy() {
    const Token = await ethers.getContractFactory("Token");

    [owner, account] = await ethers.getSigners();

    const token = await Token.deploy();

    const Staking = await ethers.getContractFactory("Staking");

    const staking = await Staking.deploy(token.target);

    return { staking, token, owner, account };
  }

  function eth(amount) {
    return ethers.parseEther(amount.toString())
  }

  beforeEach(async function () {
    const data = await loadFixture(deploy);

    this.owner = data.owner
    this.token = data.token
    this.account = data.account
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

  it("should transfer amount", async function () {
    const amount = eth(100)

    await this.token.approve(this.staking.target, amount)

    await expect(this.staking.deposit(amount)).to.changeTokenBalances(this.token,
      [this.owner, this.staking],
      [amount * BigInt(-1), amount]
    )
  })

  it("should increment balance by amount", async function () {
    const amount = eth(100)

    const balance = await this.staking.balanceOf(this.owner.address)

    await this.token.approve(this.staking.target, amount)

    await this.staking.deposit(amount)

    expect(await this.staking.balanceOf(this.owner.address)).to.eq(balance + amount)
  })

  it("should have lastUpdated equal to the latest block timestamp", async function () {
    const amount = eth(100)

    await this.token.approve(this.staking.target, amount)

    await this.staking.deposit(100)

    const time = await this.staking.lastUpdated(this.owner.address)

    const now = new Date().toISOString().slice(0, 13);
    const formattedDate = new Date(Number(time) * 1000).toISOString().slice(0, 13);

    expect(formattedDate).to.eq(now)
  })

  it("should increment the total staked by amount", async function () {
    const amount = eth(100)

    await this.token.approve(this.staking.target, amount)

    const totalStaked = await this.staking.totalStaked()

    await this.staking.deposit(amount)

    expect(await this.staking.totalStaked()).to.eq(totalStaked + amount)
  })

  it("should revert if staking address not approved", async function () {
    const amount = eth(100)

    await expect(this.staking.deposit(amount)).to.be.reverted
  })

  it("should revert if address has insufficient balance", async function () {
    const totalSupply = await this.token.totalSupply()

    await this.token.approve(this.staking.target, totalSupply)

    await expect(this.staking.deposit(totalSupply + BigInt(1))).to.be.reverted
  })

  it("should emit Deposit event", async function () {
    const amount = eth(100)

    await this.token.approve(this.staking.target, amount)

    await expect(this.staking.deposit(amount)).to.emit(this.staking, "Deposit").withArgs(
      this.owner, amount
    )
  })
});
