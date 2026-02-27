import Task from "./Task";
import TaskAdd from "./TaskAdd";
import useTask, { type TaskType }  from "./useTask";

function TaskList() {
  const {
    state: { tasks },
  } = useTask() as { state: { tasks: TaskType[] }; actions: any };

  return (
    <ol className="lane">
      {tasks.map((task) => 
        <Task key={task.id} id={task.id} />)}
      <TaskAdd />
    </ol>
  );
}

export default TaskList;