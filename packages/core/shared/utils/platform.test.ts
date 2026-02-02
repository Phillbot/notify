import { describe, it, expect, vi, afterEach } from "vitest";

// Mock handy-ts-tools before importing platform
vi.mock("handy-ts-tools", () => ({
  isBrowser: () => true,
}));

import {
  isMobile,
  isTablet,
  isIOS,
  isIPhone,
  isIPad,
  isAndroid,
  isWindows,
  isMacOS,
  isLinux,
} from "./platform";

describe("platform utils", () => {
  const setUA = (ua: string) => {
    vi.stubGlobal("navigator", { userAgent: ua });
  };

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("isMobile", () => {
    it("should identify iPhone", () => {
      setUA(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
      );
      expect(isMobile()).toBe(true);
      expect(isIPhone()).toBe(true);
      expect(isIOS()).toBe(true);
    });

    it("should identify Android Mobile", () => {
      setUA(
        "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36"
      );
      expect(isMobile()).toBe(true);
      expect(isAndroid()).toBe(true);
    });
  });

  describe("isTablet", () => {
    it("should identify iPad (without Mobile string)", () => {
      // Modern iPadOS often doesn't have "Mobile" in UA to request desktop sites,
      // but our logic specifically checks for iPad AND NOT Mobile.
      setUA(
        "Mozilla/5.0 (iPad; CPU OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/604.1"
      );
      expect(isTablet()).toBe(true);
      expect(isIPad()).toBe(true);
      expect(isIOS()).toBe(true);
    });

    it("should identify generic Tablet (without Mobile string)", () => {
      setUA(
        "Mozilla/5.0 (Linux; Android 9; SM-T860) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 Tablet"
      );
      expect(isTablet()).toBe(true);
    });

    it("should return false for mobile phone with 'Mobile' string", () => {
      setUA("Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36");
      expect(isTablet()).toBe(false);
    });
  });

  describe("operating systems", () => {
    it("should identify Windows", () => {
      setUA("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
      expect(isWindows()).toBe(true);
    });

    it("should identify MacOS", () => {
      setUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
      expect(isMacOS()).toBe(true);
    });

    it("should identify Linux", () => {
      setUA("Mozilla/5.0 (X11; Linux x86_64)");
      expect(isLinux()).toBe(true);
    });
  });
});
