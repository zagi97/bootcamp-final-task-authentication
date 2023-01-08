import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import classes from "./Auth.module.css";
import * as yup from "yup";
import { useGlobalContext } from "../../utilities/useGlobalContext";
import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

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

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKQCsF-M4rEBzxgXkho1B8Byb9CuTztHQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKQCsF-M4rEBzxgXkho1B8Byb9CuTztHQ";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // show an error modal
            let errorMessage = "Authentication failed";
            /* if (data && data.error && data.error.message) {
             errorMessage = data.error.message;
           } */

            throw new Error(errorMessage);
          });
        }
      })
      //(+data.expiresIn) + pretvara string u number
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        onLogin(data.idToken, expirationTime.toISOString());
        //korisnik ne može se vraćati na prethodnu stranicu te korisnik odlazi na drugu stranicu

        navigate("/profile");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
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

        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Auth;
