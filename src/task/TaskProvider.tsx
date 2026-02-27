import { useEffect, useState} from "react";
import initialState from "./fixture";
import { v4 as uuidv4 } from "uuid";
import TaskContext from "./context";
import type { TaskType } from "./useTask";

export function getInitialState() : TaskType[] {                            
  return (
    JSON.parse(localStorage.getItem("task-manager-items-steps") as string) ||
      initialState
  );
}

function TaskProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [tasks, setTasks] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem("task-manager-items-steps", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) =>
    setTasks((ts) =>
      ts.concat([{ id: uuidv4(), title }])
    );

  const editTask = (id: string, title: string) =>
    setTasks((ts) =>
      ts.map((task) => (task.id === id ? { ...task, title } : task))
    );

  const deleteTask = (id: string) =>
    setTasks((ts) => ts.filter((task) => task.id !== id));

  const value = {
    state: {
      tasks,
    },
    actions: {
      addTask,
      editTask,
      deleteTask
    },
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskProvider;