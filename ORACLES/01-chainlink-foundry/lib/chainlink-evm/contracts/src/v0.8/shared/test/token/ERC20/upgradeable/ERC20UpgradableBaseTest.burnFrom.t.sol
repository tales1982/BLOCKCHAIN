// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IBurnMintERC20Upgradeable} from "../../../../../shared/token/ERC20/upgradeable/IBurnMintERC20Upgradeable.sol";
import {IAccessControl} from "@openzeppelin/contracts@5.0.2/access/IAccessControl.sol";
import {IERC20} from "@openzeppelin/contracts@5.0.2/interfaces/IERC20.sol";

import {ERC20UpgradableBaseTest} from "./ERC20UpgradableBaseTest.t.sol";

contract ERC20UpgradableBaseTest_burnFrom is ERC20UpgradableBaseTest {
  function should_BurnFrom(address implementation) public {
    changePrank(i_mockPool);
    IBurnMintERC20Upgradeable(implementation).mint(STRANGER, AMOUNT);

    uint256 balanceBefore = IBurnMintERC20Upgradeable(implementation).balanceOf(STRANGER);
    uint256 totalSupplyBefore = IBurnMintERC20Upgradeable(implementation).totalSupply();
    uint256 amountToBurn = AMOUNT / 2;

    changePrank(STRANGER);
    IBurnMintERC20Upgradeable(implementation).approve(i_mockPool, amountToBurn);

    changePrank(i_mockPool);

    vm.expectEmit();
    emit IERC20.Transfer(STRANGER, address(0), amountToBurn);

    IBurnMintERC20Upgradeable(implementation).burnFrom(STRANGER, amountToBurn);

    assertEq(IBurnMintERC20Upgradeable(implementation).balanceOf(STRANGER), balanceBefore - amountToBurn);
    assertEq(IBurnMintERC20Upgradeable(implementation).totalSupply(), totalSupplyBefore - amountToBurn);
  }

  function should_BurnFrom_RevertWhen_CallerDoesNotHaveBurnerRole(address implementation, bytes32 BURNER_ROLE) public {
    changePrank(i_mockPool);
    IBurnMintERC20Upgradeable(implementation).mint(STRANGER, AMOUNT);

    changePrank(STRANGER);

    vm.expectRevert(
      abi.encodeWithSelector(IAccessControl.AccessControlUnauthorizedAccount.selector, STRANGER, BURNER_ROLE)
    );

    IBurnMintERC20Upgradeable(implementation).burnFrom(STRANGER, AMOUNT);
  }
}
