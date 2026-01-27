export interface UserTasks {
  label: string;
  value: number;
}

export interface User {
  fullName: string;
  createdAt: Date;
  status: string;
  tasks?: UserTasks[];
}
