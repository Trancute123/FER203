import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavbarMenu() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#2e7d32" }} variant="dark">
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: "bold", color: "#fff" }}>
          🍕 FoodStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#dishes" style={{ color: "#fff" }}>
              Dishes
            </Nav.Link>
            <Nav.Link href="#cart" style={{ color: "#fff" }}>
              Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
