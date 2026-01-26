export interface UserTasks {
  label: string;
  value: number;
}

export interface User {
  fullName: string;
  tasks: UserTasks[];
}
