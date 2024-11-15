// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;
    
    // Define events
    event CountIncremented(address indexed user, uint256 newCount);
    event CountDecremented(address indexed user, uint256 newCount);

    constructor() {
        count = 0;
    }

    function increment() public {
        count++;
        emit CountIncremented(msg.sender, count);  // Emit event on increment
    }

    function decrement() public {
        count--;
        emit CountDecremented(msg.sender, count);  // Emit event on decrement
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}

