import { useState } from "react";
import Task from "./Task";
import TaskAdd from "./TaskAdd";
import { initialTasks } from "./fixture";

export type TaskType = {
  id: string;
  title: string;
};

function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <ol className="lane">
      {tasks.map((task) => <Task key={task.id} name={task.title} />)}
      <TaskAdd />
    </ol>
  );
}

export default TaskList;