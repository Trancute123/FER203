import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-light py-3 mt-5 border-top">
      <Container className="text-center text-muted small">
        © {new Date().getFullYear()} Healthy Recipe Finder. All rights reserved.
      </Container>
    </footer>
  );
}
