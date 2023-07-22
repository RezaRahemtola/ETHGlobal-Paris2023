import { get } from "env-var";

const env = (name: string, required = true) => get(name).required(required);

export const PINATA_API_KEY = env("NEXT_PUBLIC_PINATA_API_KEY").asString();
export const PINATA_API_SECRET = env("NEXT_PUBLIC_PINATA_API_SECRET").asString();
