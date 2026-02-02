import { describe, it, expect } from "vitest";

import { isShallowEqualObject, flattenObject, hasNestedKey, deepFreeze } from "./object";

describe("object utils", () => {
  describe("isShallowEqualObject", () => {
    it("should return true for same identity", () => {
      const obj = { a: 1 };
      expect(isShallowEqualObject(obj, obj)).toBe(true);
    });

    it("should return true for objects with same keys and values", () => {
      expect(isShallowEqualObject({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    });

    it("should return false for different lengths", () => {
      expect(isShallowEqualObject({ a: 1 } as any, { a: 1, b: 2 } as any)).toBe(false);
    });

    it("should return false for different values", () => {
      expect(isShallowEqualObject({ a: 1 }, { a: 2 })).toBe(false);
    });
  });

  describe("flattenObject", () => {
    it("should flatten nested objects", () => {
      const input = {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3,
          },
        },
      };
      const expected = {
        a: 1,
        "b.c": 2,
        "b.d.e": 3,
      };
      expect(flattenObject(input)).toEqual(expected);
    });

    it("should handle empty objects", () => {
      expect(flattenObject({})).toEqual({});
    });
  });

  describe("hasNestedKey", () => {
    const obj = { a: { b: { c: 1 } }, d: 2 };

    it("should return true for existing nested keys", () => {
      expect(hasNestedKey(obj, "a.b.c")).toBe(true);
      expect(hasNestedKey(obj, "d")).toBe(true);
    });

    it("should return false for non-existing nested keys", () => {
      expect(hasNestedKey(obj, "a.b.x")).toBe(false);
      expect(hasNestedKey(obj, "x.y.z")).toBe(false);
    });
  });

  describe("deepFreeze", () => {
    it("should freeze the object and its children", () => {
      const obj = { a: { b: 1 } };
      deepFreeze(obj);

      expect(Object.isFrozen(obj)).toBe(true);
      expect(Object.isFrozen(obj.a)).toBe(true);

      // Verify it's actually frozen (throws in strict mode, but we can check if it stays same)
      try {
        (obj as any).a.b = 2;
      } catch (e) {
        // eslint-disable-next-line
      }
      expect(obj.a.b).toBe(1);
    });
  });
});
