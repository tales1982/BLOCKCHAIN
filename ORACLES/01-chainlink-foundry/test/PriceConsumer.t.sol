// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/PriceConsumer.sol";

contract PriceConsumerTest is Test {
    PriceConsumer public priceConsumer;

    // Sepolia ETH/USD Feed
    address constant FEED = 0x694AA1769357215DE4FAC081bf1f309aDC325306;

    function setUp() public {
        priceConsumer = new PriceConsumer(FEED);
    }

    function testGetLatestPrice() public view {
        int256 price = priceConsumer.getLatestPrice();
        console2.log("ETH/USD Price:", price);
        assert(price > 0);
    }
}