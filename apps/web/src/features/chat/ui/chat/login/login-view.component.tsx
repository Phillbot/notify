import { Component, ChangeEvent } from "react";
import { resolve } from "inversify-react";
import { observer } from "mobx-react";

import { ChatController } from "~core/stores/chat";

import styles from "./login-view.module.scss";

@observer
export class LoginView extends Component {
  @resolve(ChatController)
  declare private readonly _controller: ChatController;

  private readonly _handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this._controller.setTempNickname(e.target.value);
  };

  private readonly _handleKeyDown = (e: React.KeyboardEvent) => {
    this._controller.handleNicknameKeyDown(e.key);
  };

  override render() {
    const { tempNickname } = this._controller;

    return (
      <div className={styles.loginView}>
        <div className={styles.loginViewCard}>
          <div className={styles.loginViewIcon}>👋</div>
          <h1 className={styles.loginViewTitle}>Welcome to Chat</h1>
          <p className={styles.loginViewDescription}>
            Please enter your nickname to join the conversation
          </p>
          <div className={styles.loginViewInputGroup}>
            <input
              value={tempNickname}
              onChange={this._handleChange}
              onKeyDown={this._handleKeyDown}
              placeholder="Your awesome nickname"
            />
            <button
              onClick={() => this._controller.join()}
              disabled={!tempNickname.trim()}
            >
              Join Chat
            </button>
          </div>
        </div>
      </div>
    );
  }
}
