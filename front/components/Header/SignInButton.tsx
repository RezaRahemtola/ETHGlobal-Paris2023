import { useUserContext } from "@/utils/useUserContext";
import React from "react";

export default function SignInButton() {
	const { metamask } = useUserContext();
	const buttonStyle =
		"ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9";

	return (
		<a onClick={metamask.connectMetaMask} className={buttonStyle} href="/login">
			{metamask.isLoggedIn ? `${metamask.wallet.accounts[0].substring(0, 8)}...` : "Sign in"}
		</a>
	);
}
