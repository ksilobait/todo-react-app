import { memo } from "react";
import styles from "./Header.module.css";

export const Header = memo(() => (
  <header className={styles.header}>
    <h1>ToDo</h1>
  </header>
));
