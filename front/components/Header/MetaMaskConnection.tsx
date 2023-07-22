import { useUserContext } from "@/utils/useUserContext";
import React from "react";
import Link from "next/link";

const MetaMaskConnection = () => {
	const { metamask } = useUserContext();
	const buttonStyle =
		"ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9";

	if (!metamask.hasProvider) {
		return (
			<Link href="https://metamask.io" className={buttonStyle}>
				Install Metamask
			</Link>
		);
	}

	if (window.ethereum?.isMetaMask && metamask.wallet.accounts.length < 1) {
		return (
			<button disabled={metamask.isConnecting} onClick={metamask.connectMetaMask} className={buttonStyle}>
				Connect MetaMask
			</button>
		);
	}

	return (
		<button disabled className={buttonStyle}>
			{metamask.wallet.accounts[0].substring(0, 8)}...
		</button>
	);
};

export default MetaMaskConnection;
