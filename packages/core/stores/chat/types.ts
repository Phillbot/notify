import { createValueToken } from "~core/di";

export interface ChatMessage {
  from: string;
  text: string;
  senderId?: string;
  userId?: string; // Stable user ID
  roomId?: string;
}

export interface UserOnline {
  id: string; // Stable userId
  userName: string;
  socketId: string;
}

export const IChatTransport = createValueToken("IChatTransport");

export interface IChatTransport {
  connect(url: string): void;
  disconnect(): void;
  send(data: string): void;
  emit<T = any>(event: string, data: T): void;
  onEvent<T = any>(event: string, callback: (data: T) => void): void;
  onStateChange(callback: () => void): void;
  get isConnected(): boolean;
}

export interface JoinRoomPayload {
  roomId: string;
}

export interface MessagePayload {
  from: string;
  text: string;
  senderId?: string;
  userId?: string; // Stable user ID
  roomId?: string;
  userName?: string; // For sending
}

export const IChatStore = createValueToken("IChatStore");

export interface IChatStore {
  readonly messages: ChatMessage[];
  readonly onlineUsers: UserOnline[];
  readonly isConnected: boolean;
  readonly userName: string;
  readonly userId: string;
  readonly connectionUrl: string;
  readonly currentRoomId: string;
  readonly unreadCounts: Map<string, number>;
  connect(url: string): void;
  disconnect(): void;
  setUserName(name: string): void;
  setCurrentRoom(roomId: string): void;
  sendMessage(text: string): void;
}
