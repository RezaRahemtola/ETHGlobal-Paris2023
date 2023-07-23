// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import "forge-std/Test.sol";
import "../src/channels/BasicChannel.sol";

contract ChannelTest is Test {
    address channel;

    address alice;
    address bob;

    event MessageSent(uint256 indexed id, bytes32 contentCID);


    function setUp() public {
        alice = vm.addr(1);
        bob = vm.addr(2);

        channel = address(new BasicChannel("test", 0x01));
    }

    function testSendMessage() public {
        vm.expectEmit();
        emit MessageSent(0, "salut");

        IChannel(channel).sendMessage("salut");
    }
}
