import React, { useState, createContext } from "react";

// create context to work with all components

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const getUser = localStorage.getItem("user") || null;
  const [user, setUser] = useState(getUser);

  function localStoreUser(user) {
    localStorage.setItem("user", user);

    setUser(user);
  }

  // log out user
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AdminContext.Provider value={{ user, localStoreUser, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
