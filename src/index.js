import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoginContext from "./context/login-context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoginContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LoginContext>
);
