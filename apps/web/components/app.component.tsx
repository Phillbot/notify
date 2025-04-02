// app.component.tsx
import { PureComponent } from "react";
import { io, Socket } from "socket.io-client";

import { Counter } from "./counter/counter.component";
import styles from './app.module.scss';

interface AppState {
  socket: Socket | null;
}

export class App extends PureComponent<unknown, AppState> {
  override state: AppState = {
    socket: null
  };

  override componentDidMount() {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("✅ WebSocket connected");
      socket.emit("ping");
    });

    socket.on("pong", (msg: string) => {
      console.log("🛰 Server says:", msg);
    });

    this.setState({ socket });
  }

  override componentWillUnmount() {
    this.state.socket?.disconnect();
  }

  override render() {
    return (
      <div className={styles.app}>
        <Counter />
      </div>
    );
  }
}
