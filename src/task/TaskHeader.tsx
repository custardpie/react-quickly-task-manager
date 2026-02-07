import { useState, type SubmitEventHandler } from "react";
import Button from "../Button";

type TaskHeaderProps = {
  name : string,
  isEditable: boolean,
  updateTask : (newTitle: string) => void
}

function TaskHeader({name, isEditable, updateTask} : Readonly<TaskHeaderProps>) {
  const [input, setInput] = useState(name);
  
  const handleSubmit: SubmitEventHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      updateTask(input.trim());
    }
  };

  return (
    <header className="card-header">
      {isEditable ?
        <form className="card-title-form" onSubmit={handleSubmit}>
          <input className="card-title card-title-input" 
            value={input} 
            onChange={e => setInput(e.target.value)} />
          <Button label="Update task" icon="save" />
        </form> :
        <p className="card-title">{name}</p>
    }
    </header>
  )
}

export default TaskHeader;