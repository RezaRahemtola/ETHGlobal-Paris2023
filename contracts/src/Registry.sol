// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import "./interfaces/IRegistry.sol";
import "./interfaces/IChannel.sol";

import "./channels/BasicChannel.sol";

contract Registry is IRegistry {
    address[] public registry;
    uint256 public channelCount;

    function createChannel(
        bytes32 name_,
        bytes1 channelType_
    ) external {
        address channel = address(new BasicChannel(name_, channelType_));

        registry.push(channel);
        channelCount++;

        emit ChannelRegistered(channelCount - 1, channelType_, channel);
    }

    function registerChannel(address channelAddr) external override {
        bytes1 channelType = IChannel(channelAddr).getType();

        if (uint8(channelType) > 0x7) {
            revert("Invalid channel type");
        }

        registry.push(channelAddr);
        channelCount++;

        emit ChannelRegistered(channelCount - 1, channelType, channelAddr);
    }

    function getChannels() external view override returns (Channel[] memory) {
        Channel[] memory channels = new Channel[](channelCount);
        for (uint256 i = 0; i < channelCount; i++) {
            channels[i] = Channel({
                channelAddress: registry[i],
                name: IChannel(registry[i]).name(),
                channelType: IChannel(registry[i]).getType()
            });
        }
        return channels;
    }

    function getChannel(
        uint256 id
    ) external view override returns (Channel memory) {
        return
            Channel({
                channelAddress: registry[id],
                name: IChannel(registry[id]).name(),
                channelType: IChannel(registry[id]).getType()
            });
    }

    function sendMessage(
        uint256 _channelId,
        bytes calldata contentCID
    ) external override {
        IChannel(registry[_channelId]).sendMessage(contentCID);
    }
}
