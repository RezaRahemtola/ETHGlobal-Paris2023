// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import "../interfaces/IChannel.sol";

contract BasicChannel is IChannel {
    bytes32 public immutable _name;
    bytes1 public immutable _type;

    constructor(bytes32 name_, bytes1 type_) {
        _name = name_;
        _type = type_;
    }

    function name() public view override returns (bytes32) {
        return _name;
    }

    function getType() external view override returns (bytes1) {
        // type : 0x1 | 0x0 << 1 | 0x0 << 2
        return _type;
    }

    function join(string memory pubkey, bytes memory) external {
        emit MemberJoined(msg.sender, pubkey);
    }

    function postCreds(address member, string memory cipherkey) external {
        emit MemeberCredentials(member, cipherkey);
    }

    function sendMessage(bytes memory data) external override {
        bytes32 res;
        assembly {
            res := mload(add(data, 32))
        }
        emit MessageSent(0, res);
    }
}