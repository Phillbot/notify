import { io, Socket } from "socket.io-client";
import { injectable } from "inversify";

import { IChatTransport } from "~core/stores/chat";

/**
 * React Native WebSocket transport implementation using Socket.io.
 */
@injectable()
export class RNWebSocketTransport implements IChatTransport {
  private _socket: Socket | null = null;
  private _stateChangeCallback: (() => void) | null = null;
  private _eventListeners = new Map<string, Array<(data: any) => void>>();

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
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    // Apply queued listeners
    this._eventListeners.forEach((callbacks, event) => {
      callbacks.forEach(cb => this._socket?.on(event, cb));
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

  onEvent<T = any>(event: string, callback: (data: T) => void): void {
    if (!this._eventListeners.has(event)) {
      this._eventListeners.set(event, []);
    }
    this._eventListeners.get(event)?.push(callback);

    this._socket?.on(event, callback);
  }

  onStateChange(callback: () => void): void {
    this._stateChangeCallback = callback;
  }

  emit<T = any>(event: string, data: T): void {
    if (this.isConnected) {
      this._socket?.emit(event, data);
    }
  }
}
