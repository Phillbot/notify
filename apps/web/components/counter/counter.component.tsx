import { Component, ReactElement } from "react";
import { resolve } from "inversify-react";
import { observer } from "mobx-react";

import { Action, ICounterStore } from "~core/stores/counter/types";

import styles from "./counter.module.scss";

@observer
export class Counter extends Component {
  @resolve(ICounterStore.$)
  declare private readonly _counterStore: ICounterStore;
  override render() {
    const { count } = this._counterStore;

    return (
      <div className={styles.counter}>
        <div className={styles.counterDisplay}>{count}</div>
        <div className={styles.counterButtonPanel}>{this.buttons}</div>
      </div>
    );
  }

  private get buttons(): ReactElement[] {
    const { change, getCounterSymbol } = this._counterStore;

    return Object.values(Action).map((action) => (
      <div key={action} className={styles.counterButtonPanelButton} onClick={() => change(action)}>
        {getCounterSymbol(action)}
      </div>
    ));
  }
}
