import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../store/userContext";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useGlobalContext();
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
