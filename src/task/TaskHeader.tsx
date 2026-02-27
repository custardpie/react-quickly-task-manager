import { type SubmitEventHandler } from "react";
import Button from "../Button";
import useTask, {type TaskType } from "./useTask";

type TaskHeaderProps = {
  id : string,
  isEditable: boolean,
  setEditable : (editable: boolean) => void
}

function TaskHeader({id, isEditable, setEditable} : Readonly<TaskHeaderProps>) {
  const {
    state: { tasks },
    actions: { editTask },
  } = useTask() as { state: { tasks: TaskType[] }; actions: any };

  const task = tasks.find((task: TaskType) => task.id === id);
  
  const handleEditTask: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    editTask(id, title);
    setEditable(false);
  };

  return (
    <header className="card-header">
      {isEditable ?
        <form className="card-title-form" onSubmit={handleEditTask}>
          <input className="card-title card-title-input" 
            defaultValue={task?.title}
            name="title" />
          <Button label="Update task" icon="save" />
        </form> :
        <p className="card-title">{task?.title}</p>
    }
    </header>
  )
}

export default TaskHeader;