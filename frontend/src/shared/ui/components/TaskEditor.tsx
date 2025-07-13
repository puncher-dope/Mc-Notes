import React, { useEffect } from "react";
import { MarkDownEdit, MarkDown } from "features";
import { useTasks } from "../context/TasksContext";
import { type TaskEditorProps } from "./model";


export const TaskEditor: React.FC<TaskEditorProps> = ({
  isEditing,
  setIsEditing,
  editedData,
  setEditedData,
}) => {
  const { selectedTask, updateTask, deleteTask } = useTasks();
  useEffect(() => {
    if (isEditing && selectedTask) {
      setEditedData({
        title: selectedTask.title,
        content: selectedTask.content,
      });
    }
  }, [isEditing, selectedTask, setEditedData]);

  if (!selectedTask) {
    return <div>Выберите заметку для просмотра</div>;
  }

  const handleSave = async () => {
    if (!selectedTask) return;
    await updateTask(selectedTask.id, editedData.title, editedData.content);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof typeof editedData, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!selectedTask) {
    return <div>Выберите заметку для просмотра</div>;
  }

  return (
    <>
      {isEditing ? (
        <MarkDownEdit
          editedData={editedData}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          setIsEditing={setIsEditing}
        />
      ) : (
        <MarkDown
          selectedTask={selectedTask}
          setIsEditing={setIsEditing}
          handleDelete={deleteTask}
        />
      )}
    </>
  );
};
