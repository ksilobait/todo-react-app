import { memo } from "react";
import styles from "./ThemeToggle.module.css";

export const ThemeToggle = memo(
  ({ darkMode, toggle }: { darkMode: boolean; toggle: () => void }) => (
    <button
      onClick={toggle}
      className={styles.themeToggle}
      aria-label="Toggle dark mode"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  )
);
