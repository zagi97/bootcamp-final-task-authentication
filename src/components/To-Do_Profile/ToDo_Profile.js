import React from "react";
import { useFetch } from "../../utilities/useFetch";
import { useGlobalContext } from "../../utilities/useGlobalContext";
import ToDoAdd from "./ToDo_Add";
import TodoList from "./ToDo_List";
import classes from "./ToDo_Profile.module.css";

const todoUrl = "https://jsonplaceholder.typicode.com/todos";

function ToDo_Profile() {
  const { onLogout } = useGlobalContext();
  const { todoData, isLoading, handleDelete, setTodoData } = useFetch(todoUrl);

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
        <TodoList props={todoData} onDelete={handleDelete} />
      </div>
    );
  };
  return (
    <>
      <div style={{ backgroundColor: "#54628F", minHeight: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>Todo list</h2>
        </div>
        <ToDoAdd props={todoData} setTodoData={setTodoData} />
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
