import TaskHeader from "./TaskHeader";
import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import type { TaskType } from "./types";
import Button from "../Button.tsx";
import { useTasks } from "./TasksContext";

export type TaskProps = TaskType;

function Task({ id, title, steps }: Readonly<TaskProps>) {
  const { addStep, deleteStep, deleteTask, editTask, editStep } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [draftStepTitle, setDraftStepTitle] = useState("");

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
    editTask(id, trimmedTitle);
    setIsEditing(false);
  };

  const handleStartAddStep = () => {
    setIsAddingStep(true);
    setDraftStepTitle("");
  };

  const handleCancelAddStep = () => {
    setIsAddingStep(false);
    setDraftStepTitle("");
  };

  const handleSubmitStep = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = draftStepTitle.trim();
    if (!trimmedTitle) {
      return;
    }
    addStep(id, trimmedTitle);
    setDraftStepTitle("");
    setIsAddingStep(false);
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

        <ol className="progress-steps">
          {steps.map((step) => (
            <li key={step.id} className="step">
              <label className="step-label">
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={(e) =>
                    editStep(id, step.id, { completed: e.target.checked })
                  }
                />
                {step.title}
              </label>
              <Button
                type="button"
                className="step-button card-control"
                icon="trash"
                label="Delete step"
                onClick={() => deleteStep(id, step.id)}
              />
            </li>
          ))}

          {isAddingStep ? (
            <li className="step">
              <form className="step-form" onSubmit={handleSubmitStep}>
                <input
                  type="text"
                  value={draftStepTitle}
                  onChange={(e) => setDraftStepTitle(e.target.value)}
                  placeholder="New step"
                  autoFocus
                />
                <span style={{ display: "flex", gap: 8 }}>
                  <Button
                    type="submit"
                    className="card-control"
                    icon="plus"
                    label="Add step"
                  />
                  <Button
                    type="button"
                    className="card-control"
                    icon="cancel"
                    label="Cancel"
                    onClick={handleCancelAddStep}
                  />
                </span>
              </form>
            </li>
          ) : null}
        </ol>

        <ul className="card-controls">
            <li>
              <Button
                type="button"
                className="card-control"
                icon="plus"
                label="Add step"
                onClick={handleStartAddStep}
              />
            </li>
            <li>
              <Button
                type="button"
                className="card-control"
                icon="pencil"
                label="Edit task"
                onClick={handleStartEdit}
              />
            </li>
            <li>
              <Button
                type="button"
                className="card-control"
                icon="trash"
                label="Delete task"
                onClick={() => deleteTask(id)}
              />
            </li>
        </ul>
    </li>
  );
}

export default Task;