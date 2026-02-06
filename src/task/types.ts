export interface StepType {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskType {
  id: string;
  title: string;
  steps: StepType[];
}
