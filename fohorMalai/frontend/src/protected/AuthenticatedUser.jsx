import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }) => {
  const user = localStorage.getItem("username");
  const { pathname } = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const checkAuthentication = () => {
    console.log(pathname);
    if (pathname === "/login" || pathname === "/signup") {
      return;
    }

    if (accessToken !== null) {
      return navigate(`/home/${user}`);
    } else {
      return navigate("/");
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [navigate]);
  return children;
};

export default RedirectIfAuthenticated;
