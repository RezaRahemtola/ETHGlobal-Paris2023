// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.21;

interface IChannel {

    event messageSent(uint256 id, bytes32 contentCID);

    function joinGroup(bytes calldata request) external;

    function message(bytes calldata entry) external;
}