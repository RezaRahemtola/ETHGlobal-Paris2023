"use client";

import { ThemeProvider } from "next-themes";
import { UserContextProvider } from "@/utils/useUserContext";
import { ReactNode } from "react";
import { GroupsContextProvider } from "@/utils/useGroupsContext";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
			<UserContextProvider>
				<GroupsContextProvider>
					{children}
					<div id="modal-root" />
				</GroupsContextProvider>
			</UserContextProvider>
		</ThemeProvider>
	);
}
