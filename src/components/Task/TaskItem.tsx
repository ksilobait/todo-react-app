import { memo, useCallback, useState } from "react";
import type { Task } from "../../types/Task";
import styles from "./Task.module.css";
import utilsStyles from "../utils.module.css";

type TaskItemProps = {
  task: Task;
  handleTaskToggle: (id: number) => void;
  updateTaskText: (id: number, newText: string) => void;
  deleteTask: (id: number) => void;
  index: number;
  ref: React.Ref<HTMLLIElement | null>;
};

export const TaskItem = memo(
  ({
    task,
    handleTaskToggle,
    updateTaskText,
    deleteTask,
    index,
    ref,
  }: TaskItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingText, setEditingText] = useState(task.text);

    const startEditing = useCallback(() => {
      setIsEditing(true);
      setEditingText(task.text);
    }, [task.text]);

    const finishEditing = useCallback(() => {
      if (editingText.trim()) {
        updateTaskText(task.id, editingText.trim());
      }
      setIsEditing(false);
    }, [editingText, task.id, updateTaskText]);

    const onEditInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) =>
        setEditingText(e.target.value),
      [setEditingText]
    );

    const onEditInputKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          (e.target as HTMLInputElement).blur();
        }
        if (e.key === "Escape") {
          setIsEditing(false);
        }
      },
      []
    );

    return (
      <li
        className={`${styles.taskRow} ${
          index === 0 ? utilsStyles.dividerStrong : utilsStyles.divider
        }`}
        ref={ref}
      >
        <input
          type="checkbox"
          aria-label="Toggle task"
          checked={task.completed}
          onChange={() => handleTaskToggle(task.id)}
        />

        {isEditing ? (
          <input
            className={styles.taskEditInput}
            value={editingText}
            onChange={onEditInputChange}
            onBlur={finishEditing}
            onKeyDown={onEditInputKeyDown}
            autoFocus
          />
        ) : (
          <span
            className={`${styles.task} ${
              task.completed ? styles.taskDone : ""
            }`}
            onClick={() => startEditing()}
            onKeyDown={(e) => e.key === "Enter" && startEditing()}
            title={task.text}
            tabIndex={0}
            role="button"
            aria-label={`Edit task: ${task.text}`}
          >
            {task.text}
          </span>
        )}

        <button
          onClick={() => deleteTask(task.id)}
          className={styles.delete}
          aria-label={`Delete task: ${task.text}`}
        >
          ✕
        </button>
      </li>
    );
  }
);
