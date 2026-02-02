import { inject, injectable } from "inversify";
import { action, computed, makeObservable, observable, runInAction } from "mobx";

import { ChatMessage, IChatStore, IChatTransport, MessagePayload, UserOnline } from "./types";
import { IStorageService } from "../../shared/storage";
import { generateUUID } from "../../shared/utils/uuid";

const USER_ID_KEY = "chat_user_id";

@injectable()
export class ChatStore implements IChatStore {
  @observable
  private _messages: ChatMessage[] = [];

  @observable
  private _onlineUsers: UserOnline[] = [];

  @observable
  private _isConnected = false;

  @observable
  private _userName = "";

  @observable
  private _userId = "";

  @observable
  private _connectionUrl = "";

  @observable
  private _currentRoomId = "global";

  @observable
  public unreadCounts = new Map<string, number>();

  constructor(
    @inject(IChatTransport.$)
    private readonly _transport: IChatTransport,
    @inject(IStorageService.$)
    private readonly _storageService: IStorageService
  ) {
    makeObservable(this);

    this.restoreUserId();

    this._transport.onStateChange(() => {
      this.updateConnectionState();
    });

    // Listen for named events from Socket.io
    this._transport.onEvent<MessagePayload>("message", (parsed) => {
      if (typeof parsed?.text === "string") {
        this.addMessage({
          from: parsed.from || "unknown",
          text: parsed.text,
          senderId: parsed.senderId,
          userId: parsed.userId,
          roomId: parsed.roomId,
        });
      }
    });

    this._transport.onEvent<MessagePayload[]>("history", (history) => {
      if (Array.isArray(history)) {
        action(() => {
          this._messages = history.map((msg) => ({
            from: msg.from || "unknown",
            text: msg.text,
            senderId: msg.senderId,
            userId: msg.userId,
            roomId: msg.roomId,
          }));
        })();
      }
    });

    this._transport.onEvent<UserOnline[]>("users", (users) => {
      if (Array.isArray(users)) {
        runInAction(() => {
          this._onlineUsers = users;
        });
      }
    });
  }

  private async restoreUserId(): Promise<void> {
    try {
      let id = await this._storageService.getItem(USER_ID_KEY);
      if (!id) {
        id = generateUUID();
        await this._storageService.setItem(USER_ID_KEY, id);
      }
      runInAction(() => {
        this._userId = id!;
      });
    } catch (error) {
      console.warn("Failed to restore userId", error);
    }
  }

  @computed
  get messages(): ChatMessage[] {
    return this._messages;
  }

  @computed
  get onlineUsers(): UserOnline[] {
    return this._onlineUsers;
  }

  @computed
  get isConnected(): boolean {
    return this._isConnected;
  }

  @computed
  get userName(): string {
    return this._userName;
  }

  @computed
  get userId(): string {
    return this._userId;
  }

  @computed
  get connectionUrl(): string {
    return this._connectionUrl;
  }

  @computed
  get currentRoomId(): string {
    return this._currentRoomId;
  }

  @action
  setUserName(name: string): void {
    this._userName = name;
    // On reconnect or name change, we should notify the server
    if (this._isConnected) {
      this._transport.emit("joinRoom", {
        roomId: this._currentRoomId,
        userId: this._userId,
        userName: name,
      });
    }
  }

  @action
  setCurrentRoom(roomId: string): void {
    if (this._currentRoomId === roomId) return;

    this._currentRoomId = roomId;
    this._messages = []; // Clear current chat
    this.unreadCounts.set(roomId, 0); // Clear unread count when entering room

    if (this._isConnected) {
      this._transport.emit("joinRoom", {
        roomId,
        userId: this._userId,
        userName: this._userName,
      });
    }
  }

  @action
  private updateConnectionState(): void {
    const wasConnected = this._isConnected;
    this._isConnected = this._transport.isConnected;

    // If we just reconnected, ensure we are in the right room
    if (!wasConnected && this._isConnected) {
      this._transport.emit("joinRoom", {
        roomId: this._currentRoomId,
        userId: this._userId,
        userName: this._userName,
      });
    }
  }

  @action
  connect(url: string): void {
    if (this.isConnected) {
      console.log("ℹ️ ChatStore is already connected, skipping...");
      return;
    }

    this._connectionUrl = url;
    this._transport.connect(url);

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
      const payload: MessagePayload = {
        text,
        userName: this.userName || undefined,
        userId: this.userId,
        roomId: this.currentRoomId,
        from: this.userName || "anonymous",
      };
      // For socket.io we use emit "message" with object
      this._transport.emit("message", payload);
    }
  }

  @action
  private addMessage(message: ChatMessage): void {
    // Only add if it belongs to current room
    if (message.roomId === this._currentRoomId) {
      this._messages.push(message);
    } else if (message.roomId) {
      // Increment unread count for background rooms
      const current = this.unreadCounts.get(message.roomId) || 0;
      this.unreadCounts.set(message.roomId, current + 1);
    }
  }
}
