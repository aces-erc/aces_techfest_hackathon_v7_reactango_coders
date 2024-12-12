// UserContext.js
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  /*
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem('user')); // Example: get user from localStorage
      setUser(storedUser);
      setLoading(false);
    };

    fetchUser();
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user to localStorage
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
  };
  */
  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
