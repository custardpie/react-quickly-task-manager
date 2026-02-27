import { useState } from "react";
import Button from "../Button";
import TaskHeader from "./TaskHeader";
import useTask, { type TaskType } from "./useTask";

type TaskProps = {
  id : string
}

function Task({id} : Readonly<TaskProps>) {
  const {
    actions: { deleteTask },
  } = useTask()  as { state: { tasks: TaskType[] }; actions: any };
  
  const [isEditing, setIsEditing] = useState(false);

  return (
      <li className="card">
        <TaskHeader id = {id} setEditable={setIsEditing} isEditable={isEditing} />
        <ul className="card-controls">
          <li>
            <Button label="Edit task" icon="pencil" 
              onClick={() => setIsEditing(true)}/>
          </li>
          <li>
            <Button label="Delete task" icon="trash" 
              onClick={() => deleteTask(id)} />
          </li>
        </ul>
      </li>
  )
}

export default Task;