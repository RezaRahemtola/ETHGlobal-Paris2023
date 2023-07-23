// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import {IChannel} from "../interfaces/IChannel.sol";
import {ISemaphore} from "../interfaces/ISemaphore.sol";

contract SemaphoreChannel is IChannel {
    address public immutable _semaphore;
    uint256 public immutable _groupId;

    bytes32 public immutable _name;

    uint256 public messageCount;

    constructor(
        address semaphore_,
        uint256 groupId_,
        bytes32 name_,
        bytes32 joiningRules_
    ) {
        _semaphore = semaphore_;
        _groupId = groupId_;
        _name = name_;

        ISemaphore(semaphore_).createGroup(groupId_, 20, address(this));
    }

    function name() public view override returns (bytes32) {
        return _name;
    }

    function getType() external pure override returns (bytes1) {
        return bytes1(0x01);
    }

    function join(string memory pubkey, bytes memory data) external {
        uint256 identityCommitment;
        assembly {
            identityCommitment := mload(add(data, 32))
        }
        ISemaphore(_semaphore).addMember(_groupId, identityCommitment);

        emit MemberJoined(msg.sender, pubkey);
    }

    function postCreds(address member, string memory cipherkey) external {
        emit MemeberCredentials(member, cipherkey);
    }

    function sendMessage(bytes memory data) external override {
        uint256 message;
        uint256 merkleTreeRoot;
        uint256 nullifierHash;
        uint256[8] calldata proof;
        assembly {
            message := mload(add(data, 32))
            merkleTreeRoot := mload(add(data, 64))
            nullifierHash := mload(add(data, 96))
            proof := mload(add(data, 128))
        }
        ISemaphore(_semaphore).verifyProof(
            _groupId,
            merkleTreeRoot,
            message,
            nullifierHash,
            _groupId,
            proof
        );

        messageCount++;
        emit MessageSent(messageCount - 1, bytes32(message));
    }
}
