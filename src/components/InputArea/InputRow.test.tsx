import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { InputRow } from "./InputRow";

describe("InputRow", () => {
  it("calls setText on input change", () => {
    const setText = vi.fn();
    const addTask = vi.fn();
    const handleToggleAll = vi.fn();

    render(
      <InputRow
        text="initial"
        setText={setText}
        addTask={addTask}
        isToggleAllChecked={false}
        handleToggleAll={handleToggleAll}
      />
    );

    const input = screen.getByPlaceholderText("What needs to be done?");
    expect(input.tagName).toBe("INPUT");
    fireEvent.change(input, { target: { value: "new" } });
    expect(setText).toHaveBeenCalledWith("new");
  });

  it("calls addTask on Enter if text is not empty", () => {
    const setText = vi.fn();
    const addTask = vi.fn();
    const handleToggleAll = vi.fn();

    render(
      <InputRow
        text="new task"
        setText={setText}
        addTask={addTask}
        isToggleAllChecked={false}
        handleToggleAll={handleToggleAll}
      />
    );

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(addTask).toHaveBeenCalled();
  });

  it("does not call addTask on Enter if text is whitespaces", () => {
    const setText = vi.fn();
    const addTask = vi.fn();
    const handleToggleAll = vi.fn();

    render(
      <InputRow
        text="   "
        setText={setText}
        addTask={addTask}
        isToggleAllChecked={false}
        handleToggleAll={handleToggleAll}
      />
    );

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(addTask).not.toHaveBeenCalled();
  });

  it("toggle checkbox is controlled and calls handleToggleAll", () => {
    const setText = vi.fn();
    const addTask = vi.fn();
    const handleToggleAll = vi.fn();

    const { rerender } = render(
      <InputRow
        text=""
        setText={setText}
        addTask={addTask}
        isToggleAllChecked={false}
        handleToggleAll={handleToggleAll}
      />
    );

    const checkbox = screen.getByLabelText(
      "Toggle all tasks"
    ) as HTMLInputElement;
    expect(checkbox.getAttribute("type")).toBe("checkbox");
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(handleToggleAll).toHaveBeenCalled();

    rerender(
      <InputRow
        text=""
        setText={setText}
        addTask={addTask}
        isToggleAllChecked={true}
        handleToggleAll={handleToggleAll}
      />
    );

    const updatedCheckbox = screen.getByLabelText(
      "Toggle all tasks"
    ) as HTMLInputElement;
    expect(updatedCheckbox.checked).toBe(true);
    expect(updatedCheckbox.title).toBe("Mark all as active");
  });
});
