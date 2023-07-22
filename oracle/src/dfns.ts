import { AsymmetricKeySigner } from "@dfns/sdk-keysigner";
import {
  DFNS_API_BASE_URL,
  DFNS_APP_ID,
  DFNS_AUTH_TOKEN,
  DFNS_CRED_ID,
  ORACLE_PRIVATE_KEY,
} from "./env";
import { DfnsApiClient } from "@dfns/sdk";
import { Wallet } from "@dfns/sdk/codegen/datamodel/Wallets";

const keySigner = new AsymmetricKeySigner({
  credId: DFNS_CRED_ID,
  privateKey: ORACLE_PRIVATE_KEY,
  appOrigin: "http://localhost",
});

class DfnsClient {
  public client: DfnsApiClient;

  constructor() {
    this.client = new DfnsApiClient({
      baseUrl: DFNS_API_BASE_URL,
      appId: DFNS_APP_ID,
      authToken: DFNS_AUTH_TOKEN,
      signer: keySigner,
    });
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
}

const DFNS_API_CLIENT = new DfnsClient();

export { DFNS_API_CLIENT };
