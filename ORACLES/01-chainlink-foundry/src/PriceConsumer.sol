// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/local/src/data-feeds/interfaces/AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal priceFeed;

    constructor(address _feedAddress) {
        priceFeed = AggregatorV3Interface(_feedAddress);
    }

    function getLatestPrice() public view returns (int256) {
        (, int256 price,,,) = priceFeed.latestRoundData();
        return price;
    }
}