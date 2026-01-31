import { Component, ChangeEvent, createRef } from "react";
import { resolve } from "inversify-react";
import { observer } from "mobx-react";

import { IChatStore } from "~core/stores/chat";

import { getWebSocketUrl } from "~core/config";

import styles from "./chat.module.scss";

interface State {
  message: string;
}

@observer
export class Chat extends Component<unknown, State> {
  @resolve(IChatStore.$)
  declare private readonly _chatStore: IChatStore;

  private chatListRef = createRef<HTMLUListElement>();

  override state: State = {
    message: "",
  };

  override componentDidMount() {
    this._chatStore.connect(getWebSocketUrl());
  }

  // We don't disconnect on unmount because the store is a singleton
  // and we want to keep the connection alive while the app is running.

  override componentDidUpdate(_: unknown, prevState: State) {
    if (prevState.message !== this.state.message) {
      const el = this.chatListRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: e.target.value });
  };

  handleSend = () => {
    const { message } = this.state;
    if (!message.trim()) return;
    this._chatStore.sendMessage(message);
    this.setState({ message: "" });
  };

  override render() {
    const { message } = this.state;
    const { messages, isConnected } = this._chatStore;

    if (!isConnected) {
      return (
        <div className={`${styles.chat} ${styles.disconnected}`}>
          <div className={styles.status}>Connecting to server...</div>
        </div>
      );
    }

    return (
      <div className={styles.chat}>
        <ul ref={this.chatListRef} className={styles.chatList}>
          {messages.map((msg, idx) => (
            <li key={idx} className={`${styles.chatMessage} ${styles.server}`}>
              <div className={styles.sender}>{msg.from}</div>
              <div className={styles.text}>{msg.text}</div>
            </li>
          ))}
        </ul>

        <div className={styles.chatInput}>
          <input
            value={message}
            onChange={this.handleChange}
            onKeyDown={(e) => e.key === "Enter" && this.handleSend()}
            placeholder="Type your message"
          />
          <button onClick={this.handleSend}>Send</button>
        </div>
      </div>
    );
  }
}
