import React, { useState } from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap";

function AppNavbar({ onSearch, onOpenProfile }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query.toLowerCase());
  };

  const openProfile = (e) => {
    e.preventDefault();           // không reload trang
    if (onOpenProfile) onOpenProfile();
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
        <Navbar.Brand style={{ fontWeight: 700, fontSize: "1.5rem", color: "#003366" }}>
          Student Management
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto me-4">
            <Nav.Link href="#" style={{ color: "#003366", fontWeight: 500 }}>Home</Nav.Link>
            <Nav.Link href="#" style={{ color: "#003366", fontWeight: 500 }}>Students</Nav.Link>
            <Nav.Link href="#" style={{ color: "#003366", fontWeight: 500 }}>About</Nav.Link>

            {/* NEW: mở modal Build your Profile */}
            <Nav.Link
              href="#"
              onClick={openProfile}
              style={{ color: "#003366", fontWeight: 600 }}
              title="Open profile wizard"
            >
              Build your Profile
            </Nav.Link>
          </Nav>

          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Quick Search"
              className="me-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ borderRadius: 20, border: "1px solid #80bfff", padding: "5px 15px" }}
            />
            <Button
              type="submit"
              style={{ borderRadius: 20, background: "#4da6ff", border: "none" }}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

AppNavbar.propTypes = {
  onSearch: PropTypes.func,
  onOpenProfile: PropTypes.func, // <-- cần truyền từ App
};

export default AppNavbar;
