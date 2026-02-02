import { describe, it, expect, vi } from "vitest";

import { getEnv, isDev, isProd, isTest, getEnvVar, assertEnvVar } from "./env";

describe("env utils", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.stubGlobal("process", { ...process, env: { ...originalEnv } });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("getEnv", () => {
    it("should return development by default", () => {
      process.env.NODE_ENV = "";
      expect(getEnv()).toBe("development");
    });

    it("should return the current NODE_ENV", () => {
      process.env.NODE_ENV = "production";
      expect(getEnv()).toBe("production");
    });
  });

  describe("predicates", () => {
    it("isDev should work correctly", () => {
      process.env.NODE_ENV = "development";
      expect(isDev()).toBe(true);
      process.env.NODE_ENV = "production";
      expect(isDev()).toBe(false);
    });

    it("isProd should work correctly", () => {
      process.env.NODE_ENV = "production";
      expect(isProd()).toBe(true);
      process.env.NODE_ENV = "development";
      expect(isProd()).toBe(false);
    });

    it("isTest should work correctly", () => {
      process.env.NODE_ENV = "test";
      expect(isTest()).toBe(true);
      process.env.NODE_ENV = "development";
      expect(isTest()).toBe(false);
    });
  });

  describe("getEnvVar", () => {
    it("should return the value of an env var", () => {
      process.env.FOO = "bar";
      expect(getEnvVar("FOO")).toBe("bar");
    });

    it("should return fallback if var is missing", () => {
      expect(getEnvVar("MISSING", "fallback")).toBe("fallback");
    });
  });

  describe("assertEnvVar", () => {
    it("should return the value if it exists", () => {
      process.env.REQUIRED = "present";
      expect(assertEnvVar("REQUIRED")).toBe("present");
    });

    it("should throw if the value is missing", () => {
      expect(() => assertEnvVar("NOT_HERE")).toThrow(
        "Missing required environment variable: NOT_HERE"
      );
    });
  });
});
