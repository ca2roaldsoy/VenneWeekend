import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { axiosURL } from "../constants/axiosURL";

// create context to work with all components

const AdminContext = createContext();

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AdminContextProvider = ({ children }) => {
  const getUser = localStorage.getItem("user") || null;
  const [user, setUser] = useState(getUser);

  let timer;

  /* function handleLogoutTimer() {
    timer = setTimeout(() => {
      resetTimer();

      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });

      logoutAction();
    }, 30000);
  }

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);

  const logoutAction = () => {
    logout();
  }; */

  function localStoreUser(user) {
    axios
      .get(axiosURL + "login", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then(localStorage.setItem("user", user), setUser(user));
  }

  // log out user
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.pathname = "/";
  }

  return (
    <AdminContext.Provider
      value={{ user, localStoreUser, logout /* handleLogoutTimer  */ }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
