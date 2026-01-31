import { inject, injectable } from "inversify";
import { action, computed, makeObservable, observable } from "mobx";

import { ChatMessage, IChatStore, IChatTransport } from "./types";

@injectable()
export class ChatStore implements IChatStore {
  @observable
  private _messages: ChatMessage[] = [];

  @observable
  private _isConnected = false;

  constructor(
    @inject(IChatTransport.$)
    private readonly _transport: IChatTransport
  ) {
    makeObservable(this);

    this._transport.onStateChange(() => {
      this.updateConnectionState();
    });
  }

  @computed
  get messages(): ChatMessage[] {
    return this._messages;
  }

  @computed
  get isConnected(): boolean {
    return this._isConnected;
  }

  @action
  private updateConnectionState(): void {
    this._isConnected = this._transport.isConnected;
  }

  @action
  connect(url: string): void {
    if (this.isConnected) {
      console.log("ℹ️ ChatStore is already connected, skipping...");
      return;
    }

    this._transport.connect(url);

    this._transport.onMessage((data) => {
      try {
        const parsed = JSON.parse(data);
        if (typeof parsed?.text === "string") {
          this.addMessage({
            from: parsed.from || "unknown",
            text: parsed.text,
            senderId: parsed.senderId,
          });
        }
      } catch {
        // TODO: handle parse errors
      }
    });

    // Initial state check
    this.updateConnectionState();
  }

  @action
  disconnect(): void {
    this._transport.disconnect();
    this.updateConnectionState();
  }

  @action
  sendMessage(text: string): void {
    if (this.isConnected && text.trim()) {
      this._transport.send(JSON.stringify({ text }));
      // We don't add local message anymore,
      // we wait for the server to broadcast it back.
    }
  }

  @action
  private addMessage(message: ChatMessage): void {
    this._messages.push(message);
  }
}
