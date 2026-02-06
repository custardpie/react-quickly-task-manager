import Button from "../Button.tsx";

import { useState } from "react";
import type { SyntheticEvent } from "react";

export interface TaskAddProps {
  onAddTask: (title: string) => void;
}

function TaskAdd({ onAddTask }: Readonly<TaskAddProps>) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }
    onAddTask(trimmedTitle);
    setTitle("");
  };

  return (
    <li className="card">
      <header className="card-header card-header-new">
        <form className="card-title-form" onSubmit={handleSubmit}>
          <input
            className="card-title card-title-input"
            placeholder="Add new task"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" icon="plus" label="Add task" />
        </form>
      </header>
    </li>
  );
}
export default TaskAdd;