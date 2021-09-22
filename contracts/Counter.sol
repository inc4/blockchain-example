//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    mapping(address => uint) public players;

    function getScore() public view returns (uint) {
        return players[msg.sender];
    }

    function setScore(uint score) public {
        players[msg.sender] = score;
    }
}
