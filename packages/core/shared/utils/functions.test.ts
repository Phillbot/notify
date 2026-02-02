import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import {
  constant,
  noop,
  isFunction,
  once,
  compose,
  pipe,
  throttle,
  debounce,
  rafThrottle,
  rafDebounce,
} from "./functions";

describe("functions utils", () => {
  describe("constant", () => {
    it("should return a function that returns the same value", () => {
      const c = constant(42);
      expect(c()).toBe(42);
    });
  });

  describe("noop", () => {
    it("should do nothing", () => {
      expect(noop()).toBeUndefined();
    });
  });

  describe("isFunction", () => {
    it("should return true for functions", () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
    });

    it("should return false for non-functions", () => {
      expect(isFunction(123)).toBe(false);
      expect(isFunction("string")).toBe(false);
      expect(isFunction({})).toBe(false);
      expect(isFunction(null)).toBe(false);
    });
  });

  describe("once", () => {
    it("should only call the original function once", () => {
      const fn = vi.fn((x: number) => x * 2);
      const wrapped = once(fn);

      expect(wrapped(2)).toBe(4);
      expect(wrapped(3)).toBe(4);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should preserve 'this' context", () => {
      const obj = {
        val: 10,
        getVal: once(function (this: any) {
          return this.val;
        }),
      };
      expect(obj.getVal()).toBe(10);
    });
  });

  describe("compose", () => {
    it("should compose functions from right to left", () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const result = compose(double, add1)(5); // (5 + 1) * 2 = 12
      expect(result).toBe(12);
    });

    it("should return the argument if no functions are provided", () => {
      expect(compose<number>()(5)).toBe(5);
    });
  });

  describe("pipe", () => {
    it("should pipe functions from left to right", () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const result = pipe(add1, double)(5); // (5 + 1) * 2 = 12
      expect(result).toBe(12);
    });

    it("should return the argument if no functions are provided", () => {
      expect(pipe<number>()(5)).toBe(5);
    });
  });

  describe("timing functions", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    describe("throttle", () => {
      it("should only call the function once per delay", () => {
        const fn = vi.fn();
        const throttled = throttle(fn, 100);

        throttled();
        throttled();
        throttled();

        expect(fn).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(100);
        throttled();
        expect(fn).toHaveBeenCalledTimes(2);
      });
    });

    describe("debounce", () => {
      it("should only call the function after the delay", () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 100);

        debounced();
        debounced();
        debounced();

        expect(fn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);
        expect(fn).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("animation frame functions", () => {
    beforeEach(() => {
      vi.stubGlobal(
        "requestAnimationFrame",
        vi.fn((cb) => setTimeout(cb, 16))
      );
      vi.stubGlobal(
        "cancelAnimationFrame",
        vi.fn((id) => clearTimeout(id))
      );
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
      vi.unstubAllGlobals();
    });

    describe("rafThrottle", () => {
      it("should throttle calls to once per frame", () => {
        const fn = vi.fn();
        const throttled = rafThrottle(fn);

        throttled();
        throttled();

        expect(fn).not.toHaveBeenCalled();
        vi.runAllTimers();
        expect(fn).toHaveBeenCalledTimes(1);
      });
    });

    describe("rafDebounce", () => {
      it("should debounce calls until the next frame", () => {
        const fn = vi.fn();
        const debounced = rafDebounce(fn);

        debounced();
        debounced();

        expect(fn).not.toHaveBeenCalled();
        vi.runAllTimers();
        expect(fn).toHaveBeenCalledTimes(1);
      });
    });
  });
});
