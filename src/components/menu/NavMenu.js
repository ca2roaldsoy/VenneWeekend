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
import Posts from "../blogPost/posts/Posts";
import RoomSelection from "../roomSelection/RoomSelection";
import FoodTable from "../foodTable/FoodTable";
import PostForm from "../blogPost/posts/PostForm";
import ParticipentsForm from "../participate/ParticipateForm";
import ParticipateForm from "../participate/ParticipateForm";
import Registration from "../registration/Registration";
import PostsDetails from "../blogPost/posts/PostsDetails";
import Map from "../map/Map";

function NavMenu() {
  const { user } = useContext(AdminContext);

  return (
    <Router>
      <Navbar role="navigation" expand="md" className="navbarTop">
        <Navbar.Brand as="h1" className="navbarTop__title">
          <NavLink to="/home" role="link" className="navbarTop__title--text">
            VenneWeekend
          </NavLink>
        </Navbar.Brand>

        {/* hamburger menu */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbarTop__link">
            {/*check if user exist in local storage*/}
            {!user ? (
              <></>
            ) : (
              <>
                <NavLink to="/participate">Påmelding</NavLink>
                <NavLink to="/menu">Meny</NavLink>
                <NavLink to="/foodtable">Mattabell</NavLink>
                <NavLink to="/media">Media</NavLink>
                <NavLink to="/posts">Innlegg</NavLink>
                <NavLink to="/roomselection">Romseleksjon</NavLink>
                <NavLink to="/kart">Kart</NavLink>
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
            <Route element={<ParticipateForm />} path="/participate" />
            <Route element={<Food />} path="/menu" />
            <Route element={<FoodTable />} path="/foodtable" />
            <Route element={<Media />} path="/media" />
            <Route element={<PostForm />} path="/postform" />
            <Route element={<Posts />} path="/posts" />
            <Route element={<PostsDetails />} path="/posts/:title/:id" />
            <Route element={<RoomSelection />} path="/roomselection" />
            <Route element={<Map />} path="/kart" />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default NavMenu;
