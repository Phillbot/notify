import { describe, it, expect, vi, beforeEach } from "vitest";
import { runInAction } from "mobx";

import { ChatStore } from "./chat.store";
import { MessagePayload, UserOnline } from "./types";

describe("ChatStore", () => {
  let transport: any;
  let storage: any;
  let store: ChatStore;

  beforeEach(() => {
    transport = {
      isConnected: false,
      onStateChange: vi.fn(),
      onEvent: vi.fn(),
      connect: vi.fn(),
      disconnect: vi.fn(),
      emit: vi.fn(),
    };

    storage = {
      getItem: vi.fn().mockResolvedValue("existing-id"),
      setItem: vi.fn().mockResolvedValue(undefined),
    };

    store = new ChatStore(transport, storage);
  });

  it("should initialize with default values", () => {
    expect(store.messages).toEqual([]);
    expect(store.onlineUsers).toEqual([]);
    expect(store.isConnected).toBe(false);
  });

  it("should restore userId from storage", async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(storage.getItem).toHaveBeenCalledWith("chat_user_id");
    expect(store.userId).toBe("existing-id");
  });

  it("should generate and save userId if not found", async () => {
    storage.getItem.mockResolvedValue(null);
    store = new ChatStore(transport, storage);

    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(store.userId).toHaveLength(36);
    expect(storage.setItem).toHaveBeenCalledWith("chat_user_id", store.userId);
  });

  it("should set user name and emit joinRoom if connected", () => {
    transport.isConnected = true;
    runInAction(() => {
      (store as any)._isConnected = true;
    });

    store.setUserName("Alice");
    expect(store.userName).toBe("Alice");
    expect(transport.emit).toHaveBeenCalledWith(
      "joinRoom",
      expect.objectContaining({
        userName: "Alice",
      })
    );
  });

  it("should handle incoming messages", () => {
    const onEventCalls = transport.onEvent.mock.calls;
    const messageHandler = onEventCalls.find((call: any) => call[0] === "message")[1];

    const payload: MessagePayload = {
      text: "Hello",
      from: "Bob",
      roomId: "global",
      userId: "123",
      senderId: "456",
    };

    messageHandler(payload);
    expect(store.messages).toHaveLength(1);
    expect(store.messages[0].text).toBe("Hello");
  });

  it("should increment unread count for other rooms", () => {
    const onEventCalls = transport.onEvent.mock.calls;
    const messageHandler = onEventCalls.find((call: any) => call[0] === "message")[1];

    messageHandler({ text: "Hi", roomId: "other" } as MessagePayload);
    expect(store.messages).toHaveLength(0);
    expect(store.unreadCounts.get("other")).toBe(1);
  });

  it("should clear messages and unread count when switching rooms", () => {
    runInAction(() => {
      store.unreadCounts.set("new-room", 5);
    });

    store.setCurrentRoom("new-room");
    expect(store.currentRoomId).toBe("new-room");
    expect(store.messages).toHaveLength(0);
    expect(store.unreadCounts.get("new-room")).toBe(0);
  });

  it("should handle user online updates", () => {
    const onEventCalls = transport.onEvent.mock.calls;
    const usersHandler = onEventCalls.find((call: any) => call[0] === "users")[1];

    const users: UserOnline[] = [{ id: "1", userName: "Alice", socketId: "s1" }];
    usersHandler(users);

    expect(store.onlineUsers).toEqual(users);
  });

  it("should handle history messages", () => {
    const onEventCalls = transport.onEvent.mock.calls;
    const historyHandler = onEventCalls.find((call: any) => call[0] === "history")[1];

    const history: MessagePayload[] = [
      { text: "Old", from: "System", roomId: "global", userId: "sys" },
    ];
    historyHandler(history);

    expect(store.messages).toHaveLength(1);
    expect(store.messages[0].text).toBe("Old");
  });

  it("should connect to transport", () => {
    store.connect("http://localhost:3000");
    expect(transport.connect).toHaveBeenCalledWith("http://localhost:3000");
  });

  it("should disconnect from transport", () => {
    store.disconnect();
    expect(transport.disconnect).toHaveBeenCalled();
  });

  it("should send message if connected", () => {
    transport.isConnected = true;
    runInAction(() => {
      (store as any)._isConnected = true;
    });

    store.sendMessage("Test message");
    expect(transport.emit).toHaveBeenCalledWith(
      "message",
      expect.objectContaining({
        text: "Test message",
      })
    );
  });

  it("should update connection state and join room on reconnect", () => {
    transport.isConnected = true;
    const stateChangeCallback = transport.onStateChange.mock.calls[0][0];
    stateChangeCallback();

    expect(store.isConnected).toBe(true);
    expect(transport.emit).toHaveBeenCalledWith(
      "joinRoom",
      expect.objectContaining({
        roomId: store.currentRoomId,
      })
    );
  });
});
