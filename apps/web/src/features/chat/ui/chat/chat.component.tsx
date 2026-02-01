import { Component } from "react";
import { resolve } from "inversify-react";
import { observer } from "mobx-react";

import { ChatController } from "~core/stores/chat";

import { ChatHeader } from "./header/chat-header.component";
import { ChatMessages } from "./messages/chat-messages.component";
import { ChatInput } from "./input/chat-input.component";
import { LoginView } from "./login/login-view.component";
import { ConnectingState } from "./connecting/connecting-state.component";

import { ChatSidebar } from "./sidebar/chat-sidebar.component";

import styles from "./chat.module.scss";

@observer
export class Chat extends Component {
  @resolve(ChatController)
  declare private readonly _controller: ChatController;

  override componentDidMount() {
    this._controller.init();
  }

  override render() {
    const { isConnected, userName } = this._controller;

    if (!isConnected) {
      return <ConnectingState />;
    }

    if (!userName) {
      return <LoginView />;
    }

    return (
      <div className={styles.chatContainer}>
        <ChatSidebar />
        <div className={styles.chatContainerMain}>
          <ChatHeader />
          <ChatMessages />
          <ChatInput />
        </div>
      </div>
    );
  }
}
