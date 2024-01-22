const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Token", function () {
  async function deploy() {
    const Token = await ethers.getContractFactory("Token");

    const token = await Token.deploy();

    return { token };
  }

  it("Should set the right name and supply", async function () {
    const { token } = await loadFixture(deploy);

    expect(await token.name()).to.equal('Token');
    expect(await token.totalSupply()).to.equal(1000000000000000000000000n);
  });
});
