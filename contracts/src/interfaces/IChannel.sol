// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

interface IChannel {

    event MessageSent(uint256 indexed id, bytes32 contentCID);

    event NewMember(address indexed member);

    event MemeberCredentials(address indexed member, uint256 indexed identityCommitment);

    /**
     * @dev Gets the name of the channel.
     * @return The name of the channel.
     */
    function name() external view returns (bytes32);

    /**
    * @dev The type of channel.
    * @return 3 bits 0x123. 1 = is it private chat, 2 = semaphore anonymous chat, 3 = joinable
    */
    function getType() external view returns (bytes1);

    /**
     * @dev Gets the CID of the joining rules of the channel.
     * @return The CID of the joining rules of the channel.
     */
    function getJoiningRules() external view returns (bytes32);

    function join(bytes calldata entry) external;

    function sendMessage(bytes calldata entry) external;
}