import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { TasksProvider, useTasks } from "shared/ui/context/TasksContext";
import styles from "./index.module.css";
import { TasksList } from "shared/ui/components/TaskList";
import { TaskEditor } from "shared/ui/components/TaskEditor";

const TodoListPageContent: React.FC = () => {
  const { fetchTasks, loading, error } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    title: "",
    content: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (error) return <div>Что-то пошло не так</div>;
  if (loading) return <Spin size="large" />;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <TasksList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />

        <div className={styles.markdownPreview}>
          <TaskEditor
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editedData={editedData}
            setEditedData={setEditedData}
          />
        </div>
      </div>
    </div>
  );
};

export const TodoListPage: React.FC = () => {
  return (
    <TasksProvider>
      <TodoListPageContent />
    </TasksProvider>
  );
};
