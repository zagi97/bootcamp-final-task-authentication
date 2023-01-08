import React, { useEffect /*useEffect  , { useState } */ } from "react";
import { useFetch } from "../../utilities/useFetch";
import { useGlobalContext } from "../../utilities/useGlobalContext";
import ToDoAdd from "./ToDo_Add";
import TodoList from "./ToDo_List";
import classes from "./ToDo_Profile.module.css";

const todoUrl =
  "https://todo-project-45976-default-rtdb.europe-west1.firebasedatabase.app/todos.json";

function ToDo_Profile() {
  const { onLogout } = useGlobalContext();
  const { todoData, isLoading, /* handleDelete, */ setTodoData } =
    useFetch(todoUrl);
  /*   const [error, setError] = useState(null); */
  console.log(todoData);

  useEffect(() => {
    console.log("RENDERING TODOS", todoData);
  }, [todoData]);

  const checkIfLoading = () => {
    if (isLoading) {
      return (
        // <PacmanLoader
        //   color="yellow"
        //   size="50"
        //   style={{ position: "fixed", top: "50%", left: "50%" }}
        // />
        <h1
          style={{ color: "dark", display: "flex", justifyContent: "center" }}
        >
          ...loading
        </h1>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingTop: "20px",
          backgroundColor: "dark",
        }}
      >
        <TodoList props={todoData} onDelete={removeTodoHandler} />
      </div>
    );
  };

  const removeTodoHandler = (todoId) => {
    fetch(
      `https://todo-project-45976-default-rtdb.europe-west1.firebasedatabase.app/todos/${todoId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        setTodoData((prevtodo) =>
          Object.entries(prevtodo).filter((todo) => todo.id !== todoId)
        );
      })
      .catch((error) => {
        /* setError("Something went wrong!"); */
      });
  };

  const addTodoHandler = async (todo) => {
    console.log(todo);
    try {
      const response = await fetch(
        "https://todo-project-45976-default-rtdb.europe-west1.firebasedatabase.app/todos.json",
        {
          method: "POST",
          body: JSON.stringify(todo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data);
      setTodoData(data);
    } catch (error) {
      /*  setError(error.message); */
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#54628F", minHeight: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>Todo list</h2>
        </div>
        <ToDoAdd
          props={todoData}
          setTodoData={setTodoData}
          onAddTodo={addTodoHandler}
        />
        <div>{checkIfLoading()}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className={classes.btn} onClick={onLogout}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

export default ToDo_Profile;
