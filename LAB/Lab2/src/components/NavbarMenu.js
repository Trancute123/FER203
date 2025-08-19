import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Film, HeartFill, FileEarmarkText } from "react-bootstrap-icons";

const NavbarMenu = () => {
  const location = useLocation();

  return (
    <>
      <style>{`
        .nav-custom {
          text-transform: uppercase;
          font-weight: 700;
          font-size: 1.2rem;
          letter-spacing: 1px;
          color: #ffffff !important;
          transition: 0.3s ease;
          display: flex;
          align-items: center;
        }
        .nav-custom svg {
          color: #ffffff; /* icon trắng mặc định */
          transition: 0.3s ease;
        }
        .nav-custom:hover {
          color: #FFD700 !important;
        }
        .nav-custom:hover svg {
          color: #FFD700 !important;
        }
        .nav-active {
          background-color: #FFD700 !important;
          color: #000 !important;
          border-radius: 6px;
        }
        .nav-active svg {
          color: #000 !important; /* icon thành đen khi active */
        }
      `}</style>

      <Navbar
        expand="lg"
        fixed="top"
        className="shadow-sm"
        style={{ backgroundColor: "#020B1A" }}
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold text-warning d-flex align-items-center"
            style={{ fontSize: "1.8rem" }}
          >
            <Film className="me-2" size={24} />
            MOVIE EXPLORER
          </Navbar.Brand>

          {/* Toggle */}
          <Navbar.Toggle aria-controls="main-navbar" className="bg-warning" />
          <Navbar.Collapse id="main-navbar" className="justify-content-end">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/"
                className={`nav-custom px-3 me-2 ${
                  location.pathname === "/" ? "nav-active" : ""
                }`}
              >
                <Film className="me-1" size={20} />
                Free Movies
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/favourites"
                className={`nav-custom px-3 me-2 ${
                  location.pathname === "/favourites" ? "nav-active" : ""
                }`}
              >
                <HeartFill className="me-1" size={20} />
                My Favourite Movies
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/request"
                className={`nav-custom px-3 ${
                  location.pathname === "/request" ? "nav-active" : ""
                }`}
              >
                <FileEarmarkText className="me-1" size={20} />
                Movie Request Form
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarMenu;
