import type { StepType, TaskType } from "./types";

export type TasksAction =
  | {
      type: "ADD_TASK";
      payload: { task: TaskType };
    }
  | {
      type: "EDIT_TASK";
      payload: { taskId: string; title: string };
    }
  | {
      type: "DELETE_TASK";
      payload: { taskId: string };
    }
  | {
      type: "ADD_STEP";
      payload: { taskId: string; step: StepType };
    }
  | {
      type: "EDIT_STEP";
      payload: {
        taskId: string;
        stepId: string;
        updates: Partial<Pick<StepType, "title" | "completed">>;
      };
    }
  | {
      type: "DELETE_STEP";
      payload: { taskId: string; stepId: string };
    };

export function tasksReducer(state: TaskType[], action: TasksAction): TaskType[] {
  switch (action.type) {
    case "ADD_TASK": {
      return [...state, action.payload.task];
    }

    case "EDIT_TASK": {
      const { taskId, title } = action.payload;
      return state.map((task) => (task.id === taskId ? { ...task, title } : task));
    }

    case "DELETE_TASK": {
      const { taskId } = action.payload;
      return state.filter((task) => task.id !== taskId);
    }

    case "ADD_STEP": {
      const { taskId, step } = action.payload;
      return state.map((task) =>
        task.id === taskId ? { ...task, steps: [...task.steps, step] } : task
      );
    }

    case "EDIT_STEP": {
      const { taskId, stepId, updates } = action.payload;
      return state.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          steps: task.steps.map((step) =>
            step.id === stepId ? { ...step, ...updates } : step
          ),
        };
      });
    }

    case "DELETE_STEP": {
      const { taskId, stepId } = action.payload;
      return state.map((task) =>
        task.id === taskId
          ? { ...task, steps: task.steps.filter((step) => step.id !== stepId) }
          : task
      );
    }

    default: {
      return state;
    }
  }
}

export function createId(): string {
  if (globalThis.crypto !== undefined && "randomUUID" in globalThis.crypto) {
    return globalThis.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
