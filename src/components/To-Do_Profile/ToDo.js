import React from "react";

import Card from "react-bootstrap/Card";
import classes from "./ToDo.module.css";

const ToDo = ({ todo_data, onDelete }) => {
  console.log(todo_data);
  if (todo_data === null) {
    return <div>Without todo task</div>;
  } else {
    const dataArray = Object.entries(todo_data);
    console.log(dataArray);
    return (
      <>
        {dataArray
          .map(([id, todo]) => (
            <Card
              key={id}
              style={{
                width: "320px",
                backgroundColor: "#55618E",
                padding: "20px",
              }}
            >
              <Card.Body
                style={{
                  flex: "display",
                  justifyContent: "center",
                  backgroundColor: "#536B91",
                }}
              >
                <Card.Title
                  style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {todo.title}
                </Card.Title>
                <Card.Text
                  style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <b>{todo.completed}</b>
                </Card.Text>
                <button className={classes.btn} onClick={() => onDelete(id)}>
                  Delete
                </button>
              </Card.Body>
            </Card>
          ))
          .slice(0, 10)}
      </>
    );
  }
};

export default ToDo;
