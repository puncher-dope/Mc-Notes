import { type Task } from "entities/ui/task-card/model";
export type FieldType = {
  login?: string;
  password?: string;
};
export type RegisterResponse = {
  error?: string;
  user?: {
    login: string;
    registeredAt:string
  };
};

export type TasksResponse = {
  error?: string;
  tasks: Task[];
};
export type ApiTaskResponse = {
  data: Task;
}