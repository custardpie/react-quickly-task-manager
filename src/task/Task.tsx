import { useState, type SubmitEventHandler } from "react";
import Button from "../Button";
import TaskHeader from "./TaskHeader";
import useTask, { type TaskType } from "./useTask";

type TaskProps = {
  id : string
}

function Task({id} : Readonly<TaskProps>) {
  const {
    state: { tasks },
    actions: { deleteTask, editStep, addStep, deleteStep, moveStep, moveStepTo },
  } = useTask();
  
  const task = tasks.find((t: TaskType) => t.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newStepText, setNewStepText] = useState("");
  const [draggedStepId, setDraggedStepId] = useState<string | null>(null);

  if (!task) return null;

  const handleAddStep: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (newStepText.trim()) {
      addStep(id, newStepText);
      setNewStepText("");
    }
  };

  const totalSteps = task.steps.length;
  const completedSteps = task.steps.filter((step) => step.completed).length;
  const progressMax = totalSteps === 0 ? 1 : totalSteps;

  const handleDragStart = (stepId: string) => (event: React.DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("text/plain", stepId);
    event.dataTransfer.effectAllowed = "move";
    setDraggedStepId(stepId);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (targetIndex: number) => (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    const stepId = event.dataTransfer.getData("text/plain") || draggedStepId;
    if (!stepId) return;
    moveStepTo(id, stepId, targetIndex);
    setDraggedStepId(null);
  };

  const handleDragEnd = () => {
    setDraggedStepId(null);
  };

  return (
      <li className="card">
        <TaskHeader id = {id} setEditable={setIsEditing} isEditable={isEditing} />
        <ul className="card-controls">
          <li>
            <Button label={isExpanded ? "Hide steps" : "Show steps"} icon={isExpanded ? "up" : "down"} 
              onClick={() => setIsExpanded(!isExpanded)}/>
          </li>
          <li>
            <Button label="Edit task" icon="pencil" 
              onClick={() => setIsEditing(true)}/>
          </li>
          <li>
            <Button label="Delete task" icon="trash" 
              onClick={() => deleteTask(id)} />
          </li>
        </ul>
        <div className="progress">
          <progress className="progress-bar" value={completedSteps} max={progressMax} />
        </div>
        {isExpanded && (
          <>
            {task.steps.length > 0 && (
              <ol className="card-steps">
                {task.steps.map((step, index) => (
                  <li
                    key={step.id}
                    className="step"
                    draggable
                    onDragStart={handleDragStart(step.id)}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop(index)}
                    onDragEnd={handleDragEnd}
                  >
                    <span className="step-handle" aria-hidden="true">::</span>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={step.completed}
                        onChange={() => editStep(id, step.id, step.step, !step.completed)}
                      />
                      <span className={step.completed ? "completed" : ""}>{step.step}</span>
                    </label>
                    <div className="step-actions">
                      <Button
                        label="Move step up"
                        icon="up"
                        onClick={() => moveStep(id, step.id, "up")}
                        disabled={index === 0}
                      />
                      <Button
                        label="Move step down"
                        icon="down"
                        onClick={() => moveStep(id, step.id, "down")}
                        disabled={index === task.steps.length - 1}
                      />
                      <Button 
                        label="Delete step" 
                        icon="trash" 
                        onClick={() => deleteStep(id, step.id)}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            )}
            <form className="card-add-step" onSubmit={handleAddStep}>
              <input 
                type="text"
                placeholder="Add a new step..."
                value={newStepText}
                onChange={(e) => setNewStepText(e.currentTarget.value)}
              />
              <Button label="Add step" icon="plus" />
            </form>
          </>
        )}
      </li>
  )
}

export default Task;