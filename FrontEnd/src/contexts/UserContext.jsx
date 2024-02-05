// src/contexts/UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
// import jwt_decode from "jwt-decode"
// import checkToken from "../utils/CheckToken";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const checkToken = () => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) return false; // No token found

    try {
      const decoded = jwtDecode(token);
      // const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000; // in seconds
      // console.log(decoded);
      //const expirationDate = new Date(decoded.exp * 1000);

      // console.log(expirationDate.toString());

      if (decoded.exp < currentTime) {
        // Token expired
        localStorage.removeItem("user");
        return false;
      }

      return true; // Token is valid
    } catch (error) {
      console.log(error);
      return false; // Token is invalid
    }
  };

  useEffect(() => {
    // Update currentUser state based on token validity
    if (!checkToken()) {
      setCurrentUser(null);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const { token } = JSON.parse(storedUser);
        try {
          // const decoded = jwt_decode(token);
          const decoded = jwtDecode(token);
          setCurrentUser({
            userId: decoded.userId,
            username: decoded.username,
            token: token,
          });
        } catch (error) {
          console.error("Error decoding token:", error);
          setCurrentUser(null);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
