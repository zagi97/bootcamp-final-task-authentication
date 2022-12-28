import { useCallback, useEffect, useState } from "react";

export const useFetch = (url) => {
  const [todoData, setTodoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const response = await fetch(url);

    const data = await response.json();

    setIsLoading(false);
    setTodoData(data.slice(0, 10));
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, setTodoData]);

  const handleDelete = (id) => {
    setTodoData(todoData.filter((todo) => todo.id !== id));
  };

  return { isLoading, todoData, handleDelete, setTodoData };
};
