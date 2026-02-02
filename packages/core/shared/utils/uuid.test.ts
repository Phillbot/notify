import { describe, it, expect, vi } from "vitest";

import { generateUUID, generateNanoId, uniqueId } from "./uuid";

describe("uuid utils", () => {
  describe("generateUUID", () => {
    it("should generate a valid UUID v4 string", () => {
      const uuid = generateUUID();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuid).toMatch(uuidRegex);
    });

    it("should use crypto.randomUUID if available", () => {
      const spy = vi.spyOn(crypto, "randomUUID");
      generateUUID();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it("should fallback to manual generation if crypto.randomUUID is missing", () => {
      const spy = vi.spyOn(Math, "random");
      vi.stubGlobal("crypto", { ...crypto, randomUUID: undefined });

      const uuid = generateUUID();
      expect(uuid).toBeDefined();
      expect(spy).toHaveBeenCalled();

      vi.unstubAllGlobals();
    });
  });

  describe("generateNanoId", () => {
    it("should generate a string of requested length", () => {
      expect(generateNanoId(10)).toHaveLength(10);
      expect(generateNanoId(21)).toHaveLength(21);
      expect(generateNanoId()).toHaveLength(21);
    });

    it("should use crypto.getRandomValues if available", () => {
      const spy = vi.spyOn(crypto, "getRandomValues");
      generateNanoId();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it("should fallback to Math.random if crypto.getRandomValues is missing", () => {
      const spy = vi.spyOn(Math, "random");
      vi.stubGlobal("crypto", { ...crypto, getRandomValues: undefined });

      const id = generateNanoId(10);
      expect(id).toHaveLength(10);
      expect(spy).toHaveBeenCalled();

      vi.unstubAllGlobals();
    });
  });

  describe("uniqueId", () => {
    it("should generate a unique ID with optional prefix", () => {
      expect(uniqueId("user_")).toMatch(/^user_[a-zA-Z0-9]{16}$/);
      expect(uniqueId()).toMatch(/^[a-zA-Z0-9]{16}$/);
    });
  });
});
