pragma solidity >=0.6.0;

/// @title Evektra Smart Contract - Contract to manage Evektra client's funds
/// @author João Quintanilha - <jquintanilha@ubiwhere.com>
/// Last update:

import "./dai.sol";
import "./Ownable.sol";
import "./SafeMath.sol";

contract Evektra is Ownable {

    using SafeMath for uint;

    Dai public DAI_SC;
    uint public overallBalance;

    mapping(address => uint256) wallet;

    event Transfer(address sender, address recipient, uint amount);
    event TransferToEvektra(address sender, uint amount);
    event DaiDeposit(address daiOwner, uint amount);
    event Withdraw(address recipient, uint amount);


    modifier requireAmountBytes32BiggerThanZero(bytes32 _amount) {
        require(bytes32ToUint(_amount) > 0, "Amount must be greater than 0!");
        _;
    }

    modifier onlyMyself(address caller) {
        require( caller == address(this), "Caller is not the own contract!");
        _;
    }

    modifier hasEnoughBalance(address _from, uint _amount) {
        require(wallet[_from] >= _amount, "User does not have enough balance!");
        _;
    }

    modifier balanceIsConsistent(uint amount) {
        require(DAI_SC.balanceOf(address(this)) >= overallBalance.add(amount), "Real balance and Overall balance are not consistent!");
        _;
    }

    constructor (address _dai_addr) public{
        DAI_SC = Dai(_dai_addr);
        overallBalance = 0;
    }

    function naofaconada() public view returns (uint) {
        return 1;
    }

    /*
     * Function to call after a Transak DAI deposit
     * @description         Only evektra controls the mapping of its clients fsunds
     * @param _daiOwner     Client who bought  DAI
     * @param _amount       Amount of DAI bought
    */
    function daiDeposit(address _daiOwner, uint _amount) public
        onlyOwner {
            wallet[_daiOwner] =  wallet[_daiOwner].add(_amount);
            overallBalance.add(_amount);
            emit DaiDeposit(_daiOwner, _amount);
    }

    /*
     * Function to get the balance of each client
     * @description         Evektra clien's funds are transparent and accesse through this function
     * @param _addr         Client's address to check balance
    */
    function balanceOf(address _addr) public view returns (uint){
        return wallet[_addr];
    }

    /*
     * Function to transfer DAI tokens to Evektra
     * @description         This function can only be called by Evektra's owner and must be
                            called whenever funds are to be sent to Evektra
     * @param _from         Client that is tranfering the tokens
     * @param _wad          Ammount of tokens to be transfere
    */
    function transferToEvektra(address _from, uint _wad)
    public
    onlyOwner
    hasEnoughBalance(_from, _wad){
        wallet[address(this)] =  wallet[address(this)].add(_wad);
        wallet[_from] = wallet[_from].sub(_wad);
        emit TransferToEvektra(_from, _wad);
    }

    /*
     * Function to transfer DAI tokens another Evektra user
     * @description         This function can only be called by Evektra's owner and must be
                            called whenever funs must be sent to another Evektra user
     * @param _from         Client that is tranfering the tokens
     * @param _to           Client that is receiving the tokens
     * @param _wad          Ammount of tokens to be transfere
    */
    function transfer(address _from, address _to, uint _wad)
    public
    onlyOwner
    hasEnoughBalance(_from, _wad){
        wallet[_to] =  wallet[_to].add(_wad);
        wallet[_from] = wallet[_from].sub(_wad);
        emit Transfer(_from, _to, _wad);
    }

    /*
     * Function the transferes tokes to Evektra from a sginature of its user
     * @description             User must sign the amount he wants to transfer in the shape of 32 bytes.
                                Call this function with the amount signed an its correspondent signature
                                to transfer funds throught signature.
     * @param _messageAmount    Amount in bytes32
     * @param _signature        Signature of the amount in bytes32
    */
    function tranferToEvektraViaSignature(bytes32 _messageAmount, bytes memory _signature) public
        requireAmountBytes32BiggerThanZero(_messageAmount)
        onlyOwner
        returns (address){

            bytes32 r;
            bytes32 s;
            uint8 v;
            if (_signature.length != 65){
                return address(0);
            }

            assembly {
                r := mload(add(_signature, 32))
                s := mload(add(_signature, 64))
                v := byte(0, mload(add(_signature, 96)))
            }

            if (v < 27){
                v == 27;
            }

            if (v != 27 && v != 28){
                return address(0);
            } else {
                uint amount = bytes32ToUint(_messageAmount);
                address signer = ecrecover(keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageAmount)), v, r, s);

                transferToEvektra(signer, amount);

                return signer;
            }
    }

    /*
     * Function to tcheck consistency between the mapping's wallet an the current state of DAI's contract
     * @description         This function willverify that the overall funds of Evektra's users
                            is not bigger than the funds Evektraa's contract holds
    */
    function checkConsistency() public view returns (bool) {
        return DAI_SC.balanceOf(address(this)) >= overallBalance;
    }

    /*
     * Function to convert bytes32 type object to integer 256
     * @description         This function directly casts a typed object of bytes 32 to uint256
    */
    function bytes32ToUint(bytes32 _message) internal pure returns (uint) {
        return uint(_message);
    }

    /*
     * Function to withdrawl Evektra funds
     * @description         This function is solely for Evektra to be able to withdraw funds
    */
    function withdraw(address _to, uint _amount) public
    onlyOwner
    hasEnoughBalance(address(this), _amount){
        DAI_SC.transfer(_to, _amount);
        wallet[address(this)] =  wallet[address(this)].sub(_amount);
        overallBalance.sub(_amount);
        emit Withdraw(_to, _amount);
    }
}