import { useState, type SubmitEventHandler } from "react";
import Button from "../Button";
import useTask, { type TaskType }  from "./useTask";

function TaskAdd() {
  const {
    actions: { addTask },
  } = useTask() as { state: { tasks: TaskType[] }; actions: any };

  const [input, setInput] = useState("");

  const handleSubmit: SubmitEventHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input.trim());
      setInput("");
    }
  };

  return (
      <li className="card">
        <header className="card-header card-header-new">
          <form className="card-title-form" onSubmit={handleSubmit}>
            <input
              className="card-title card-title-input"
              placeholder="Add new task"
              name="title"
              value={input}
              onChange={e => setInput(e.target.value)} />
            <Button label="Add task" icon="plus" type="submit" />
          </form>
        </header>
      </li>
  )
}

export default TaskAdd;