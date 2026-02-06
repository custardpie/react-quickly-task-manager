import type { TaskType } from "./types";

export const initialTasks: TaskType[] = [
  {
    id: "1",
    title: "This is a task",
    steps: [
      { id: "1-1", title: "First step", completed: false },
      { id: "1-2", title: "Second step", completed: true },
    ],
  },
  {
    id: "2",
    title: "This is another task",
    steps: [{ id: "2-1", title: "Only step", completed: false }],
  },
];
