import { io, Socket } from "socket.io-client";
import { injectable } from "inversify";

import { IChatTransport } from "~core/stores/chat";

/**
 * React Native WebSocket transport implementation using Socket.io.
 */
@injectable()
export class RNWebSocketTransport implements IChatTransport {
  private _socket: Socket | null = null;
  private _messageCallback: ((data: string) => void) | null = null;
  private _stateChangeCallback: (() => void) | null = null;

  get isConnected(): boolean {
    return this._socket?.connected ?? false;
  }

  connect(url: string): void {
    if (this._socket) {
      if (this._socket.connected) return;
      this._socket.connect();
      return;
    }

    // Transform ws:// to http://
    const socketUrl = url.replace(/^ws/, "http");

    this._socket = io(socketUrl, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    this._socket.on("connect", () => {
      console.log("🟢 [RN] Socket.io connected:", this._socket?.id);
      this._stateChangeCallback?.();
    });

    this._socket.on("disconnect", (reason) => {
      console.warn("🔌 [RN] Socket.io disconnected:", reason);
      this._stateChangeCallback?.();
    });

    this._socket.on("connect_error", (error) => {
      console.error("❗ [RN] Socket.io error:", error);
      this._stateChangeCallback?.();
    });

    this._socket.on("message", (data) => {
      if (this._messageCallback) {
        const payload = typeof data === "string" ? data : JSON.stringify(data);
        this._messageCallback(payload);
      }
    });

    this._socket.on("history", (data) => {
      if (this._messageCallback && Array.isArray(data)) {
        data.forEach(msg => {
          this._messageCallback!(JSON.stringify(msg));
        });
      }
    });
  }

  disconnect(): void {
    this._socket?.disconnect();
    this._socket = null;
    this._stateChangeCallback?.();
  }

  send(data: string): void {
    if (this.isConnected) {
      try {
        const parsed = JSON.parse(data);
        this._socket?.emit("message", parsed);
      } catch {
        this._socket?.emit("message", data);
      }
    }
  }

  onMessage(callback: (data: string) => void): void {
    this._messageCallback = callback;
  }

  onStateChange(callback: () => void): void {
    this._stateChangeCallback = callback;
  }
}
