import type { TaskType } from "./Task.tsx";
import Task from "./Task.tsx";
import TaskAdd from "./TaskAdd.tsx";
import { initialTasks } from "./fixture";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

function TaskList() {
  const [tasks, setTasks] = useLocalStorageState<TaskType[]>(
    "task-manager.tasks",
    initialTasks
  );

  const handleAddTask = (title: string) => {
    const id = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const newTask: TaskType = { id, title };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleCommitTitle = (taskId: string, nextTitle: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: nextTitle } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <ol className="lane">
    {
      tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onDeleteTask={handleDeleteTask}
          onCommitTitle={handleCommitTitle}
        />
      ))
    }
    <TaskAdd onAddTask={handleAddTask} />
    </ol>
  );
}

export default TaskList;