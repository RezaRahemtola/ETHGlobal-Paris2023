"use client";

import { ThemeProvider } from "next-themes";
import { MetaMaskContextProvider } from "@/utils/useMetaMask";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
			<MetaMaskContextProvider>{children}</MetaMaskContextProvider>
		</ThemeProvider>
	);
}
