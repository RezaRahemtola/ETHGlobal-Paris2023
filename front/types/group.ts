export enum GroupAccess {
	PRIVATE,
	PUBLIC,
}

export interface Group {
	id: string;
	title: string;
	access: GroupAccess;
	semaphore: boolean;
}
