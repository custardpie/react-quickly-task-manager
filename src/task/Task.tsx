import TaskHeader from "./TaskHeader";
import { useEffect, useState } from "react";

export type TaskType = {
  id: string;
  title: string;
};

export interface TaskProps extends TaskType {
  onDeleteTask: (taskId: string) => void;
  onCommitTitle: (taskId: string, nextTitle: string) => void;
}

function Task({
  id,
  title,
  onDeleteTask,
  onCommitTitle,
}: Readonly<TaskProps>) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);

  useEffect(() => {
    if (!isEditing) {
      setDraftTitle(title);
    }
  }, [title, isEditing]);

  const handleStartEdit = () => {
    setDraftTitle(title);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDraftTitle(title);
  };

  const handleSave = () => {
    const trimmedTitle = draftTitle.trim();
    if (!trimmedTitle) {
      return;
    }
    onCommitTitle(id, trimmedTitle);
    setIsEditing(false);
  };

  return (
    <li key={id} className="card">
        <TaskHeader
          title={title}
          isEditing={isEditing}
          draftTitle={draftTitle}
          onDraftTitleChange={setDraftTitle}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        <ul className="card-controls">
            <li>
              <button className="card-control" onClick={handleStartEdit}>
                Edit
              </button>
            </li>
            <li>
              <button className="card-control" onClick={() => onDeleteTask(id)}>
                Delete
              </button>
            </li>
        </ul>
    </li>
  );
}

export default Task;