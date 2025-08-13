import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

export default function AppNavbar({ cartCount }) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm rounded-0">
      <Container>
        <Navbar.Brand className="fw-bold text-success">Healthy Recipe Finder</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-between">
          <Nav className="me-3">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>About</Nav.Link>
            <Nav.Link active>Recipes</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary small">Cart: {cartCount}</span>
            <Button variant="success" className="rounded-3 px-3">
              Browse recipes
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
