export enum MessageType {
  TEXT,
  IMAGE
}

export interface Message {
  value: string
  type: MessageType
  owned: boolean
  address: string
}
