import { useEffect, useState, useCallback, useRef } from "react";
import styles from "./App.module.css";
import type { Filter, Task } from "../../types/Task";
import { Footer } from "../Footer/Footer";
import { TaskItem } from "../Task/TaskItem";
import { InputRow } from "../InputArea/InputRow";
import { Header } from "../Header/Header";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export default function App() {
  const TASKS_STORAGE_KEY = "tasks";

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(TASKS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [darkMode, setDarkMode] = useState(false);
  const listEndRef = useRef<HTMLLIElement | null>(null);

  const activeCount = tasks.filter((task) => !task.completed).length;
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }
    if (filter === "completed") {
      return task.completed;
    }
    return true;
  });
  const isToggleAllChecked = tasks.length > 0 && activeCount === 0;

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  const handleToggleAll = useCallback(() => {
    const allDone = tasks.every((t) => t.completed);
    setTasks(tasks.map((t) => ({ ...t, completed: !allDone })));
  }, [tasks]);

  const addTask = useCallback(() => {
    if (!text.trim()) {
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setText("");

    setTimeout(() => {
      if (filter !== "completed") {
        listEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  }, [text, filter]);

  const handleTaskCheckboxChange = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const updateTaskText = useCallback((id: number, newText: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText.trim() } : t))
    );
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className={styles.page}>
      <ThemeToggle darkMode={darkMode} toggle={toggleDarkMode} />
      <Header />
      <div className={styles.container}>
        <InputRow
          text={text}
          setText={setText}
          addTask={addTask}
          isToggleAllChecked={isToggleAllChecked}
          handleToggleAll={handleToggleAll}
        />
        <ul className={styles.list}>
          {filteredTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskToggle={handleTaskCheckboxChange}
              updateTaskText={updateTaskText}
              deleteTask={deleteTask}
              index={index}
              ref={index === filteredTasks.length - 1 ? listEndRef : null}
            />
          ))}
        </ul>
        <Footer
          activeCount={activeCount}
          filter={filter}
          setFilter={setFilter}
          clearCompleted={() =>
            setTasks((prev) => prev.filter((t) => !t.completed))
          }
        />
      </div>
    </div>
  );
}
