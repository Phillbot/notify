import classNames from "classnames";

import { Counter } from "./counter/counter.component";

import styles from "./app.module.scss";

export default function App() {
  return (
    <div className={classNames(styles.mySuperStyle, styles.mySuperStyleModify)}>
      <div className={styles.mySuperStyleElement}>test</div>
      <Counter />
    </div>
  );
}
