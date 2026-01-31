import { injectable } from "inversify";

import { IChatTransport } from "~core/stores/chat";

@injectable()
export class WebSocketTransport implements IChatTransport {
  private _socket: WebSocket | null = null;
  private _messageCallback: ((data: string) => void) | null = null;
  private _stateChangeCallback: (() => void) | null = null;

  get isConnected(): boolean {
    return this._socket?.readyState === WebSocket.OPEN;
  }

  connect(url: string): void {
    if (this._socket && (this._socket.readyState === WebSocket.OPEN || this._socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this._socket = new WebSocket(url);

    this._socket.addEventListener("open", () => {
      console.log("🟢 WebSocket connected");
      this._stateChangeCallback?.();
    });

    this._socket.addEventListener("message", (event) => {
      if (this._messageCallback) {
        this._messageCallback(event.data);
      }
    });

    this._socket.addEventListener("error", (event) => {
      console.error("❗WebSocket error:", event);
      this._stateChangeCallback?.();
    });

    this._socket.addEventListener("close", (event) => {
      console.warn("🔌 WebSocket closed:", event.code, event.reason);
      this._stateChangeCallback?.();
    });
  }

  disconnect(): void {
    this._socket?.close();
    this._socket = null;
    this._stateChangeCallback?.();
  }

  send(data: string): void {
    if (this.isConnected) {
      this._socket?.send(data);
    }
  }

  onMessage(callback: (data: string) => void): void {
    this._messageCallback = callback;
  }

  onStateChange(callback: () => void): void {
    this._stateChangeCallback = callback;
  }
}
