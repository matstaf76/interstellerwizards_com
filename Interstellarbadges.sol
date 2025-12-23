// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InterstellarBadges is ERC1155, Ownable {
    
    // Unique IDs for our different STEM courses
    uint256 public constant ASTRONOMY_101 = 0;
    uint256 public constant ROCKETRY_BASIC = 1;
    uint256 public constant QUANTUM_FUN = 2;

    constructor() ERC1155("https://api.interstellarwizards.com/metadata/{id}.json") {}

    /**
     * @dev Mints the badge to a student. 
     * Only the website backend (owner) can call this.
     */
    function awardBadge(address student, uint256 courseId) public onlyOwner {
        _mint(student, courseId, 1, "");
    }
}
