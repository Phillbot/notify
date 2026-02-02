import { Component, createRef } from "react";
import { resolve } from "inversify-react";
import { observer } from "mobx-react";
import cn from "classnames";

import { ChatController } from "~core/stores/chat";

import styles from "./chat-messages.module.scss";

@observer
export class ChatMessages extends Component {
  @resolve(ChatController)
  declare private readonly _controller: ChatController;

  private listRef = createRef<HTMLUListElement>();

  override componentDidUpdate() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    const el = this.listRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  override render() {
    const { messages, userName } = this._controller;

    return (
      <ul ref={this.listRef} className={styles.chatMessages}>
        {messages.map((msg, idx) => {
          const isOwn = msg.from === userName;
          return (
            <li
              key={idx}
              className={cn(styles.chatMessagesItem, {
                [styles.chatMessagesItemOwn]: isOwn,
              })}
            >
              <div className={styles.chatMessagesAvatar}>{msg.from.charAt(0).toUpperCase()}</div>
              <div className={styles.chatMessagesContent}>
                <div className={styles.chatMessagesSender}>{msg.from}</div>
                <div className={styles.chatMessagesText}>{msg.text}</div>
              </div>
            </li>
          );
        })}
        {messages.length === 0 && (
          <div className={styles.chatMessagesEmpty}>
            No messages yet. Be the first to say hello!
          </div>
        )}
      </ul>
    );
  }
}
