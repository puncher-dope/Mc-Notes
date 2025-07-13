import { Button } from "antd";
import { TaskCard } from "entities/ui";
import { SearchInput } from "features";
import { useTasks } from "../context/TasksContext";
import styles from "./index.module.css";
import { type TasksListProps } from "./model";

export const TasksList: React.FC<TasksListProps> = ({
  searchTerm,
  setSearchTerm,
  isEditing,
  setIsEditing,
}) => {
  const { tasks, selectedTask, loading, createTask, setSelectedTask } = useTasks();

  const filteredTasks = tasks.filter((task) => {
    if (!task || !task.title || !task.content) return false;
    const search = searchTerm?.toLowerCase() || "";
    return (
      task.title.toLowerCase().includes(search) ||
      task.content.toLowerCase().includes(search)
    );
  });

  const handleCreateNewTask = async () => {
    setSearchTerm("");
    const newTask = await createTask();
    if (newTask) {
      setIsEditing(true);
    }
  };

  if (loading) return null;

  return (
    <div className={styles.taskCardContainer}>
      <div className={styles.cardsWrapper}>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Button
          type="primary"
          onClick={handleCreateNewTask}
          className={styles.addButton}
          block
        >
          + Создать новый пост
        </Button>

        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => {
              setSelectedTask(task);
              setIsEditing(false);
            }}
            className={`${styles.taskCardWrapper} ${
              selectedTask?.id === task.id ? styles.selected : ""
            }`}
          >
            <TaskCard
              id={task.id}
              title={task.title}
              content={task.content}
              publishedAt={task.publishedAt}
              isEditing={isEditing && selectedTask?.id === task.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};