import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import Permission from "./Permission";

// create a protected route
const Protect = ({ component: Component, ...rest }) => {
  const { user } = useContext(AdminContext);

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Permission />)}
    />
  );
};

export default Protect;
