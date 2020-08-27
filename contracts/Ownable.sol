// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "./Context.sol";
/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
contract Ownable is Context {

    mapping(address => bool) public owners;
    address private _owner;

    event OwnershipAdded(address indexed newOwner);
    event OwnershipRenounced(address indexed oldOwner);
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);



    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () internal {
        address msgSender = _msgSender();
        owners[msgSender] = true;
        emit OwnershipAdded(msgSender);
    }


    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owners[_msgSender()] == true, "Ownable: caller is not one of the owners");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _owner = _msgSender();
        owners[_owner] = false;
        emit OwnershipRenounced(_owner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address _newOwner) public virtual onlyOwner {
        require(_newOwner != address(0), "Ownable: new owner is the zero address");
        _owner = _msgSender();
        owners[_owner] = false;
        owners[_newOwner] = true;
        emit OwnershipTransferred(_owner, _newOwner);

    }

    /**
     * @dev Adds a new owner to the pool of ownership
     */
    function addOwnership(address _newOwner) public virtual onlyOwner {
        require(_newOwner != address(0), "Ownable: new owner is the zero address");
        owners[_newOwner] = true;
        emit OwnershipAdded(_newOwner);

    }
}