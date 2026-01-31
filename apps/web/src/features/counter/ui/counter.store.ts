import { injectable } from "inversify";

import { CoreCounterStore } from "~core/stores/counter/counter.store";
import { ICounterStore } from "~core/stores/counter/types";

@injectable()
export class WebCounterCore extends CoreCounterStore implements ICounterStore {
  protected override _count: number = 5;
}
