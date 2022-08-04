import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import Protect from "./Protect";
import LogOut from "../adminSite/logout/LogOut";
import Login from "../visitorSite/login/Login";

// import pages
import Home from "../visitorSite/home/Home.js";
import Contact from "../visitorSite/contact/Contact.js";
import MakeEnquiries from "../visitorSite/makeEnquiries/MakeEnquiries.js";
import Establishment from "../visitorSite/establishment/Establishment.js";
import EstablishmentDetails from "../visitorSite/establishment/EstablishmentDetail.js";
import Admin from "../adminSite/admin/Admin.js";
import CreateNewEstablishment from "../adminSite/newEstablishment/NewEstablishment";
import Enquiries from "../adminSite/enquiries/Enquiries";
import ContactMsg from "../adminSite/contactMsg/Messages";
import AllEstablishment from "../adminSite/newEstablishment/AllEstablishment.js";
import ViewMessage from "../adminSite/contactMsg/ViewMessage.js";

function NavMenu() {
  const { user } = useContext(AdminContext);

  return (
    <Router>
      <Navbar role="navigation" expand="sm" className="navbarTop">
        <Navbar.Brand as="h1" className="navbarTop__title">
          <NavLink to="/" exact role="link" className="navbarTop__title--text">
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
                <NavLink
                  to="/"
                  exact
                  className="navbarTop__link--item"
                  role="link"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/contact"
                  className="navbarTop__link--item"
                  role="link"
                >
                  Contact
                </NavLink>
                <Login />
              </>
            ) : (
              <>
                <NavLink to="/admin">Admin</NavLink>
                <LogOut />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Navigation showing correct component */}
      <Container fluid>
        <Switch>
          <Route path="/login" component={Login} />
          <Protect path="/" exact component={Home} />
          <Protect path="/menu" component={Meny} />
          <Protect path="/menu:id" component={MenyDetails} />
          <Protect path="/innlegg" component={Innlegg} />
          <Protect path="/innlegg:id" component={InnleggDetails} />
          <Protect path="/media" component={Media} />
        </Switch>
      </Container>
    </Router>
  );
}

export default NavMenu;
