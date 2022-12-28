import React from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";

import TodoProfile from "./components/To-Do_Profile/ToDo_Profile";

import { useGlobalContext } from "./utilities/useGlobalContext";

const App = () => {
  const { isLoggedIn } = useGlobalContext();
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <main>
        {!isLoggedIn && <Auth />}
        {isLoggedIn && <TodoProfile />}
      </main>
    </React.Fragment>
  );
};

export default App;
