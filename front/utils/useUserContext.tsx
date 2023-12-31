"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, createContext, PropsWithChildren, useContext, useCallback, useMemo } from "react";
import secureLocalStorage from "react-secure-storage";

import detectEthereumProvider from "@metamask/detect-provider";
import { Identity } from "@semaphore-protocol/identity";

interface WalletState {
	accounts: any[];
	chainId: string;
}

interface MetaMaskContextData {
	wallet: WalletState;
	hasProvider: boolean | null;
	error: boolean;
	errorMessage: string;
	isConnecting: boolean;
	connectMetaMask: () => void;
	clearError: () => void;
	isLoggedIn: boolean;
}

interface SemaphoreContextData {
	identity: Identity | null;
	setIdentity: (identity: string | null) => void;
	isLoggedIn: boolean;
}

interface UserContextData {
	metamask: MetaMaskContextData;
	semaphore: SemaphoreContextData;
}

const disconnectedState: WalletState = { accounts: [], chainId: "" };

const UserContext = createContext<UserContextData>(null as unknown as UserContextData);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
	const [hasProvider, setHasProvider] = useState<boolean | null>(null);

	const [isConnecting, setIsConnecting] = useState(false);

	const [errorMessage, setErrorMessage] = useState("");
	const clearError = () => setErrorMessage("");

	const [serializedIdentity, setSerializedIdentity] = useState<string | null>(
		secureLocalStorage.getItem("semaphore-identity") as string | null,
	);

	const [wallet, setWallet] = useState(disconnectedState);
	// useCallback ensures that we don't uselessly re-create the _updateWallet function on every render
	const _updateWallet = useCallback(async (providedAccounts?: any) => {
		const accounts = providedAccounts || (await window.ethereum.request({ method: "eth_accounts" }));

		if (accounts.length === 0) {
			// If there are no accounts, then the user is disconnected
			setWallet(disconnectedState);
			return;
		}

		const chainId = await window.ethereum.request({
			method: "eth_chainId",
		});

		setWallet({ accounts, chainId: chainId as string });
	}, []);

	const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet]);
	const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet]);

	/**
	 * This logic checks if MetaMask is installed. If it is, then we setup some
	 * event handlers to update the wallet state when MetaMask changes. The function
	 * returned from useEffect is used as a "clean-up": in there, we remove the event
	 * handlers whenever the MetaMaskProvider is unmounted.
	 */
	useEffect(() => {
		const getProvider = async () => {
			const provider = await detectEthereumProvider({ silent: true });
			setHasProvider(Boolean(provider));

			if (provider) {
				updateWalletAndAccounts();
				window.ethereum.on("accountsChanged", updateWallet);
				window.ethereum.on("chainChanged", updateWalletAndAccounts);
			}
		};

		getProvider();

		return () => {
			window.ethereum?.removeListener("accountsChanged", updateWallet);
			window.ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
		};
	}, [updateWallet, updateWalletAndAccounts]);

	const connectMetaMask = async () => {
		setIsConnecting(true);

		try {
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			clearError();
			updateWallet(accounts);
		} catch (err: any) {
			setErrorMessage(err.message);
		}
		setIsConnecting(false);
	};

	const isLoggedToMetamask = useMemo<boolean>(() => wallet.accounts.length > 0, [wallet]);

	const identity = useMemo<Identity | null>(() => {
		if (serializedIdentity === null) {
			return null;
		}
		return new Identity(serializedIdentity);
	}, [serializedIdentity]);

	return (
		<UserContext.Provider
			value={{
				metamask: {
					wallet,
					hasProvider,
					error: !!errorMessage,
					errorMessage,
					isConnecting,
					connectMetaMask,
					clearError,
					isLoggedIn: isLoggedToMetamask,
				},
				semaphore: {
					identity,
					setIdentity: setSerializedIdentity,
					isLoggedIn: identity !== null,
				},
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUserContext must be used within a "UserContextProvider"');
	}
	return context;
};
