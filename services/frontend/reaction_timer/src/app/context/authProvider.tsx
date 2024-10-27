"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
// You'll need to install this package

// Create context
const AuthContext = createContext<any>(null);

// Use AuthContext hook
export const useAuth = () => useContext(AuthContext);

type DecodedToken = {
  exp: number; // token expiry time in seconds
};

// AuthProvider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  // Function to log in and set token
  const login = (userToken: string) => {
    setToken(userToken);
    localStorage.setItem("token", userToken);
  };

  // Function to dynamically refresh token if expired or close to expiry
  const refreshAuthToken = async () => {
    try {
      // Call your backend to get a new token
      const response = await fetch("http://localhost:8001/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.newToken) {
        setToken(data.newToken);
        localStorage.setItem("token", data.newToken);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  // Function to log out
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Check token expiry dynamically
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decoded: DecodedToken = jwtDecode(storedToken);
      const expiryTime = decoded.exp * 1000 - Date.now();

      // Check every minute to see if the token is close to expiry
      const intervalId = setInterval(() => {
        if (expiryTime <= 60000) refreshAuthToken(); // Refresh token if 1 min left
      }, 60000);

      return () => clearInterval(intervalId); // Clean up
    }
  }, [token]); // Re-run when token changes

  return (
    <AuthContext.Provider value={{ token, login, logout, setToken: refreshAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
