import { get } from "env-var";

const env = (name: string, required = true) => get(name).required(required);

export const PINATA_API_KEY = env("NEXT_PUBLIC_PINATA_API_KEY").asString();
export const PINATA_API_SECRET = env("NEXT_PUBLIC_PINATA_API_SECRET").asString();

export const APP_NAME = env("NEXT_PUBLIC_APP_NAME").asString();
