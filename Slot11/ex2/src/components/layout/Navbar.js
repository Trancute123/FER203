import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap";

function AppNavbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query.toLowerCase()); // gửi search query lên App
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        background: "linear-gradient(90deg, #a1c4fd, #c2e9fb)",
        padding: "15px 0",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Container>
        {/* Logo + Brand */}
        <Navbar.Brand
          href="#"
          style={{
            fontWeight: "700",
            fontSize: "1.5rem",
            color: "#003366",
          }}
        >
          <img
            src="/images/studentlogo.jpg"
            alt="logo"
            width="50"
            height="50"
            className="d-inline-block align-top me-3 rounded-circle"
            style={{ border: "2px solid white" }}
          />
          Student Management
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Links */}
          <Nav className="ms-auto me-4">
            <Nav.Link href="#" style={{ color: "#003366", fontWeight: "500", fontSize: "1.1rem" }}>
              Home
            </Nav.Link>
            <Nav.Link href="#" style={{ color: "#003366", fontWeight: "500", fontSize: "1.1rem" }}>
              Students
            </Nav.Link>
            <Nav.Link href="#" style={{ color: "#003366", fontWeight: "500", fontSize: "1.1rem" }}>
              About
            </Nav.Link>
          </Nav>

          {/* Quick search */}
          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Quick Search"
              className="me-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                borderRadius: "20px",
                border: "1px solid #80bfff",
                padding: "5px 15px",
              }}
            />
            <Button
              type="submit"
              style={{
                borderRadius: "20px",
                background: "#4da6ff",
                border: "none",
                fontWeight: "500",
              }}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
