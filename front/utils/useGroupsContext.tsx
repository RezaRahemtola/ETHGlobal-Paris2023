"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, createContext, PropsWithChildren, useContext } from "react";

import { Group } from "@/types/group";

interface GroupContextData {
	groups: Array<Group>;
	setGroups: (groups: Array<Group>) => void;
}

const GroupsContext = createContext<GroupContextData>(null as unknown as GroupContextData);

export const GroupsContextProvider = ({ children }: PropsWithChildren) => {
	const [groups, setGroups] = useState<Array<Group>>([]);

	return (
		<GroupsContext.Provider
			value={{
				groups,
				setGroups,
			}}
		>
			{children}
		</GroupsContext.Provider>
	);
};

export const useGroupsContext = () => {
	const context = useContext(GroupsContext);
	if (context === undefined) {
		throw new Error('useUserContext must be used within a "UserContextProvider"');
	}
	return context;
};
