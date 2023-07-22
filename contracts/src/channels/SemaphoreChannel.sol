// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "../interfaces/IChannel.sol";
import "../interfaces/ISemaphore.sol";

contract SemaphoreChannel is IChannel {
    address public immutable _semaphore;
    uint256 public immutable _groupId;

    bytes32 public immutable _name;
    bytes32 public immutable _joiningRules;

    uint256 public messageCount;

    constructor(address semaphore_, uint256 groupId_, bytes32 name_, bytes32 joiningRules_) {
        _semaphore = semaphore_;
        _groupId = groupId_;
        _name = name_;
        _joiningRules = joiningRules_;
        
       ISemaphore(semaphore_).createGroup(groupId_, 20, address(this));
    }

    function name() public view override returns (bytes32) {
        return _name;
    }

    function getType() external pure override returns (bytes1) {
        return bytes1(0x01);
    }

    function getJoiningRules() external view override returns (bytes32) {
        return _joiningRules;
    }

    function join(bytes calldata) external override {
        uint256 identityCommitment;
        assembly {
            identityCommitment := calldataload(4)
        }
        ISemaphore(_semaphore).addMember(_groupId, 0);
    }

    function sendMessage(bytes calldata) external override {
        uint256 message;
        uint256 merkleTreeRoot;
        uint256 nullifierHash;
        uint256[8] calldata proof;
        assembly {
            message := calldataload(add(4, 32))
            merkleTreeRoot := calldataload(add(4, 36))
            nullifierHash := calldataload(add(4, 68))
            proof := calldataload(add(4, 100))
        }
        ISemaphore(_semaphore).verifyProof(_groupId, merkleTreeRoot, message, nullifierHash, _groupId, proof);

        messageCount++;
        emit MessageSent(messageCount - 1, bytes32(message));
    }
}