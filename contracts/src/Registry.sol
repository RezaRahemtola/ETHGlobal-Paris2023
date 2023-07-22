// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import "./interfaces/IRegistry.sol";
import "./interfaces/IChannel.sol";

contract Registry is IRegistry {
    Channel[] public registry;
    uint256 public channelCount;

    function registerChannel(address channelAddr) external override {
        bytes1 channelType = IChannel(channelAddr).getType();

        if (uint8(channelType) > 0x7) {
            revert("Invalid channel type");
        }

        registry.push(Channel({channelAddress: channelAddr}));
        channelCount++;

        emit ChannelRegistered(channelCount - 1, channelType, channelAddr);
    }

    function getChannels() external view override returns (address[] memory) {
        address[] memory channels = new address[](channelCount);
        for (uint256 i = 0; i < channelCount; i++) {
            channels[i] = registry[i].channelAddress;
        }
        return channels;
    }

    function getChannel(
        uint256 id
    ) external view override returns (Channel memory) {
        return registry[id];
    }

    function joinChannel(uint256 _channelId) external override {
        IChannel(registry[_channelId].channelAddress).join(bytes(""));
    }

    function sendMessage(
        uint256 _channelId,
        bytes calldata contentCID
    ) external override {
        IChannel(registry[_channelId].channelAddress).sendMessage(contentCID);
    }
}
