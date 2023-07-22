// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.21;

interface IFactory {

    struct Channel {
        bytes3 category;
        address channelAddress;
    }

    /**
     * @dev Emitted when a channel is created.
     * @param category The type of channel created.
     * @param channelAddress The address of the channel created.
     */
    event ChannelCreated(uint256 id, bytes3 category, address channelAddress);

    /**
     * @dev Creates a new channel and registers it in the registry.
     * @param _type The type of channel to create.
     * @return The address of the newly created channel.
     */
    function createChannel(bytes3 _type) external returns (address);

    /**
     * @dev Gets the address of the channels in the registry.
     * @return The address of the channels.
     */
    function getChannels() external view returns (address[] memory);

    /**
     * @dev Gets the address of a channel in the registry.
     * @param category The type of channel to get.
     * @return The address of the channel.
     */
    function getChannel(bytes3 category) external view returns (address);

    /**
     * @dev Gets the address of a channel in the registry.
     * @param _channelId The id of the channel to get.
     */
    function joinChannel(uint256 _channelId, bytes calldata request) external;

    /**
     * @dev send a message a channel in the registry.
     * @param channelAddress The address of the channel to register.
     */
    function sendMessage(address channelAddress) external;
}