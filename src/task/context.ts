import { createContext } from "react";
import type { TaskType } from "./useTask";

export type { TaskType };

export interface TaskContextValue {
  state: {
    tasks: TaskType[];
  };
  actions: {
    addTask: (title: string) => void;
    editTask: (id: string, title: string) => void;
    deleteTask: (id: string) => void;
    addStep: (taskId: string, step: string) => void;
    editStep: (taskId: string, stepId: string, step: string, completed: boolean) => void;
    deleteStep: (taskId: string, stepId: string) => void;
    moveStep: (taskId: string, stepId: string, direction: "up" | "down") => void;
    moveStepTo: (taskId: string, stepId: string, index: number) => void;
  };
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export default TaskContext;