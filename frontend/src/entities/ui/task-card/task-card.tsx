import type { Task } from "./model";
import type React from "react";
import { formatTimeDate } from "shared/utils/formate-date";
import styles from "./index.module.css";

export const TaskCard: React.FC<Task> = ({
  title,
  content,
  publishedAt,
  isEditing
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        {title} {isEditing && "(Редактируется)"}
      </p>
      <p className={styles.content}>
        {formatTimeDate(publishedAt)} {content.substring(0, 100)}...
      </p>
    </div>
  );
};