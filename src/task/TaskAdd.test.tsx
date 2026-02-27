import { render, screen, fireEvent } from "@testing-library/react";
import { jest } from "@jest/globals";
import TaskContext, { type TaskContextValue } from "./context";
import TaskAdd from "./TaskAdd";

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

describe("TaskAdd", () => {
  it("adds a task and clears input", () => {
    const actions = createActions();
    const value: TaskContextValue = {
      state: { tasks: [] },
      actions,
    };

    render(
      <TaskContext.Provider value={value}>
        <TaskAdd />
      </TaskContext.Provider>
    );

    const input = screen.getByPlaceholderText("Add new task");
    fireEvent.change(input, { target: { value: "New task" } });

    const form = input.closest("form");
    if (!form) {
      throw new Error("Add task form not found");
    }

    fireEvent.submit(form);

    expect(actions.addTask).toHaveBeenCalledWith("New task");
    expect(input).toHaveValue("");
  });
});
