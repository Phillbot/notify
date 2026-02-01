import { createValueToken } from "~core/di";

export interface ChatMessage {
  from: string;
  text: string;
  senderId?: string;
}

export const IChatTransport = createValueToken("IChatTransport");

export interface IChatTransport {
  connect(url: string): void;
  disconnect(): void;
  send(data: string): void;
  onMessage(callback: (data: string) => void): void;
  onStateChange(callback: () => void): void;
  get isConnected(): boolean;
}

export const IChatStore = createValueToken("IChatStore");

export interface IChatStore {
  readonly messages: ChatMessage[];
  readonly isConnected: boolean;
  readonly userName: string;
  readonly connectionUrl: string;
  connect(url: string): void;
  disconnect(): void;
  setUserName(name: string): void;
  sendMessage(text: string): void;
}
