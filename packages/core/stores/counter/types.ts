
import { createServiceToken } from "~core/di";

import { CoreCounterStore } from "./counter.store";

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
}>

export const ICounterStore = createServiceToken<ICounterStore>({
  id: "ICounterStore",
  useClass: CoreCounterStore,
});
