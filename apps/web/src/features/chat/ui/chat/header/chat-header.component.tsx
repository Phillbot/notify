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
    const { userName, currentRoomId, onlineUsers, userId } = this._controller;

    let roomName = "Chat";
    if (currentRoomId === "global") roomName = "🌎 Global Chat";
    else if (currentRoomId === "family") roomName = "🏠 Family Chat";
    else if (currentRoomId.startsWith("dm:")) {
      const targetUserId = currentRoomId
        .replace("dm:", "")
        .split("_")
        .find((id) => id !== userId);
      const targetUser = onlineUsers.find((u) => u.id === targetUserId);
      roomName = targetUser ? `💬 Chat with ${targetUser.userName}` : "Private Chat";
    }

    return (
      <header className={styles.chatHeader}>
        <div className={styles.chatHeaderInfo}>
          <div className={styles.chatHeaderTitleGroup}>
            <button
              className={styles.chatHeaderMenuButton}
              onClick={() => this._controller.toggleSidebar()}
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button>
            <h2>{roomName}</h2>
          </div>
          <span className={styles.chatHeaderOnlineBadge}>Live</span>
        </div>
        <div className={styles.chatHeaderActions}>
          <div className={styles.chatHeaderCurrentUser}>
            <strong>{userName}</strong>
          </div>
          <button className={styles.chatHeaderLogout} onClick={() => this._controller.logout()}>
            Sign Out
          </button>
        </div>
      </header>
    );
  }
}
