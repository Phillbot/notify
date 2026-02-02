import { observer } from "mobx-react";
import { resolve } from "inversify-react";
import { Component } from "react";

import { ChatController } from "~core/stores/chat";

import styles from "./connecting-state.module.scss";

@observer
export class ConnectingState extends Component {
  @resolve(ChatController)
  declare private readonly _controller: ChatController;

  override render() {
    const { connectionUrl } = this._controller;

    return (
      <div className={styles.connectingState}>
        <div className={styles.connectingStateStatus}>
          <div className={styles.connectingStateSpinner}></div>
          <p>Connecting to server...</p>
          {connectionUrl && <code className={styles.connectingStateUrl}>{connectionUrl}</code>}
        </div>
      </div>
    );
  }
}
