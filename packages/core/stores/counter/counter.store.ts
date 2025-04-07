import { injectable } from "inversify";
import { action, computed, makeObservable, observable } from "mobx";

import { ReadonlyRecord } from "~core/types";

import { Action, ICounterStore } from "./types";

@injectable()
export class CoreCounterStore implements ICounterStore {
  @observable
  protected _count: number = 0;

  constructor() {
    makeObservable(this);
  }

  @action
  readonly change = (action: Action): void => {
    const actions: ReadonlyRecord<Action, number> = {
      [Action.Decrement]: this.count - 1,
      [Action.Increment]: this.count + 1,
      [Action.Double]: this.count * 2,
      [Action.Half]: this.count / 2,
    };

    this._count = actions[action];
  };

  @computed
  get count(): number {
    return this._count;
  }

  getCounterSymbol = (action: Action): string => {
    const symbol: ReadonlyRecord<Action, string> = {
      [Action.Decrement]: "-",
      [Action.Increment]: "+",
      [Action.Double]: "*",
      [Action.Half]: "/",
    };
    return symbol[action];
  };
}
