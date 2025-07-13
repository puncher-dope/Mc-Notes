export type MarkDownEditProps = {
  selectedTask: { title: string; content: string };
  setIsEditing: (isEditing: boolean) => void;
  handleDelete: () => void;
};
export type MarkDownProps = {
    editedData: { title: string; content: string };
    handleInputChange: (field: "title" | "content", value: string) => void;
    handleSave: () => void;
    setIsEditing: (isEditing: boolean) => void;
}
export type SearchInputProps = {
    searchTerm:string,
    setSearchTerm:React.Dispatch<React.SetStateAction<string>>
}