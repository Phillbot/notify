import { describe, it, expect } from "vitest";

import {
  isValidEmail,
  isValidUrl,
  isValidPhoneNumber,
  isValidDate,
  hasRequiredProperties,
} from "./validate";

describe("validate utils", () => {
  describe("isValidEmail", () => {
    it("should return true for valid emails", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
    });

    it("should return false for invalid emails", () => {
      expect(isValidEmail("test@example")).toBe(false);
      expect(isValidEmail("test@.com")).toBe(false);
      expect(isValidEmail("plain-text")).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    it("should return true for valid URLs", () => {
      expect(isValidUrl("https://google.com")).toBe(true);
      expect(isValidUrl("http://localhost:3000")).toBe(true);
      expect(isValidUrl("google.com")).toBe(true);
    });

    it("should return false for invalid URLs", () => {
      expect(isValidUrl("not-a-url")).toBe(false);
      expect(isValidUrl("http://")).toBe(false);
    });
  });

  describe("isValidPhoneNumber", () => {
    it("should return true for valid phone numbers", () => {
      expect(isValidPhoneNumber("+1234567890")).toBe(true);
      expect(isValidPhoneNumber("123-456-7890")).toBe(true);
      expect(isValidPhoneNumber("(123) 456 7890")).toBe(true);
    });

    it("should return false for invalid phone numbers", () => {
      expect(isValidPhoneNumber("123")).toBe(false);
      expect(isValidPhoneNumber("abc-def-ghij")).toBe(false);
    });
  });

  describe("isValidDate", () => {
    it("should return true for valid date strings", () => {
      expect(isValidDate("2024-01-01")).toBe(true);
      expect(isValidDate("Mon Jan 01 2024")).toBe(true);
    });

    it("should return false for invalid date strings", () => {
      expect(isValidDate("not-a-date")).toBe(false);
      expect(isValidDate("2024-13-45")).toBe(false);
    });
  });

  describe("hasRequiredProperties", () => {
    const obj = { name: "Test", age: 25 };

    it("should return true if all properties exist", () => {
      expect(hasRequiredProperties(obj, ["name", "age"])).toBe(true);
    });

    it("should return false if any property is missing", () => {
      expect(hasRequiredProperties(obj, ["name", "email"])).toBe(false);
    });
  });
});
