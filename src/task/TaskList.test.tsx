import { render, screen } from "@testing-library/react";
import { jest } from "@jest/globals";
import TaskContext, { type TaskContextValue } from "./context";
import type { TaskType } from "./useTask";
import TaskList from "./TaskList";

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

const tasks: TaskType[] = [
  { id: "task-1", title: "First task", steps: [] },
  { id: "task-2", title: "Second task", steps: [] },
];

describe("TaskList", () => {
  it("renders tasks and the add task card", () => {
    const value: TaskContextValue = {
      state: { tasks },
      actions: createActions(),
    };

    render(
      <TaskContext.Provider value={value}>
        <TaskList />
      </TaskContext.Provider>
    );

    expect(screen.getByText("First task")).toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add new task")).toBeInTheDocument();
  });
});
