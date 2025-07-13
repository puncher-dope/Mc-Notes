import { Button } from "antd";
import styles from "./index.module.css";
import ReactMarkdown from "react-markdown";
import {type MarkDownEditProps } from "../model";

export const MarkDown = ({selectedTask, setIsEditing, handleDelete} : MarkDownEditProps) => {
  return (
    <>
      <h1>{selectedTask.title}</h1>
      <ReactMarkdown>{selectedTask.content}</ReactMarkdown>
      <Button
        type="primary"
        onClick={() => setIsEditing(true)}
        className={styles.editButton}
      >
        Редактировать
      </Button>
      <Button danger onClick={handleDelete} className={styles.deleteButton}>
        Удалить
      </Button>
    </>
  );
};
