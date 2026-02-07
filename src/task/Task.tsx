import Button from "./Button";
import TaskHeader from "./TaskHeader";

type TaskProps = {
  name : string
}

function Task({name} : Readonly<TaskProps>) {
  return (
      <li className="card">
        <TaskHeader name = {name} />
        <ul className="card-controls">
          <li>
            <Button action="Edit task" icon="pencil" />
          </li>
          <li>
            <Button action="Delete task" icon="trash" />
          </li>
        </ul>
      </li>
  )
}

export default Task;