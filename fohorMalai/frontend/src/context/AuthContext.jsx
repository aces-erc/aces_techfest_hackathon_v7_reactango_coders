import React, { createContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getUser } from "../api/endPoints";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  // const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  // const [authenticated, setAuthenticated] = useState(false);
  return (
    <UserContext.Provider
      value={{
        username,
        setLoading,
        setUsername,
        setUser,
        user,
      }}
    >
      {loading ? <Loader /> : children}
      {/* {children} */}
    </UserContext.Provider>
  );
};
