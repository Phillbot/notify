import { describe, it, expect } from "vitest";

import { stripHtmlTags, slugify } from "./string";

describe("string utils", () => {
  describe("stripHtmlTags", () => {
    it("should remove simple HTML tags", () => {
      expect(stripHtmlTags("<p>Hello World</p>")).toBe("Hello World");
    });

    it("should remove nested HTML tags", () => {
      expect(stripHtmlTags("<div><span>Text</span></div>")).toBe("Text");
    });

    it("should return empty string if only tags provided", () => {
      expect(stripHtmlTags("<div></div>")).toBe("");
    });

    it("should not affect strings without tags", () => {
      expect(stripHtmlTags("Plain text")).toBe("Plain text");
    });
  });

  describe("slugify", () => {
    it("should convert to lowercase and replace spaces with hyphens", () => {
      expect(slugify("Hello World")).toBe("hello-world");
    });

    it("should remove special characters", () => {
      expect(slugify("Hello, World!")).toBe("hello-world");
    });

    it("should trim whitespace", () => {
      expect(slugify("  hello world  ")).toBe("hello-world");
    });

    it("should handle multiple hyphens and underscores", () => {
      expect(slugify("hello__world--test")).toBe("hello-world-test");
    });

    it("should remove leading and trailing hyphens", () => {
      expect(slugify("-hello world-")).toBe("hello-world");
    });
  });
});
