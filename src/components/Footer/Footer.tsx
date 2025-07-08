import { memo } from "react";
import type { Filter } from "../../types/Task";
import styles from "./Footer.module.css";
import utilsStyles from "../utils.module.css";

type FooterProps = {
  activeCount: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
};

export const Footer = memo(
  ({ activeCount, filter, setFilter, clearCompleted }: FooterProps) => (
    <div className={`${styles.footer} ${utilsStyles.divider}`}>
      <span>{activeCount} items left</span>

      <div
        className={styles.filters}
        role="radiogroup"
        aria-label="Task filters"
      >
        {(["all", "active", "completed"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? styles.active : ""}
            aria-pressed={filter === f}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <button
        onClick={clearCompleted}
        className={styles.clearButton}
        aria-label="Clear completed tasks"
      >
        Clear completed
      </button>
    </div>
  )
);
