import { describe, it, expect } from "vitest";

import { CoreCounterStore } from "./counter.store";
import { Action } from "./types";

describe("CoreCounterStore", () => {
  it("should initialize with count 0", () => {
    const store = new CoreCounterStore();
    expect(store.count).toBe(0);
  });

  it("should change count based on action", () => {
    const store = new CoreCounterStore();

    store.change(Action.Increment);
    expect(store.count).toBe(1);

    store.change(Action.Increment);
    expect(store.count).toBe(2);

    store.change(Action.Double);
    expect(store.count).toBe(4);

    store.change(Action.Decrement);
    expect(store.count).toBe(3);

    store.change(Action.Half);
    expect(store.count).toBe(1.5);
  });

  it("should return correct symbols for actions", () => {
    const store = new CoreCounterStore();
    expect(store.getCounterSymbol(Action.Increment)).toBe("+");
    expect(store.getCounterSymbol(Action.Decrement)).toBe("-");
    expect(store.getCounterSymbol(Action.Double)).toBe("*");
    expect(store.getCounterSymbol(Action.Half)).toBe("/");
  });
});
