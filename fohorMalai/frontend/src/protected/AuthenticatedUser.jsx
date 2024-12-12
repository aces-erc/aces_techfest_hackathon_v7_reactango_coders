import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }) => {
  const user = localStorage.getItem("username");

  // If the user is already authenticated, redirect them to their home page
  if (user) {
    return <Navigate to={`/home/${user}`} replace />;
  }

  // Otherwise, render the children (public content)
  return children;
};

export default RedirectIfAuthenticated;
