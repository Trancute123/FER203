import React from "react";
import { Navbar, Container, Nav, Badge, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaLeaf } from "react-icons/fa";

export default function AppNavbar({ favCount, cartCount, onRecipesClick }) {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-success d-flex align-items-center"
        >
          <FaLeaf className="me-2 text-success" size={26} />
          Healthy Recipe Finder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Menu links */}
          <Nav className="me-auto ms-3">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            {/* Recipes: mở modal */}
            <Nav.Link onClick={onRecipesClick}>Recipe </Nav.Link>
          </Nav>

          {/* Favorites */}
          <Nav className="align-items-center me-3">
            <Nav.Link as={Link} to="/favorites" className="position-relative">
              <FaHeart size={20} className="text-danger me-1" />
              Favourites
              {favCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {favCount}
                </Badge>
              )}
            </Nav.Link>

            {/* Cart */}
            <Nav.Link className="position-relative ms-3">
              <FaShoppingCart size={20} className="text-secondary me-1" />
              Cart
              {cartCount > 0 && (
                <Badge
                  bg="success"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>

          {/* Browse Recipes Button */}
          <Button
            variant="success"
            className="px-4 rounded-pill"
            onClick={onRecipesClick}
          >
            Browse recipes
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
