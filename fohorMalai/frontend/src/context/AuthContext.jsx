import React, { createContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Loader from "../components/Loader";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(); // the user details
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const checkIfAuthenticated = () => {
    const username = localStorage.getItem("username");
    if (!username) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
    return authenticated;
  };

  useEffect(() => {
    try {
      setLoading(true);
      const status = checkIfAuthenticated();
      if (!status) {
        // navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [username, Navigate]);

  return (
    <UserContext.Provider
      value={{
        username,
        setLoading,
        setUsername,
      }}
    >
      {loading ? <Loader /> : children}
    </UserContext.Provider>
  );
};
