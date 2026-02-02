import { describe, it, expect, vi } from "vitest";

import { retry, waitFor, allSettledMap, delayUntil, to, memoizeAsync } from "./promise";

describe("promise utils", () => {
  describe("retry", () => {
    it("should return the result if the function succeeds on the first try", async () => {
      const fn = vi.fn().mockResolvedValue("success");
      const result = await retry(fn, 3, 0);
      expect(result).toBe("success");
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should retry and eventually succeed", async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error("fail"))
        .mockRejectedValueOnce(new Error("fail"))
        .mockResolvedValue("success");

      const result = await retry(fn, 3, 0);
      expect(result).toBe("success");
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it("should throw after all retries fail", async () => {
      const fn = vi.fn().mockRejectedValue(new Error("total failure"));
      await expect(retry(fn, 2, 0)).rejects.toThrow("total failure");
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe("waitFor", () => {
    it("should resolve when the condition is met", async () => {
      let flag = false;
      setTimeout(() => (flag = true), 50);
      await waitFor(() => flag, 10, 200);
      expect(flag).toBe(true);
    });

    it("should reject on timeout", async () => {
      await expect(waitFor(() => false, 10, 50)).rejects.toThrow("Timeout exceeded");
    });
  });

  describe("allSettledMap", () => {
    it("should return result statuses and values mapped by keys", async () => {
      const promises = {
        a: Promise.resolve(1),
        b: Promise.reject("error"),
      };
      const result = await allSettledMap(promises);
      expect(result).toEqual({
        a: { status: "fulfilled", value: 1 },
        b: { status: "rejected", reason: "error" },
      });
    });
  });

  describe("delayUntil", () => {
    it("should wait for condition and then resolve", async () => {
      let flag = false;
      setTimeout(() => (flag = true), 50);
      await delayUntil(() => flag, 10);
      expect(flag).toBe(true);
    });

    it("should work with a specific delay", async () => {
      const start = Date.now();
      await delayUntil(() => true, 50);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(45);
    });
  });

  describe("to", () => {
    it("should return [null, data] on success", async () => {
      const [err, data] = await to(Promise.resolve("data"));
      expect(err).toBeNull();
      expect(data).toBe("data");
    });

    it("should return [err, null] on failure", async () => {
      const [err, data] = await to(Promise.reject("error"));
      expect(err).toBe("error");
      expect(data).toBeNull();
    });
  });

  describe("memoizeAsync", () => {
    it("should cache subsequent calls with the same key", async () => {
      const fn = vi.fn().mockImplementation((key) => Promise.resolve(`result_${key}`));
      const memoized = memoizeAsync(fn);

      const res1 = await memoized("a");
      const res2 = await memoized("a");

      expect(res1).toBe("result_a");
      expect(res2).toBe("result_a");
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
