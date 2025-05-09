import { PureComponent } from "react";

import { Counter } from "./counter/counter.component";
import { Chat } from "./chat/chat.component";

import styles from './app.module.scss';

export class App extends PureComponent {
  override render() {
    return (
      <div className={styles.app}>
        <Counter />
        <Chat />
      </div>
    );
  }
}
