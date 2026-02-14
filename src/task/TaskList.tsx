import { useEffect, useReducer } from "react";
import Task from "./Task";
import TaskAdd from "./TaskAdd";
import { initialTasks } from "./fixture";
import { v4 as uuidv4 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
};

function reducer(state: TaskType[], action: { type: string; payload: any }) {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, {id: uuidv4(), title: action.payload.title }];
    case "DELETE_TASK":
      return state.filter(task => task.id !== action.payload);
    case "EDIT_TASK":
      return state.map(task => 
        task.id === action.payload.id ? { ...task, title: action.payload.title } : task
      );
    default:
      return state;
  }
}

function getInitialTasks() : TaskType[] {                            
  return (
    JSON.parse(localStorage.getItem("task-manager-items-list") as string) ||
      initialTasks
  );
}

function TaskList() {
  const [tasks, dispatch] = useReducer(reducer, getInitialTasks());

  useEffect(() => {                                    
    localStorage.setItem(                               
      "task-manager-items-list",                        
      JSON.stringify(tasks)                             
    );                                                  
  }, [tasks]);  


  return (
    <ol className="lane">
      {tasks.map((task) => 
        <Task key={task.id} name={task.title} 
          onDelete={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
          onEdit={(newTitle) => dispatch({ type: "EDIT_TASK", payload: { id: task.id, title: newTitle } })} />)}
      <TaskAdd onAdd={(title) => dispatch({ type: "ADD_TASK", payload: { title } })} />
    </ol>
  );
}

export default TaskList;