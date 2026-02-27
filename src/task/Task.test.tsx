import { render, screen, fireEvent } from "@testing-library/react";
import TaskContext, { type TaskContextValue } from "./context";
import type { TaskType } from "./useTask";
import Task from "./Task";

const baseTask: TaskType = {
  id: "task-1",
  title: "Sample task",
  steps: [
    { id: "step-1", step: "Find design", completed: false },
    { id: "step-2", step: "Implement styles", completed: true },
  ],
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

const renderTask = (task: TaskType = baseTask) => {
  const actions = createActions();
  const value: TaskContextValue = {
    state: { tasks: [task] },
    actions,
  };

  render(
    <TaskContext.Provider value={value}>
      <Task id={task.id} />
    </TaskContext.Provider>
  );

  return { actions, task };
};

const expandSteps = () => {
  const showStepsButton = screen.getByAltText("Show steps").closest("button");
  if (!showStepsButton) {
    throw new Error("Show steps button not found");
  }
  fireEvent.click(showStepsButton);
};

describe("Task", () => {
  it("renders progress based on completed steps", () => {
    renderTask();

    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("value", "1");
    expect(progress).toHaveAttribute("max", "2");
  });

  it("toggles a step completion via checkbox", () => {
    const { actions, task } = renderTask();
    expandSteps();

    const checkbox = screen.getByLabelText("Find design");
    fireEvent.click(checkbox);

    expect(actions.editStep).toHaveBeenCalledWith(
      task.id,
      "step-1",
      "Find design",
      true
    );
  });

  it("adds a new step at the end", () => {
    const { actions, task } = renderTask();
    expandSteps();

    const input = screen.getByPlaceholderText("Add a new step...");
    fireEvent.change(input, { target: { value: "New step" } });

    const form = input.closest("form");
    if (!form) {
      throw new Error("Add step form not found");
    }
    fireEvent.submit(form);

    expect(actions.addStep).toHaveBeenCalledWith(task.id, "New step");
  });

  it("deletes a step", () => {
    const { actions, task } = renderTask();
    expandSteps();

    const deleteButtons = screen.getAllByAltText("Delete step");
    const deleteButton = deleteButtons[0]?.closest("button");
    if (!deleteButton) {
      throw new Error("Delete step button not found");
    }

    fireEvent.click(deleteButton);

    expect(actions.deleteStep).toHaveBeenCalledWith(task.id, "step-1");
  });

  it("moves a step down", () => {
    const { actions, task } = renderTask();
    expandSteps();

    const moveDownButtons = screen.getAllByAltText("Move step down");
    const moveDownButton = moveDownButtons[0]?.closest("button");
    if (!moveDownButton) {
      throw new Error("Move step down button not found");
    }

    fireEvent.click(moveDownButton);

    expect(actions.moveStep).toHaveBeenCalledWith(task.id, "step-1", "down");
  });
});
