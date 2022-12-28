import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classes from "./Auth.module.css";
import * as yup from "yup";
import { useGlobalContext } from "../../utilities/useGlobalContext";

const Auth = () => {
  const { onLogin } = useGlobalContext();

  const schema = yup.object().shape({
    email: yup.string().email().required("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handlerOnSubmit = (data) => {
    console.log(data);
    console.log(data.email, data.password);
    onLogin(data.email, data.password);
  };

  return (
    <section className={classes.auth}>
      <form onSubmit={handleSubmit(handlerOnSubmit)}>
        <div className={classes.control}>
          <p>Email</p>
          <input type="email" {...register("email", { required: true })} />

          <p>{errors.email?.message}</p>
        </div>
        <div className={classes.control}>
          <p>Password</p>
          <input
            type="password"
            {...register("password", { required: true })}
          />

          <p>{errors.password?.message}</p>
        </div>

        <div>
          <button className={classes.btn}>Login</button>
        </div>
      </form>
    </section>
  );
};

export default Auth;
