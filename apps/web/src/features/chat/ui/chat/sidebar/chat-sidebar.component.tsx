import { Component } from "react";
import { resolve } from "inversify-react";
import { observer } from "mobx-react";
import classNames from "classnames";

import { ChatController } from "~core/stores/chat";

import styles from "./chat-sidebar.module.scss";

@observer
export class ChatSidebar extends Component {
  @resolve(ChatController)
  declare private readonly _controller: ChatController;

  override render() {
    const { onlineUsers, currentRoomId, userId, isSidebarOpen, unreadCounts } = this._controller;

    const channels = [
      { id: "global", name: "Global Chat", icon: "🌎" },
      { id: "family", name: "Family Chat", icon: "🏠" },
    ];

    // Filter out current user from DM list
    const otherUsers = onlineUsers.filter((u) => u.id !== userId);

    return (
      <>
        {isSidebarOpen && (
          <div
            className={styles.chatSidebarBackdrop}
            onClick={() => this._controller.toggleSidebar()}
          />
        )}
        <aside
          className={classNames(styles.chatSidebar, {
            [styles.chatSidebarIsOpen]: isSidebarOpen,
          })}
        >
          <div className={styles.chatSidebarHeader}>
            <h1>Notify</h1>
          </div>

          <div className={styles.chatSidebarSection}>
            <h2 className={styles.chatSidebarSectionTitle}>Channels</h2>
            <div className={styles.chatSidebarList}>
              {channels.map((channel) => {
                const unreadCount = unreadCounts.get(channel.id) || 0;
                return (
                  <button
                    key={channel.id}
                    className={classNames(styles.chatSidebarItem, {
                      [styles.chatSidebarItemActive]: currentRoomId === channel.id,
                    })}
                    onClick={() => this._controller.setCurrentRoom(channel.id)}
                  >
                    <span className={styles.chatSidebarItemIcon}>{channel.icon}</span>
                    <span className={styles.chatSidebarItemName}>{channel.name}</span>
                    {unreadCount > 0 && (
                      <span className={styles.chatSidebarItemUnreadBadge}>{unreadCount}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.chatSidebarSection}>
            <h2 className={styles.chatSidebarSectionTitle}>Direct Messages</h2>
            <div className={styles.chatSidebarList}>
              {otherUsers.map((user) => {
                const dmRoomId = `dm:${[userId, user.id].sort().join("_")}`;
                const unreadCount = unreadCounts.get(dmRoomId) || 0;
                return (
                  <button
                    key={user.id}
                    className={classNames(styles.chatSidebarItem, {
                      [styles.chatSidebarItemActive]: currentRoomId === dmRoomId,
                    })}
                    onClick={() => this._controller.openDirectMessage(user.id)}
                  >
                    <span className={styles.chatSidebarItemStatusIndicator} />
                    <span className={styles.chatSidebarItemName}>{user.userName}</span>
                    {unreadCount > 0 && (
                      <span className={styles.chatSidebarItemUnreadBadge}>{unreadCount}</span>
                    )}
                  </button>
                );
              })}
              {otherUsers.length === 0 && (
                <div className={styles.chatSidebarEmptyState}>No one else online</div>
              )}
            </div>
          </div>
        </aside>
      </>
    );
  }
}
