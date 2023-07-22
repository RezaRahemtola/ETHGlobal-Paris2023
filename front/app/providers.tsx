"use client";

import { ThemeProvider } from "next-themes";
import { MetaMaskContextProvider } from "@/utils/useMetaMask";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
			<MetaMaskContextProvider>{children}</MetaMaskContextProvider>
		</ThemeProvider>
	);
}
