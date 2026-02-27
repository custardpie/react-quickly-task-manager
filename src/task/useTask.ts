import { useContext } from "react";

import TaskContext from "./context";

export type TaskType = {
  id: string;
  title: string;
};

function useTask() {
  return useContext(TaskContext);
}

export default useTask;