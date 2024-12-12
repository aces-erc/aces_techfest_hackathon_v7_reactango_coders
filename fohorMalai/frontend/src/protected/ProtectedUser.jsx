import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../api/endPoints";

export function ProtectedUser({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const checkVerified = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      return navigate("/");
    }
  };

  useEffect(() => {
    checkVerified();
  }, [pathname]);

  return children;
}

export default ProtectedUser;

// if (accessToken === null)
// if (accessToken !== null)
