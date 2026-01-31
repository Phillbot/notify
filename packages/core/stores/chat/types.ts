export interface ChatMessage {
  from: string;
  text: string;
  senderId?: string;
}

export const IChatTransport = {
  $: Symbol.for("IChatTransport"),
};

export interface IChatTransport {
  connect(url: string): void;
  disconnect(): void;
  send(data: string): void;
  onMessage(callback: (data: string) => void): void;
  onStateChange(callback: () => void): void;
  get isConnected(): boolean;
}

export const IChatStore = {
  $: Symbol.for("IChatStore"),
  useClass: class {
    // Placeholder for DI token
  } as any,
};

export interface IChatStore {
  readonly messages: ChatMessage[];
  readonly isConnected: boolean;
  connect(url: string): void;
  disconnect(): void;
  sendMessage(text: string): void;
}
