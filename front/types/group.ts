export enum GroupAccess {
  PRIVATE,
  JOINABLE
};

export interface Group {
  title: string,
  access: GroupAccess,
  semaphore: boolean
};
