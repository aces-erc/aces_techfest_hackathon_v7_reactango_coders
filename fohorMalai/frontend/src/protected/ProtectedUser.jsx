import { Navigate } from "react-router-dom";

export function ProtectedUser({ children }) {
  const username = localStorage.getItem("username");

  // If no username is found in localStorage, redirect to login
  if (!username) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children (protected content)
  return children;
}

export default ProtectedUser;
