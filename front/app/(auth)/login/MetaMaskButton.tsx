import { useUserContext } from "@/utils/useUserContext";
import { useMemo } from "react";

export default function MetaMaskButton() {
	const { metamask } = useUserContext();

	const buttonStyle =
		"ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9";
	const metamaskText = useMemo(() => {
		if (!metamask.hasProvider) {
			return "MetaMask not installed";
		} else if (metamask.isConnecting) {
			return "Connecting...";
		} else if (metamask.wallet.accounts.length > 0) {
			return `Connected with address ${metamask.wallet.accounts[0].slice(0, 8)}...`;
		}
		return "Sign in";
	}, [metamask.hasProvider, metamask.isConnecting, metamask.wallet]);

	return (
		<button
			className={buttonStyle}
			disabled={!metamask.hasProvider || metamask.isConnecting || metamask.wallet.accounts.length > 0}
			onClick={() => metamask.connectMetaMask()}
		>
			{metamaskText}
		</button>
	);
}
