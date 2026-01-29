export interface UserTasks {
  label: string;
  value: number;
}

export interface User {
  name: string;
  createdAt: Date;
  status: string;
  email: string;
  password: string;
  tasks?: UserTasks[];
}
