import { useCallback, useEffect, useState } from "react";

export const useFetch = (url) => {
  const [todoData, setTodoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const response = await fetch(url);

    const data = await response.json();
    console.log(data);
    setIsLoading(false);
    setTodoData(data);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(todoData);
  /*const dataArray = Object.entries(todoData);
   const handleDelete = (id) => {
    setTodoData(dataArray.filter((todo) => todo.id !== id));
  }; */

  return { isLoading, todoData, /* handleDelete, */ setTodoData };
};
