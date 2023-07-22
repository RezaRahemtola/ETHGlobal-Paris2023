export enum GroupAccess {
  PRIVATE,
  JOINABLE
}

export interface Group {
  id: string,
  title: string,
  access: GroupAccess,
  semaphore: boolean
}
