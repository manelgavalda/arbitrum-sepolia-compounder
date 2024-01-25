const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Token", function () {
  async function deploy() {
    const Token = await ethers.getContractFactory("Token");

    const token = await Token.deploy();

    return token;
  }

  beforeEach(async function () {
    this.token = await loadFixture(deploy);
  })

  it("should set the right name", async function () {
    expect(await this.token.name()).to.equal('Token');
  });

  it("should set the right supply", async function () {
    expect(Number(await this.token.totalSupply())).to.equal(1e24);
  });
});
