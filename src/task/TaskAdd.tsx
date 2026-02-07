import { useState, type SubmitEventHandler } from "react";
import Button from "../Button";

type TaskAddProps = {
  onAdd: (title: string) => void;
};

function TaskAdd({ onAdd } : Readonly<TaskAddProps>) {
  const [input, setInput] = useState("");

  const handleSubmit: SubmitEventHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
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
            <Button action="Add task" icon="plus" />
          </form>
        </header>
      </li>
  )
}

export default TaskAdd;