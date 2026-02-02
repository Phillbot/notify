import { describe, it, expect } from "vitest";

import {
  sum,
  average,
  degreesToRadians,
  radiansToDegrees,
  minMax,
  toFixedNumber,
  modulo,
  distance,
  angleBetween,
  isNaNValue,
} from "./math";

describe("math utils", () => {
  it("should calculate sum correctly", () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(sum([])).toBe(0);
  });

  it("should calculate average correctly", () => {
    expect(average([1, 2, 3])).toBe(2);
    expect(average([])).toBe(0);
  });

  it("should convert degrees to radians", () => {
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
    expect(degreesToRadians(0)).toBe(0);
  });

  it("should convert radians to degrees", () => {
    expect(radiansToDegrees(Math.PI)).toBeCloseTo(180);
    expect(radiansToDegrees(0)).toBe(0);
  });

  it("should return min and max values", () => {
    expect(minMax([10, 5, 8, 20])).toEqual([5, 20]);
  });

  it("should round to fixed decimal places", () => {
    expect(toFixedNumber(1.23456, 2)).toBe(1.23);
    expect(toFixedNumber(1.235, 2)).toBe(1.24);
  });

  it("should calculate modulo correctly (including negative)", () => {
    expect(modulo(5, 3)).toBe(2);
    expect(modulo(-1, 3)).toBe(2);
  });

  it("should calculate distance between points", () => {
    expect(distance(0, 0, 3, 4)).toBe(5);
  });

  it("should calculate angle between points", () => {
    expect(angleBetween(0, 0, 1, 0)).toBe(0);
    expect(angleBetween(0, 0, 0, 1)).toBeCloseTo(Math.PI / 2);
  });

  it("should identify NaN correctly", () => {
    expect(isNaNValue(NaN)).toBe(true);
    expect(isNaNValue(123)).toBe(false);
    expect(isNaNValue("abc")).toBe(false);
  });
});
