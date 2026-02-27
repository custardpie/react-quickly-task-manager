import { useContext } from "react";

import TaskContext from "./context";
import type { TaskContextValue } from "./context";

export interface StepType {
  id: string;
  step: string;
  completed: boolean;
}

export interface TaskType {
  id: string;
  title: string;
  steps: StepType[];
}

function useTask(): TaskContextValue {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}

export default useTask;