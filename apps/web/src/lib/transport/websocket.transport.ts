import { io, Socket } from "socket.io-client";
import { injectable } from "inversify";

import { IChatTransport } from "~core/stores/chat";

@injectable()
export class WebSocketTransport implements IChatTransport {
  private _socket: Socket | null = null;
  private _stateChangeCallback: (() => void) | null = null;
  private _isUnloading = false;
  private _eventListeners = new Map<string, Array<(data: any) => void>>();

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

    // Apply queued listeners
    this._eventListeners.forEach((callbacks, event) => {
      callbacks.forEach((cb) => this._socket?.on(event, cb));
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

    // If socket already exists, subscribe immediately
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
