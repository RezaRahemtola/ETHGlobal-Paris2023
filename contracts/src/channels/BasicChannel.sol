// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import "../interfaces/IChannel.sol";

contract BasicChannel is IChannel {
    bytes32 public immutable _name;
    bytes32 public immutable _joiningRules;

    constructor(bytes32 name_, bytes32 joiningRules_) {
        _name = name_;
        _joiningRules = joiningRules_;
    }

    function name() public view override returns (bytes32) {
        return _name;
    }

    function getJoiningRules() external view override returns (bytes32) {
        return _joiningRules;
    }

    function getType() external pure override returns (bytes1) {
        // type : 0x1 | 0x0 << 1 | 0x0 << 2
        return bytes1(0x01);
    }

    function join(bytes calldata) external override {
        revert("You don't need to join this channel to send a message.");
    }

    function sendMessage(bytes memory data) external override {
        bytes32 res;
        assembly {
            res := mload(add(data, 32))
        }
        emit MessageSent(0, res);
    }

}