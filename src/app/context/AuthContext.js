"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Install this with: npm install js-cookie

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState("");

  useEffect(() => {
    // Check cookies for the auth token
    const token = Cookies.get("token");
   console.log("Token from cookies:", token); 
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    Cookies.set("token", token, { expires: 7 }); // 7-day expiry
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
