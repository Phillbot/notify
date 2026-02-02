import { describe, it, expect } from "vitest";

import { first, last, uniq, flatten, compact } from "./array";

describe("array utils", () => {
  it("first should return the first element", () => {
    expect(first([1, 2, 3])).toBe(1);
    expect(first([])).toBeUndefined();
  });

  it("last should return the last element", () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last([])).toBeUndefined();
  });

  it("uniq should remove duplicates", () => {
    expect(uniq([1, 2, 2, 3, 1, 4])).toEqual([1, 2, 3, 4]);
    expect(uniq(["a", "b", "a"])).toEqual(["a", "b"]);
  });

  it("flatten should flatten one level deep", () => {
    expect(flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]);
    expect(flatten([])).toEqual([]);
  });

  it("compact should remove falsy values", () => {
    const arr = [0, 1, false, 2, "", 3, null, undefined, NaN];
    // filter(Boolean) treats 0 and NaN as falsy, which is expected behavior for compact in many libs
    expect(compact(arr as any)).toEqual([1, 2, 3]);
  });
});
