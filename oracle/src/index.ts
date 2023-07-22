import { GOERLI_CONTRACT_ADDRESS, GOERLI_RPC_URL } from "./env";
import { Contract, WebSocketProvider } from "ethers";
import ChannelsWatcher from "./ChannelsWatcher";
import { RegistryABI } from "../abi";

async function main() {
  const wsProvider = new WebSocketProvider(GOERLI_RPC_URL);
  const contract = new Contract(
    GOERLI_CONTRACT_ADDRESS,
    RegistryABI,
    wsProvider
  );
  const channelWatcher = new ChannelsWatcher(contract, wsProvider);

  await channelWatcher.registerOldChannels();
  await channelWatcher.listenAndRegisterNewChannels();
}

main();
