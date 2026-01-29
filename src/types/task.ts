export interface Task {
  idTask: number;
  title: string;
  description: string;
  status: string;
  id: string;
}

export type TaskStatus = "Not Started" | "Started" | "Completed" | "Canceled";
