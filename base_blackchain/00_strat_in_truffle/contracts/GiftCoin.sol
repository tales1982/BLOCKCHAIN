// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract GiftCoin {
  // keep track of all the addresses that have coins
  mapping (address => uint) coins;
  // keep track of who the owner of this contract is
  address public owner;

  constructor() public {
    // When this coin is initially deployed, we'll set that account to be the user
    // msg is a globally available variable that will tell us information about this current contract call
    // https://solidity.readthedocs.io/en/develop/units-and-global-variables.html
    owner = msg.sender;
  }

  // This is an event we'll broadcast when a gift is successfully sent from one account to another
  event GiftSent(
      address from,
      address to,
      uint amount
  );

  function sendGift(address receiver, uint amount) public {
    // We need to take coins from the account that sent this and gift them to the reciever address
    // only if the account that sent this has sufficient funds
    // If successful we'll broadcast the GiftSent event
    require(amount <= coins[owner], "Insufficient funds");
    coins[owner] -= amount;
    coins[receiver] += amount;
    emit GiftSent(owner, receiver, amount);
  }

  // this function will create new coins and should be reserved for only the owner to call it
  function mintCoins(address target, uint256 mintedAmount) public onlyOwner {
		coins[target] += mintedAmount;
	}

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner Can do it");
        // The _ is a placeholder for the body of the modified method
    _;
    }

  // returns the balance of the address in question
  function balanceOf(address addr) public returns(uint) {
    return coins[addr];
  }
}