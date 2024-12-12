import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export function ProtectedUser({ children }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  console.log("username " + username);

  const checkVerified = () => {
    if (username === null) {
      return navigate("/");
    } else {
      return children;
    }
  };

  useEffect(() => {
    checkVerified();
  }, [username]);
  return children;
}

export default ProtectedUser;
