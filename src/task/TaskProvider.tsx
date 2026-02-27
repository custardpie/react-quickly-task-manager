import { useEffect, useReducer } from "react";
import initialState from "./fixture";
import { v4 as uuidv4 } from "uuid";
import TaskContext from "./context";
import type { TaskType, TaskContextValue } from "./context";

export function getInitialState(): TaskType[] {
  return (
    JSON.parse(localStorage.getItem("task-manager-items-steps") as string) ||
    initialState
  );
}

type TaskAction =
  | { type: "task/add"; id: string; title: string }
  | { type: "task/edit"; id: string; title: string }
  | { type: "task/delete"; id: string }
  | { type: "step/add"; taskId: string; stepId: string; step: string }
  | { type: "step/edit"; taskId: string; stepId: string; step: string; completed: boolean }
  | { type: "step/delete"; taskId: string; stepId: string }
  | { type: "step/move"; taskId: string; stepId: string; direction: "up" | "down" }
  | { type: "step/moveTo"; taskId: string; stepId: string; index: number };

function tasksReducer(state: TaskType[], action: TaskAction): TaskType[] {
  switch (action.type) {
    case "task/add":
      return state.concat([{ id: action.id, title: action.title, steps: [] }]);
    case "task/edit":
      return state.map((task) =>
        task.id === action.id ? { ...task, title: action.title } : task
      );
    case "task/delete":
      return state.filter((task) => task.id !== action.id);
    case "step/add":
      return state.map((task) =>
        task.id === action.taskId
          ? {
              ...task,
              steps: [...task.steps, { id: action.stepId, step: action.step, completed: false }],
            }
          : task
      );
    case "step/edit":
      return state.map((task) =>
        task.id === action.taskId
          ? {
              ...task,
              steps: task.steps.map((s) =>
                s.id === action.stepId ? { ...s, step: action.step, completed: action.completed } : s
              ),
            }
          : task
      );
    case "step/delete":
      return state.map((task) =>
        task.id === action.taskId
          ? { ...task, steps: task.steps.filter((s) => s.id !== action.stepId) }
          : task
      );
    case "step/move":
      return state.map((task) => {
        if (task.id !== action.taskId) return task;
        const index = task.steps.findIndex((s) => s.id === action.stepId);
        if (index === -1) return task;
        const targetIndex = action.direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= task.steps.length) return task;
        const steps = [...task.steps];
        [steps[index], steps[targetIndex]] = [steps[targetIndex], steps[index]];
        return { ...task, steps };
      });
    case "step/moveTo":
      return state.map((task) => {
        if (task.id !== action.taskId) return task;
        const fromIndex = task.steps.findIndex((s) => s.id === action.stepId);
        if (fromIndex === -1) return task;
        const clampedIndex = Math.max(0, Math.min(action.index, task.steps.length - 1));
        if (fromIndex === clampedIndex) return task;
        const steps = [...task.steps];
        const [moved] = steps.splice(fromIndex, 1);
        steps.splice(clampedIndex, 0, moved);
        return { ...task, steps };
      });
    default:
      return state;
  }
}

function TaskProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [tasks, dispatch] = useReducer(tasksReducer, [], getInitialState);

  useEffect(() => {
    localStorage.setItem("task-manager-items-steps", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) =>
    dispatch({ type: "task/add", id: uuidv4(), title });

  const editTask = (id: string, title: string) =>
    dispatch({ type: "task/edit", id, title });

  const deleteTask = (id: string) =>
    dispatch({ type: "task/delete", id });

  const addStep = (taskId: string, step: string) =>
    dispatch({ type: "step/add", taskId, stepId: uuidv4(), step });

  const editStep = (taskId: string, stepId: string, step: string, completed: boolean) =>
    dispatch({ type: "step/edit", taskId, stepId, step, completed });

  const deleteStep = (taskId: string, stepId: string) =>
    dispatch({ type: "step/delete", taskId, stepId });

  const moveStep = (taskId: string, stepId: string, direction: "up" | "down") =>
    dispatch({ type: "step/move", taskId, stepId, direction });

  const moveStepTo = (taskId: string, stepId: string, index: number) =>
    dispatch({ type: "step/moveTo", taskId, stepId, index });

  const value: TaskContextValue = {
    state: {
      tasks,
    },
    actions: {
      addTask,
      editTask,
      deleteTask,
      addStep,
      editStep,
      deleteStep,
      moveStep,
      moveStepTo,
    },
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskProvider;