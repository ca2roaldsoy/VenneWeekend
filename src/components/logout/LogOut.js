import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

function LogOut() {
  const { logout } = useContext(AdminContext);
  let navigate = useNavigate();

  // log out user, and redirect home page
  function logOutUser() {
    logout();
    navigate("/");
  }

  return (
    <Button
      variant="danger"
      onClick={logOutUser}
      role="button"
      className="logOut__btn"
    >
      Logg ut
    </Button>
  );
}

export default LogOut;
