import { Component, ChangeEvent } from "react";
import { resolve } from "inversify-react";
import { observer } from "mobx-react";

import { ChatController } from "~core/stores/chat";

import styles from "./chat-input.module.scss";

@observer
export class ChatInput extends Component {
    @resolve(ChatController)
    declare private readonly _controller: ChatController;

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this._controller.setMessage(e.target.value);
    };

    handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            this._controller.sendMessage();
        }
    };

    override render() {
        const { message } = this._controller;

        return (
            <div className={styles.chatInput}>
                <input
                    className={styles.chatInputField}
                    value={message}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    placeholder="Type your message..."
                />
                <button
                    className={styles.chatInputSendButton}
                    onClick={() => this._controller.sendMessage()}
                    disabled={!message.trim()}
                >
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z" />
                    </svg>
                </button>
            </div>
        );
    }
}
