// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

interface IChannel {

    event MessageSent(uint256 indexed id, bytes32 contentCID);

    event MemberJoined(address indexed member, string pubkey);

    event MemeberCredentials(address indexed member, string cipherkey);

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

    function join(string memory pubkey, bytes memory entry) external;

    function postCreds(address member, string memory cipherkey) external;

    function sendMessage(bytes calldata entry) external;
}