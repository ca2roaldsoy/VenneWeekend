import React from "react";
import { NavLink } from "react-bootstrap";

function FooterMenu() {
  return (
    <>
      <NavLink to="/participate">Delta</NavLink>
      <NavLink to="/posts">Innlegg</NavLink>
      <NavLink to="/kart">Kart</NavLink>
    </>
  );
}

export default FooterMenu;
