import { PureComponent } from "react";

import { isElectron } from "~core/utils/platform";
import { electronWindowControls } from "~core/utils/electron-ipc";

import styles from "./title-bar.module.scss";

export class TitleBar extends PureComponent {
  override render() {
    if (!isElectron()) return null;

    return (
      <header className={styles.titleBar}>
        <div className={styles.titleBarDragRegion}></div>
        <div className={styles.titleBarControls}>
          <button
            className={styles.titleBarControlButton}
            onClick={electronWindowControls.minimize}
            title="Minimize"
          >
            <svg width="10" height="1" viewBox="0 0 10 1">
              <rect width="10" height="1" fill="currentColor" />
            </svg>
          </button>
          <button
            className={styles.titleBarControlButton}
            onClick={electronWindowControls.maximize}
            title="Maximize/Restore"
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M1,1 L9,1 L9,9 L1,9 L1,1 Z M2,2 L8,2 L8,8 L2,8 L2,2 Z" fill="currentColor" />
            </svg>
          </button>
          <button
            className={`${styles.titleBarControlButton} ${styles.titleBarCloseButton}`}
            onClick={electronWindowControls.close}
            title="Close"
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M1,1 L9,9 M9,1 L1,9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
      </header>
    );
  }
}
