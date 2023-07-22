"use client";

import { ThemeProvider } from "next-themes";
import { UserContextProvider } from "@/utils/useUserContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
			<UserContextProvider>
				{children}
				<div id="modal-root" />
			</UserContextProvider>
		</ThemeProvider>
	);
}
