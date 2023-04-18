import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import Protect from "./Protect";
import LogOut from "../logout/LogOut";
import Login from "../login/Login";
import Home from "../home/Home";
import Food from "../food/Food";
import FoodForm from "../food/FoodForm";
import Media from "../media/Media";
import Posts from "../blogPost/Posts";
import RoomSelection from "../roomSelection/RoomSelection";
import FoodTable from "../foodTable/FoodTable";
import PostForm from "../blogPost/PostForm"
import ParticipentsForm from "../participate/ParticipateForm";
import ParticipateForm from "../participate/ParticipateForm";
import Registration from "../registration/Registration";

function NavMenu() {
  const { user } = useContext(AdminContext);

  console.log(user);

  return (
    <Router>
      <Navbar role="navigation" expand="sm" className="navbarTop">
        <Navbar.Brand as="h1" className="navbarTop__title">
          <NavLink to="/" role="link" className="navbarTop__title--text">
            Holidaze
          </NavLink>
        </Navbar.Brand>

        {/* hamburger menu */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto navbarTop__link">
            {/*check if user exist in local storage*/}
            {!user ? (
              <>
              </>
            ) : (
              <>
                <NavLink to="#">Meny</NavLink>
                <NavLink to="#">Media</NavLink>
                <NavLink to="#">Innlegg</NavLink>
                <LogOut />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Navigation showing correct component */}
      <Container fluid>
        <Routes>
          <Route element={<Protect />}>
            <Route element={<Home />} path="/home" />
            <Route element={<ParticipateForm />} path="/menu" />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default NavMenu;
