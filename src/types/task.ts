export interface Task {
  idTask: number;
  title: string;
  description: string;
  status: string;
  idUser: number;
}

export type TaskStatus = "Not Started" | "Started" | "Completed" | "Canceled";
