import { describe, it, expect } from "vitest";

import {
  getQueryParam,
  setQueryParam,
  removeQueryParam,
  parseUrl,
  objectToQueryString,
  queryStringToObject,
} from "./url";

describe("url utils", () => {
  const testUrl = "https://example.com/page?foo=bar&baz=qux";

  describe("getQueryParam", () => {
    it("should return the value of a query parameter", () => {
      expect(getQueryParam(testUrl, "foo")).toBe("bar");
      expect(getQueryParam(testUrl, "baz")).toBe("qux");
    });

    it("should return null if the parameter does not exist", () => {
      expect(getQueryParam(testUrl, "missing")).toBeNull();
    });
  });

  describe("setQueryParam", () => {
    it("should update an existing query parameter", () => {
      const result = setQueryParam(testUrl, "foo", "updated");
      expect(getQueryParam(result, "foo")).toBe("updated");
      expect(getQueryParam(result, "baz")).toBe("qux");
    });

    it("should append a new query parameter", () => {
      const result = setQueryParam(testUrl, "new", "value");
      expect(getQueryParam(result, "new")).toBe("value");
      expect(getQueryParam(result, "foo")).toBe("bar");
    });
  });

  describe("removeQueryParam", () => {
    it("should remove an existing query parameter", () => {
      const result = removeQueryParam(testUrl, "foo");
      expect(getQueryParam(result, "foo")).toBeNull();
      expect(getQueryParam(result, "baz")).toBe("qux");
    });

    it("should do nothing if the parameter does not exist", () => {
      const result = removeQueryParam(testUrl, "missing");
      expect(result).toBe(new URL(testUrl).toString());
    });
  });

  describe("parseUrl", () => {
    it("should return a URL object", () => {
      const result = parseUrl(testUrl);
      expect(result).toBeInstanceOf(URL);
      expect(result.hostname).toBe("example.com");
      expect(result.pathname).toBe("/page");
    });
  });

  describe("objectToQueryString", () => {
    it("should convert a plain object to a query string", () => {
      const params = { a: 1, b: "test", c: true };
      expect(objectToQueryString(params)).toBe("a=1&b=test&c=true");
    });

    it("should filter out null and undefined values", () => {
      const params = { a: 1, b: undefined, c: null, d: "val" };
      expect(objectToQueryString(params)).toBe("a=1&d=val");
    });

    it("should handle empty objects", () => {
      expect(objectToQueryString({})).toBe("");
    });

    it("should encode special characters", () => {
      const params = { "q space": "a+b&c" };
      expect(objectToQueryString(params)).toBe("q%20space=a%2Bb%26c");
    });
  });

  describe("queryStringToObject", () => {
    it("should convert a query string to a plain object", () => {
      expect(queryStringToObject("?foo=bar&baz=123")).toEqual({ foo: "bar", baz: "123" });
    });

    it("should handle strings without a leading question mark", () => {
      expect(queryStringToObject("foo=bar&baz=123")).toEqual({ foo: "bar", baz: "123" });
    });

    it("should handle empty strings", () => {
      expect(queryStringToObject("")).toEqual({});
    });
  });
});
