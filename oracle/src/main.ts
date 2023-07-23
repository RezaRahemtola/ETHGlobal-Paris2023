import { GOERLI_CONTRACT_ADDRESS, QUICKNODE_RPC_URL } from "./env";
import { Contract, WebSocketProvider } from "ethers";
import ChannelsWatcher from "./ChannelsWatcher";
import { RegistryABI } from "../abi";
import DfnsClient from "./DfnsClient";

async function main() {
  const dfnsClient = new DfnsClient();
  await dfnsClient.init();
  const wsProvider = new WebSocketProvider(QUICKNODE_RPC_URL);
  const contract = new Contract(GOERLI_CONTRACT_ADDRESS, RegistryABI, wsProvider);
  const channelWatcher = new ChannelsWatcher(contract, wsProvider, dfnsClient);

  await channelWatcher.registerOldChannels();
  await channelWatcher.listenAndRegisterNewChannels();
}

main();
