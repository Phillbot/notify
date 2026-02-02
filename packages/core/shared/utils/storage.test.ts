import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { saveToStorage, getFromStorage, removeFromStorage, clearStorage } from "./storage";

describe("storage utils", () => {
  const mockLocalStorage = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => (store[key] = value)),
      removeItem: vi.fn((key: string) => delete store[key]),
      clear: vi.fn(() => (store = {})),
    };
  })();

  beforeEach(() => {
    vi.stubGlobal("window", {});
    vi.stubGlobal("localStorage", mockLocalStorage);
    mockLocalStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("saveToStorage should save a value as JSON", () => {
    saveToStorage("testKey", { foo: "bar" });
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("testKey", '{"foo":"bar"}');
  });

  it("getFromStorage should retrieve and parse a value", () => {
    mockLocalStorage.setItem("testKey", '{"foo":"bar"}');
    const result = getFromStorage("testKey");
    expect(result).toEqual({ foo: "bar" });
  });

  it("getFromStorage should return null if key doesn't exist", () => {
    const result = getFromStorage("missing");
    expect(result).toBeNull();
  });

  it("getFromStorage should return null if parsing fails", () => {
    mockLocalStorage.setItem("invalid", "not-json");
    const result = getFromStorage("invalid");
    expect(result).toBeNull();
  });

  it("removeFromStorage should remove the key", () => {
    removeFromStorage("testKey");
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("testKey");
  });

  it("clearStorage should clear all keys", () => {
    clearStorage();
    expect(mockLocalStorage.clear).toHaveBeenCalled();
  });

  describe("SSR / non-browser environment", () => {
    beforeEach(() => {
      vi.stubGlobal("window", undefined);
    });

    it("should do nothing when window is undefined", () => {
      saveToStorage("k", "v");
      expect(getFromStorage("k")).toBeNull();
      removeFromStorage("k");
      clearStorage();
      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    });
  });
});
