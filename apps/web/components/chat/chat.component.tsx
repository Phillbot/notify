import { Component, ChangeEvent, createRef } from "react";

import styles from './chat.module.scss';

interface ChatMessage {
  from: "client" | "server";
  text: string;
}

interface State {
  message: string;
  response: ChatMessage[];
  socket: WebSocket | null;
}

export class Chat extends Component<unknown, State> {
  private chatListRef = createRef<HTMLUListElement>();

  override state: State = {
    message: "",
    response: [],
    socket: null,
  };

  override componentDidMount() {
    const socket = new WebSocket("ws://localhost:3001");

    socket.addEventListener("open", () => {
      console.log("🟢 connected");
    });

    socket.addEventListener("message", (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (typeof parsed?.text === "string") {
          this.setState((prev) => ({
            response: [...prev.response, { from: "server", text: JSON.parse(parsed.text)?.text }],
          }));
        }
      } catch {
        // TODO: catch empty?
      }
    });

    socket.addEventListener("error", (event) => {
      console.error("❗WebSocket error:", event);
    });

    socket.addEventListener("close", (event) => {
      console.warn("🔌 WebSocket closed:", event.code, event.reason);
    });

    this.setState({ socket });
  }

  override componentWillUnmount() {
    this.state.socket?.close();
  }

  override componentDidUpdate(_: unknown, prevState: State) {
    if (prevState.response.length !== this.state.response.length) {
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
    const { socket, message } = this.state;
    if (socket && message.trim()) {
      socket.send(JSON.stringify({ text: message }));
      this.setState((prev) => ({
        response: [...prev.response, { from: "client", text: message }],
        message: "",
      }));
    }
  };

  override render() {
    const { message, response, socket } = this.state;

    if (!socket?.readyState) {
      return null;
    }

    return (
      <div className={styles.chat}>
        <ul ref={this.chatListRef} className={styles.chatList}>
          {response.map((msg, idx) => (
            <li key={idx} className={`${styles.chatMessage} ${styles[msg.from]}`}>
              <span>{msg.from}:{msg.text}</span>
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
