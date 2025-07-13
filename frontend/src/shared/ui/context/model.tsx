import { type TasksResponse } from "pages/model";

export type TasksContextType = {
  tasks: TasksResponse["tasks"];
  selectedTask: TasksResponse["tasks"][0] | null;
  loading: boolean;
  error: Error | string | null;
  fetchTasks: () => Promise<void>;
  createTask: () => Promise<{
    id: string;
    title: string;
    content: string;
    publishedAt: string;
  }>;
  updateTask: (id: string, title: string, content: string) => Promise<void>;
  deleteTask: () => Promise<void>;
  setSelectedTask: (task: TasksResponse["tasks"][0] | null) => void;
};