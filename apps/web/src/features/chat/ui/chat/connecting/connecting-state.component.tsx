import { Component } from "react";

import styles from "./connecting-state.module.scss";

export class ConnectingState extends Component {
  override render() {
    return (
      <div className={styles.connectingState}>
        <div className={styles.connectingStateStatus}>
          <div className={styles.connectingStateSpinner}></div>
          Connecting to server...
        </div>
      </div>
    );
  }
}
