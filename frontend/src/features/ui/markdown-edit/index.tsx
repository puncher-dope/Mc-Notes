import { Button, Input } from "antd";
import styles from './index.module.css'
import { type MarkDownProps } from "../model";

export const MarkDownEdit = ({editedData, handleInputChange, handleSave, setIsEditing}: MarkDownProps) => {
  return (
    <>
      <Input
        className={styles.titleInput}
        value={editedData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
      <textarea
        className={styles.editArea}
        value={editedData.content}
        onChange={(e) => handleInputChange("content", e.target.value)}
      />
      <div className={styles.buttons}>
        <Button type="primary" onClick={handleSave}>
          Сохранить
        </Button>
        <Button onClick={() => setIsEditing(false)}>Отмена</Button>
      </div>
    </>
  );
};
