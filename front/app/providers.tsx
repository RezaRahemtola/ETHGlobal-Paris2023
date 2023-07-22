"use client";

import { ThemeProvider } from "next-themes";
import {UserContextProvider} from "@/utils/useUserContext";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
			<UserContextProvider>
				{children}
			</UserContextProvider>
		</ThemeProvider>
	);
}
