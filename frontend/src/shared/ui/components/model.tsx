import type { Dispatch, SetStateAction } from "react";

export type TaskEditorProps = {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  editedData: { title: string; content: string };
  setEditedData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      content: string;
    }>
  >;
}
export type TasksListProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}
