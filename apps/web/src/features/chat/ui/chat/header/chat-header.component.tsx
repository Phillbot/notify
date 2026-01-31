import { Component } from "react";
import { resolve } from "inversify-react";
import { observer } from "mobx-react";

import { ChatController } from "~core/stores/chat";

import styles from "./chat-header.module.scss";

@observer
export class ChatHeader extends Component {
    @resolve(ChatController)
    declare private readonly _controller: ChatController;

    override render() {
        const { userName } = this._controller;

        return (
            <div className={styles.chatHeader}>
                <div className={styles.chatHeaderInfo}>
                    <h2>Global Chat</h2>
                    <span className={styles.chatHeaderOnlineBadge}>Online</span>
                </div>
                <div className={styles.chatHeaderActions}>
                    <div className={styles.chatHeaderCurrentUser}>
                        Signed in as <strong>{userName}</strong>
                    </div>
                    <button className={styles.chatHeaderLogout} onClick={() => this._controller.logout()}>
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }
}
