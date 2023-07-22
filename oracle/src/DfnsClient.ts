import { AsymmetricKeySigner } from "@dfns/sdk-keysigner";
import { DFNS_API_BASE_URL, DFNS_APP_ID, DFNS_AUTH_TOKEN, DFNS_CRED_ID, ORACLE_PRIVATE_KEY } from "./env";
import { DfnsApiClient } from "@dfns/sdk";
import { BlockchainNetwork, Wallet } from "@dfns/sdk/codegen/datamodel/Wallets";

class DfnsClient {
  public client: DfnsApiClient;

  constructor() {
    this.client = new DfnsApiClient({
      baseUrl: DFNS_API_BASE_URL,
      appId: DFNS_APP_ID,
      authToken: DFNS_AUTH_TOKEN,
      signer: new AsymmetricKeySigner({
        credId: DFNS_CRED_ID,
        privateKey: ORACLE_PRIVATE_KEY,
        appOrigin: "http://localhost",
      }),
    });
  }

  public async init() {
    const wallets = await this.client.wallets.listWallets({});

    if (wallets.items.length === 0) {
      const newWallet = await this.createNewWallet();
      console.log("Created new wallet: ", newWallet);
      console.log("Make sure to fund it with some ETH");
    }
  }

  public async getWallet(): Promise<Wallet> {
    const wallets = await this.client.wallets.listWallets({});

    if (wallets.items.length === 0) {
      throw new Error("No wallet found");
    }

    const wallet = await this.client.wallets.getWallet({
      walletId: wallets.items[0].id,
    });

    return wallet;
  }

  public async createNewWallet(): Promise<Wallet> {
    const wallet = await this.client.wallets.createWallet({
      body: { network: BlockchainNetwork.EthereumGoerli },
    });

    return wallet;
  }
}

export default DfnsClient;
