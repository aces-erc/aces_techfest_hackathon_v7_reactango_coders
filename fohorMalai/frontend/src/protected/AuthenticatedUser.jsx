import { use } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }) => {
  const user = localStorage.getItem("username");
  console.log(user);

  const navigate = useNavigate();

  const checkAuthentication = () => {
    if (user !== null) {
      return navigate(`/home/${user}`);
    } else {
      return navigate("/login");
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [user]);
  return children;
};

export default RedirectIfAuthenticated;
