import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import Permission from "./Permission";

// create a protected route
const Protect = () => {
  const { user } = useContext(AdminContext);

  return (
    user ? <Outlet /> : <Permission />
  );
};

export default Protect;
