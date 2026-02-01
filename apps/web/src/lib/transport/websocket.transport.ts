import { io, Socket } from "socket.io-client";
import { injectable } from "inversify";

import { IChatTransport } from "~core/stores/chat";

@injectable()
export class WebSocketTransport implements IChatTransport {
  private _socket: Socket | null = null;
  private _messageCallback: ((data: string) => void) | null = null;
  private _stateChangeCallback: (() => void) | null = null;
  private _isUnloading = false;

  get isConnected(): boolean {
    return this._socket?.connected ?? false;
  }

  constructor() {
    if (typeof window !== "undefined") {
      const handleUnload = () => {
        this._isUnloading = true;
        this.disconnect();
      };

      window.addEventListener("beforeunload", handleUnload);
      window.addEventListener("pagehide", handleUnload);
      window.addEventListener("unload", handleUnload);
    }
  }

  connect(url: string): void {
    if (this._isUnloading) return;

    if (this._socket) {
      if (this._socket.connected) return;
      this._socket.connect();
      return;
    }

    // Transform ws:// to http:// if needed, though io() handles many formats
    const socketUrl = url.replace(/^ws/, "http");

    this._socket = io(socketUrl, {
      transports: ["polling", "websocket"], // Let it start with polling (compatible) and upgrade to ws
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this._socket.on("connect", () => {
      console.log("🟢 Socket.io connected:", this._socket?.id);
      this._stateChangeCallback?.();
    });

    this._socket.on("disconnect", (reason) => {
      console.warn("🔌 Socket.io disconnected:", reason);
      this._stateChangeCallback?.();
    });

    this._socket.on("connect_error", (error) => {
      console.error("❗Socket.io connection error:", error);
      this._stateChangeCallback?.();
    });

    this._socket.on("message", (data) => {
      if (this._messageCallback) {
        // Socket.io sends already parsed objects usually,
        // but our store expects string to parse it itself (as per previous logic)
        // Let's stringify if it's an object to keep store logic unchanged for now
        const payload = typeof data === "string" ? data : JSON.stringify(data);
        this._messageCallback(payload);
      }
    });

    // Special event for history
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
