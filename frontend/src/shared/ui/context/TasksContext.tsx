import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { request } from "shared/utils";
import type { ApiTaskResponse, TasksResponse } from "pages/model";
import { type TasksContextType } from "./model";


const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<TasksResponse["tasks"]>([]);
  const [selectedTask, setSelectedTask] = useState<
    TasksResponse["tasks"][0] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
     
      setLoading(true);
      const { error, data } = await request<TasksResponse>(
        "http://localhost:3001/api/tasks",
        "GET"
      );
      if (error) throw new Error(error);
      if (!data) throw new Error("No data received");

      setTasks(data.tasks);
      setError(null);
      if (data.tasks.length > 0) {
        setSelectedTask(data.tasks[0]);
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setError(err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async () => {
    try {
      const { error, data: response } = await request<ApiTaskResponse>(
        "http://localhost:3001/api/tasks",
        "POST",
        {
          title: "Новый пост",
          content: "Начните писать здесь...",
        }
      );
      if (error) throw new Error(error);
      if (!response?.data) throw new Error("почтовые данные не получены");

      const newTask = { ...response.data };
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setSelectedTask(newTask);
      return newTask;
    } catch (error) {
      console.error("Ошибка при создании поста:", error);
      setError(error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }, []);

  const updateTask = useCallback(async (id: string, title: string, content: string) => {
    try {
      const { error } = await request(
        `http://localhost:3001/api/tasks/${id}`,
        "PATCH",
        { title, content }
      );

      if (error) throw new Error(error || "Failed to update task");

      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, title, content } : task
      );

      setTasks(updatedTasks);
      if (selectedTask?.id === id) {
        setSelectedTask({ ...selectedTask, title, content });
      }
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      throw error;
    }
  },[selectedTask, tasks]) 

  const deleteTask = useCallback(async () => {
    if (!selectedTask) return;

    try {
      const { error } = await request(
        `http://localhost:3001/api/tasks/${selectedTask.id}`,
        "DELETE"
      );

      if (error) {
        throw new Error(error || "Failed to delete task");
      }
      const updatedTasks = tasks.filter((task) => task.id !== selectedTask.id);
      setTasks(updatedTasks);

      setSelectedTask(updatedTasks.length > 0 ? updatedTasks[0] : null);
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  },[selectedTask, tasks]) 

  return (
    <TasksContext.Provider
      value={{
        tasks,
        selectedTask,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        setSelectedTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
