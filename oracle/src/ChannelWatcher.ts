import { v4 as uuidv4 } from "uuid";
import { Contract, ContractEventPayload, id } from "ethers";
import * as sigUtil from "@metamask/eth-sig-util";
import * as ethUtil from "ethereumjs-util";
import { TransactionKind } from "@dfns/sdk/codegen/datamodel/Wallets";
import DfnsClient from "./DfnsClient";

export const CHANNEL_TYPE_PRIVATE = 0b100;
export const CHANNEL_TYPE_ANONYMOUS = 0b010;
export const CHANNEL_TYPE_JOINABLE = 0b001;

// event MemberJoined(address indexed member, string cypertext);
const EVENT = id("MemberJoined(address,string)");

export class ChannelWatcher {
  private contract: Contract;
  private uuid: string;
  private dfnsClient: DfnsClient;

  constructor(contract: Contract, dfnsClient: DfnsClient) {
    this.contract = contract;
    this.uuid = uuidv4();
    this.dfnsClient = dfnsClient;
  }

  private async addNewMember(event: ContractEventPayload) {
    const params: { member: string; pubKey: string } = {
      member: event.args[0],
      pubKey: event.args[1],
    };

    const result = sigUtil.encrypt({
      publicKey: params.pubKey,
      data: this.uuid,
      version: "x25519-xsalsa20-poly1305",
    });

    const encData = ethUtil.bufferToHex(Buffer.from(JSON.stringify(result), "utf8"));

    const wallet = await this.dfnsClient.getWallet();
    const to = await this.contract.getAddress();
    const txData = this.contract.interface.encodeFunctionData("postCreds(address,string)", [params.member, encData]);

    try {
      await this.dfnsClient.client.wallets.broadcastTransaction({
        body: { kind: TransactionKind.Evm, data: txData, to: to },
        walletId: wallet.id,
      });
    } catch (e) {
      console.error(e);
    }

    console.log(`Channel ${this.uuid} has a new member: ${params.member}, pubkey: ${params.pubKey}`);
  }

  public async listenAndRegisterNewMember() {
    await this.contract.addListener(EVENT, (event) => this.addNewMember(event));
  }
}
