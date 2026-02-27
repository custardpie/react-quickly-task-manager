import { render, screen, fireEvent } from "@testing-library/react";
import { jest } from "@jest/globals";
import TaskContext, { type TaskContextValue } from "./context";
import type { TaskType } from "./useTask";
import TaskHeader from "./TaskHeader";

const task: TaskType = {
  id: "task-1",
  title: "Sample task",
  steps: [],
};

const createActions = (): TaskContextValue["actions"] => ({
  addTask: jest.fn(),
  editTask: jest.fn(),
  deleteTask: jest.fn(),
  addStep: jest.fn(),
  editStep: jest.fn(),
  deleteStep: jest.fn(),
  moveStep: jest.fn(),
  moveStepTo: jest.fn(),
});

describe("TaskHeader", () => {
  it("shows the task title when not editing", () => {
    const value: TaskContextValue = {
      state: { tasks: [task] },
      actions: createActions(),
    };

    render(
      <TaskContext.Provider value={value}>
        <TaskHeader id={task.id} isEditable={false} setEditable={jest.fn()} />
      </TaskContext.Provider>
    );

    expect(screen.getByText("Sample task")).toBeInTheDocument();
  });

  it("submits edits and exits edit mode", () => {
    const actions = createActions();
    const setEditable = jest.fn();
    const value: TaskContextValue = {
      state: { tasks: [task] },
      actions,
    };

    render(
      <TaskContext.Provider value={value}>
        <TaskHeader id={task.id} isEditable={true} setEditable={setEditable} />
      </TaskContext.Provider>
    );

    const input = screen.getByDisplayValue("Sample task");
    fireEvent.change(input, { target: { value: "Updated task" } });

    const form = input.closest("form");
    if (!form) {
      throw new Error("Edit task form not found");
    }

    fireEvent.submit(form);

    expect(actions.editTask).toHaveBeenCalledWith(task.id, "Updated task");
    expect(setEditable).toHaveBeenCalledWith(false);
  });
});
