// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Staking {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;

    uint public totalStaked = 0;

    uint public totalRewards = 80000000;

    uint public rewardsPerHour = 1000;

    constructor(IERC20 token_) {
        token = token_;
    }

    function deposit(uint amount_) external {
        token.safeTransferFrom(msg.sender, address(this), amount_);
    }
}
