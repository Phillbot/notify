import { createValueToken } from "~core/di";

export enum Action {
  Increment = "increment",
  Decrement = "decrement",
  Double = "double",
  Half = "half",
}

export type ICounterStore = Readonly<{
  count: number;
  change(action: Action): void;
  getCounterSymbol(action: Action): string;
}>;

export const ICounterStore = createValueToken("ICounterStore");
