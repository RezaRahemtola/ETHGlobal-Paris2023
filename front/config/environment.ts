const env = (name: string) => {
	if (!process.env[name]) {
		throw new Error(`Environment variable ${name} is not set`);
	}
	return process.env[name];
};

export const PINATA_API_KEY = env("NEXT_PUBLIC_PINATA_API_KEY");
export const PINATA_API_SECRET = env("NEXT_PUBLIC_PINATA_API_SECRET");

export const CONTRACT_ADDRESS = env("CONTRACT_ADDRESS");

export const APP_NAME = env("NEXT_PUBLIC_APP_NAME");