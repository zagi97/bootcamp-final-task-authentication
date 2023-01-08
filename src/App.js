import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";

import TodoProfile from "./components/To-Do_Profile/ToDo_Profile";

import { useGlobalContext } from "./utilities/useGlobalContext";

const App = () => {
  const { isLoggedIn } = useGlobalContext();
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        {!isLoggedIn && <Route path="/auth" element={<Auth />}></Route>}

        {isLoggedIn && (
          <Route path="/profile" element={<TodoProfile />}></Route>
        )}

        <Route path="*" element={<Auth />}></Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
