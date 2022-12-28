import { useContext } from "react";
import { GlobalContext } from "../context/login-context";

export const useGlobalContext = () => {
  const appContext = useContext(GlobalContext);
  return appContext;
};
