import classes from "./ToDo_Add.module.css";
import style_form from "../Auth/Auth.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ToDo_Add = ({ props, setTodoData }) => {
  console.log(props.length);
  console.log(props);
  const schema = yup.object().shape({
    todo: yup.string().required("Please enter your todo"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const sumbitToDoHandler = (data) => {
    const enteredNewToDo = {
      id: props.length + 1,
      title: data.todo,
      completed: "false",
    };

    setTodoData([...props, enteredNewToDo]);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit(sumbitToDoHandler)}>
          <div className={style_form.control}>
            <p>Todo</p>
            <input
              type="text"
              name="todo"
              {...register("todo", { required: true })}
            />

            <p>{errors.todo?.message}</p>
          </div>
          <div className={style_form.control}>
            <p>Completed</p>
            <input type="text" name="completed" value={"false"} readOnly />
          </div>

          <button className={classes.btn}>Add new ToDo task</button>
        </form>
      </div>
    </>
  );
};

export default ToDo_Add;
