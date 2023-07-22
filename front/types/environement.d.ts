declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_PINATA_API_KEY: string;
			NEXT_PUBLIC_PINATA_API_SECRET: string;
			NEXT_PUBLIC_CONTRACT_ADDRESS: string;
			NEXT_PUBLIC_APP_NAME: string;
		}
	}
}
export {};
