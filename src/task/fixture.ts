import { type TaskType }  from "./useTask";
import { v4 as uuidv4 } from "uuid";

const initialState : TaskType[] = [
  {
    id: "1",
    title: "Make task manager",
    steps: [
      { id: "1", step: "Find design", completed: true },
      { id: "2", step: "Implement styles", completed: true },
      { id: "3", step: "Add components", completed: true },
      { id: "4", step: "Create state", completed: true },
      { id: "5", step: "Make reducer", completed: true },
      { id: "6", step: "Apply events", completed: true },
      { id: "7", step: "Enjoy result", completed: false },
    ],
  },
];

export default initialState;