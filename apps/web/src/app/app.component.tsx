import { PureComponent } from "react";

import { Chat } from "@/features/chat";
import { TitleBar } from "@/features/desktop/ui/title-bar/title-bar.component";

import styles from "./app.module.scss";

export class App extends PureComponent {
  override render() {
    return (
      <div className={styles.app}>
        <TitleBar />
        <Chat />
      </div>
    );
  }
}
