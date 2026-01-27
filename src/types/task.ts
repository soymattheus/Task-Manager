export type TaskStatus = "Not Started" | "Started" | "Completed" | "Canceled";

export interface Task {
  id_task: string;
  title: string;
  description: string;
  status: TaskStatus;
}
