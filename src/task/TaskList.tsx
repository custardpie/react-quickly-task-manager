import Task from "./Task.tsx";
import TaskAdd from "./TaskAdd.tsx";
import { useTasks } from "./TasksContext";

function TaskList() {
  const { tasks } = useTasks();

  return (
    <ol className="lane">
    {
      tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
        />
      ))
    }
    <TaskAdd />
    </ol>
  );
}

export default TaskList;