import * as dotenv from "dotenv";

dotenv.config();

const env = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

export const DFNS_APP_ID = env("DFNS_APP_ID");
export const DFNS_AUTH_TOKEN = env("DFNS_AUTH_TOKEN");
export const DFNS_API_BASE_URL = env("DFNS_API_BASE_URL");
export const ORACLE_PRIVATE_KEY = env("ORACLE_PRIVATE_KEY");
export const DFNS_CRED_ID = env("DFNS_CRED_ID");
export const QUICKNODE_RPC_URL = env("QUICKNODE_RPC_URL");
export const GOERLI_CONTRACT_ADDRESS = env("GOERLI_CONTRACT_ADDRESS");
