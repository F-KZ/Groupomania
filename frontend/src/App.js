import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Cookie from "js-cookie";
//import components
import Routes from "./components/utils/Routes.jsx";
import AuthApi from "./components/utils/AuthApi.jsx";
import Logout from "./components/utils/Logout.jsx";
//import css
import { Navbar, Nav, Container } from "react-bootstrap";
import "./app.css";
//import logo
import logo from "./assets/logo.png";
import icon from "./assets/icon.png";

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(function () {
    if (Cookie.get("user")) {
      setAuth(true);
    }
  }, []);

  let navLink;
  if (auth === true) {
    navLink = (
      <Navbar fixed="top" expand="sm" bg="dark" variant="dark">
        <Container>
          <div>
            <Link to="/articles" className="nav-link">
              {window.screen.width > 500 ? (
                <img src={logo} alt="Le logo de l'entreprise Groupomania" />
              ) : (
                <img
                  src={icon}
                  alt="Le logo miniature de l'entreprise Groupomania"
                />
              )}
            </Link>
          </div>
          <Navbar.Toggle aria-controls="navbarResponsive" />
          <Navbar.Collapse
            id="navbarResponsive"
            className="justify-content-end"
          >
            <Nav className="d-flex align-items-end">
              <Link to="/articles" className="nav-link mx-4">
                Tous les articles
              </Link>
              <Link to="/user" className="nav-link mx-4">
                Mon compte
              </Link>{" "}
              <Logout />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    navLink = (
      <Navbar fixed="top" expand="sm" bg="dark" variant="dark">
        <Container>
          <div>
            <Link to="/" className="nav-link">
              {window.screen.width > 500 ? (
                <img src={logo} alt="Le logo de l'entreprise Groupomania" />
              ) : (
                <img
                  src={icon}
                  alt="Le logo miniature de l'entreprise Groupomania"
                />
              )}
            </Link>
          </div>
          <Navbar.Toggle aria-controls="navbarResponsive2" />
          <Navbar.Collapse
            id="navbarResponsive2"
            className="justify-content-end"
          >
            <Nav className="align-items-end">
              <Link to="/signup" className="nav-link mx-3">
                S'inscrire
              </Link>
              <Link to="/login" className="nav-link mx-3">
                Se connecter
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <React.Fragment>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          {navLink}
          <Routes />
        </Router>
      </AuthApi.Provider>
    </React.Fragment>
  );
}