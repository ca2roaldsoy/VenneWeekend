import React from "react";
import Registration from "../registration/Registration";
import LoginForm from "./LoginForm";

// Navigation Menu
function Login() {
  return (
    <>
      <h1>Logg Inn form</h1>
      <Registration />
      <LoginForm />
    </>
  );
}

export default Login;
