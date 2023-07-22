// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

interface IRegistry {

    struct Channel {

        address channelAddress;
    }

    /**
     * @dev Emitted when a channel is registered.
     * @param _type The type of channel created.
     * @param channelAddress The address of the channel created.
     */
    event ChannelRegistered(uint256 id, bytes1 _type, address channelAddress);

    /**
     * @dev Register a new channel and registers it in the registry.
     * @param channelAddr The address of the channel to register.
     */
    function registerChannel(address channelAddr) external;

    /**
     * @dev Gets the address of the channels in the registry.
     * @return The address of the channels.
     */
    function getChannels() external view returns (address[] memory);

    /**
     * @dev Gets the address of a channel in the registry.
     * @param id The type of channel to get.
     * @return The address of the channel.
     */
    function getChannel(uint256 id) external view returns (Channel memory);

    /**
     * @dev Gets the address of a channel in the registry.
     * @param _channelId The id of the channel to get.
     */
    function joinChannel(uint256 _channelId) external;

    /**
     * @dev send a message a channel in the registry.
     * @param _channelId The address of the channel to register.
     */
    function sendMessage(uint256 _channelId, bytes calldata contentCID) external;
}
