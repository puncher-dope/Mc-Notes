import { Input } from "antd";
import type React from "react";
import styles from "./index.module.css";
import { type SearchInputProps } from "../model";

export const SearchInput = ({ searchTerm, setSearchTerm }:SearchInputProps) => {

return (
       <>
        <Input.Search
            placeholder="Поиск по заголовку или содержимому"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
            allowClear
          /> 
       </>
  );
};