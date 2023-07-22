import { Contract, ContractEventPayload, WebSocketProvider, id } from "ethers";
import { ChannelWatcher } from "./ChannelWatcher";
import { BasicChannelABI } from "../abi";
import DfnsClient from "./DfnsClient";

export const CHANNEL_TYPE_PRIVATE = 0b100;
export const CHANNEL_TYPE_ANONYMOUS = 0b010;
export const CHANNEL_TYPE_JOINABLE = 0b001;

// event ChannelRegistered(uint256 id, bytes1 _type, address channelAddress);
const EVENT = id("ChannelRegistered(uint256,bytes1,address)");

class ChannelsWatcher {
  private watchedChannels: ChannelWatcher[] = [];
  private contract: Contract;
  private provider: WebSocketProvider;
  private dfnsClient: DfnsClient;

  constructor(contract: Contract, provider: WebSocketProvider, dfnsClient: DfnsClient) {
    this.contract = contract;
    this.provider = provider;
    this.dfnsClient = dfnsClient;
  }

  private addNewChannel(channelAddress: string) {
    const channelWatcher = new ChannelWatcher(
      new Contract(channelAddress, BasicChannelABI, this.provider),
      this.dfnsClient
    );
    channelWatcher.listenAndRegisterNewMember();
    this.watchedChannels.push(channelWatcher);
  }

  private handleChannelRegistration(event: ContractEventPayload) {
    const params: { id: bigint; type: number; channelAddress: string } = {
      id: event.args[0],
      type: parseInt(event.args[1].replace("0x", ""), 16),
      channelAddress: event.args[2],
    };

    if (params.type & CHANNEL_TYPE_PRIVATE) {
      this.addNewChannel(params.channelAddress);
    }
  }

  public async registerOldChannels() {
    const events = await this.contract.queryFilter(EVENT, 0, "latest");

    for (let i = 0; i < events.length; i++) {
      this.handleChannelRegistration(events[i] as unknown as ContractEventPayload);
    }

    console.log("Registered old channels:")
    console.log(this.watchedChannels)
  }

  public async listenAndRegisterNewChannels() {
    await this.contract.addListener(EVENT, (event) => {
      this.handleChannelRegistration(event);
    });
  }

  public getChannels() {
    return this.watchedChannels;
  }
}

export default ChannelsWatcher;
