import { useState } from "react";
import Task from "./Task";
import TaskAdd from "./TaskAdd";
import { initialTasks } from "./fixture";
import { v4 as uuidv4 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
};

function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);

  function addTask(title: string) {
    const newTask: TaskType = {
      id: uuidv4(),
      title,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function editTask(id: string, newTitle: string) {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title: newTitle } : task
    ));
  }

  return (
    <ol className="lane">
      {tasks.map((task) => 
        <Task key={task.id} name={task.title} 
          onDelete={() => deleteTask(task.id)}
          onEdit={(newTitle) => editTask(task.id, newTitle)} />)}
      <TaskAdd onAdd={addTask} />
    </ol>
  );
}

export default TaskList;