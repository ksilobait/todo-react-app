import { memo } from "react";
import styles from "./InputRow.module.css";

type InputRowProps = {
  text: string;
  setText: (text: string) => void;
  addTask: () => void;
  isToggleAllChecked: boolean;
  handleToggleAll: () => void;
};

export const InputRow = memo(
  ({
    text,
    setText,
    addTask,
    isToggleAllChecked,
    handleToggleAll,
  }: InputRowProps) => (
    <div className={styles.inputRow}>
      <input
        type="checkbox"
        aria-label="Toggle all tasks"
        title={
          isToggleAllChecked ? "Mark all as active" : "Mark all as completed"
        }
        checked={isToggleAllChecked}
        onChange={handleToggleAll}
      />
      <input
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && text.trim() && addTask()}
        placeholder="What needs to be done?"
      />
    </div>
  )
);
