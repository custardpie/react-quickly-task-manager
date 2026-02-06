import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { StepType, TaskType } from "./types";
import { createId, tasksReducer, type TasksAction } from "./reducer";
import { initialTasks } from "./fixture";

export interface TasksContextValue {
  tasks: TaskType[];
  dispatch: Dispatch<TasksAction>;

  addTask: (title: string) => void;
  editTask: (taskId: string, title: string) => void;
  deleteTask: (taskId: string) => void;

  addStep: (taskId: string, title: string) => void;
  editStep: (
    taskId: string,
    stepId: string,
    updates: Partial<Pick<StepType, "title" | "completed">>
  ) => void;
  deleteStep: (taskId: string, stepId: string) => void;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export interface TasksProviderProps {
  children: ReactNode;
  storageKey?: string;
  seedTasks?: TaskType[];
}

function loadTasksFromStorage(storageKey: string, fallback: TaskType[]): TaskType[] {
  try {
    if (globalThis.localStorage === undefined) {
      return fallback;
    }

    const raw = globalThis.localStorage.getItem(storageKey);
    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return fallback;
    }

    return parsed
      .map((task) => {
        if (typeof task !== "object" || task === null) {
          return null;
        }

        const maybeTask = task as Partial<TaskType>;
        if (typeof maybeTask.id !== "string" || typeof maybeTask.title !== "string") {
          return null;
        }

        const steps = Array.isArray(maybeTask.steps)
          ? maybeTask.steps
              .map((step) => {
                if (typeof step !== "object" || step === null) {
                  return null;
                }

                const maybeStep = step as Partial<StepType>;
                if (typeof maybeStep.id !== "string" || typeof maybeStep.title !== "string") {
                  return null;
                }

                return {
                  id: maybeStep.id,
                  title: maybeStep.title,
                  completed: typeof maybeStep.completed === "boolean" ? maybeStep.completed : false,
                } satisfies StepType;
              })
              .filter((s): s is StepType => s !== null)
          : [];

        return { id: maybeTask.id, title: maybeTask.title, steps } satisfies TaskType;
      })
      .filter((t): t is TaskType => t !== null);
  } catch {
    return fallback;
  }
}

export function TasksProvider({
  children,
  storageKey = "task-manager.tasks",
  seedTasks = initialTasks,
}: Readonly<TasksProviderProps>) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    seedTasks,
    (seed) => loadTasksFromStorage(storageKey, seed)
  );

  useEffect(() => {
    try {
      if (globalThis.localStorage === undefined) {
        return;
      }
      globalThis.localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [storageKey, tasks]);

  const value = useMemo<TasksContextValue>(() => {
    const addTask = (title: string) => {
      const task: TaskType = { id: createId(), title, steps: [] };
      dispatch({ type: "ADD_TASK", payload: { task } });
    };

    const editTask = (taskId: string, title: string) => {
      dispatch({ type: "EDIT_TASK", payload: { taskId, title } });
    };

    const deleteTask = (taskId: string) => {
      dispatch({ type: "DELETE_TASK", payload: { taskId } });
    };

    const addStep = (taskId: string, title: string) => {
      const step: StepType = { id: createId(), title, completed: false };
      dispatch({ type: "ADD_STEP", payload: { taskId, step } });
    };

    const editStep = (
      taskId: string,
      stepId: string,
      updates: Partial<Pick<StepType, "title" | "completed">>
    ) => {
      dispatch({ type: "EDIT_STEP", payload: { taskId, stepId, updates } });
    };

    const deleteStep = (taskId: string, stepId: string) => {
      dispatch({ type: "DELETE_STEP", payload: { taskId, stepId } });
    };

    return {
      tasks,
      dispatch,
      addTask,
      editTask,
      deleteTask,
      addStep,
      editStep,
      deleteStep,
    };
  }, [tasks]);

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return ctx;
}
