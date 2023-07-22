import { useMetaMask } from "@/utils/useMetaMask";
import React from "react";
import Link from "next/link";

export default function MetaMaskConnection() {
	const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
	const buttonStyle = "ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"

	if (!hasProvider) {
		return (
			<Link
				href="https://metamask.io"
				className={buttonStyle}
			>
				Install Metamask
			</Link>
		);
	}

	if (window.ethereum?.isMetaMask && wallet.accounts.length < 1) {
		return (
			<button
				disabled={isConnecting}
				onClick={connectMetaMask}
				className={buttonStyle}
			>
				Connect MetaMask
			</button>
		);
	}

	return (
		<button
			disabled
			className={buttonStyle}
		>
			{wallet.accounts[0].substring(0, 8)}...
		</button>
	);
}
