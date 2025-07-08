import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskItem } from "./TaskItem";

const baseTask = { id: 1, text: "Buy milk", completed: false };

describe("TaskItem", () => {
  it("renders task text and toggles checkbox", () => {
    const handleToggle = vi.fn();
    const updateText = vi.fn();
    const deleteTask = vi.fn();

    render(
      <TaskItem
        task={baseTask}
        handleTaskToggle={handleToggle}
        updateTaskText={updateText}
        deleteTask={deleteTask}
        index={0}
        ref={null}
      />
    );

    const checkbox = screen.getByRole("checkbox", {
      name: /toggle task/i,
    }) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(handleToggle).toHaveBeenCalledWith(baseTask.id);

    const textElement = screen.getByText("Buy milk");
    expect(textElement.tagName).toBe("SPAN");
  });

  it("enters edit mode and updates task on blur", () => {
    const handleToggle = vi.fn();
    const updateText = vi.fn();
    const deleteTask = vi.fn();

    render(
      <TaskItem
        task={baseTask}
        handleTaskToggle={handleToggle}
        updateTaskText={updateText}
        deleteTask={deleteTask}
        index={0}
        ref={null}
      />
    );

    fireEvent.click(screen.getByText("Buy milk"));
    const input = screen.getByDisplayValue("Buy milk");
    fireEvent.change(input, { target: { value: "Buy bread" } });
    fireEvent.blur(input);
    expect(updateText).toHaveBeenCalledWith(baseTask.id, "Buy bread");
  });

  it("cancels editing on Escape", () => {
    const handleToggle = vi.fn();
    const updateText = vi.fn();
    const deleteTask = vi.fn();

    render(
      <TaskItem
        task={baseTask}
        handleTaskToggle={handleToggle}
        updateTaskText={updateText}
        deleteTask={deleteTask}
        index={0}
        ref={null}
      />
    );

    fireEvent.click(screen.getByText("Buy milk"));
    const input = screen.getByDisplayValue("Buy milk");

    fireEvent.change(input, { target: { value: "New value" } });
    fireEvent.keyDown(input, { key: "Escape" });

    expect(updateText).not.toHaveBeenCalled();
    expect(screen.getByText("Buy milk")).toBeTruthy();
  });

  it("calls deleteTask on delete button click", () => {
    const handleToggle = vi.fn();
    const updateText = vi.fn();
    const deleteTask = vi.fn();

    render(
      <TaskItem
        task={baseTask}
        handleTaskToggle={handleToggle}
        updateTaskText={updateText}
        deleteTask={deleteTask}
        index={0}
        ref={null}
      />
    );

    const deleteBtn = screen.getByRole("button", { name: /delete task/i });
    fireEvent.click(deleteBtn);
    expect(deleteTask).toHaveBeenCalledWith(baseTask.id);
  });
});
