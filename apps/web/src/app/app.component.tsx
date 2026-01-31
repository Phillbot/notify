import { PureComponent } from "react";

import { Counter } from "@/features/counter";
import { Chat } from "@/features/chat";

import styles from "./app.module.scss";

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
