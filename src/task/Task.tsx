import { useState } from "react";
import Button from "../Button";
import TaskHeader from "./TaskHeader";

type TaskProps = {
  name : string,
  onDelete : () => void,
  onEdit : (newTitle: string) => void
}

function Task({name, onDelete, onEdit} : Readonly<TaskProps>) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (newTitle: string) => {
    onEdit(newTitle);
    setIsEditing(false);
  }

  return (
      <li className="card">
        <TaskHeader name = {name} updateTask={handleUpdate} isEditable={isEditing} />
        <ul className="card-controls">
          <li>
            <Button label="Edit task" icon="pencil" 
              onClick={() => setIsEditing(true)}/>
          </li>
          <li>
            <Button label="Delete task" icon="trash" 
              onClick={onDelete} />
          </li>
        </ul>
      </li>
  )
}

export default Task;