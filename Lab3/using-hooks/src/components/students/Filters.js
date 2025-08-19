import React from "react";
import { Form, Row, Col } from "react-bootstrap";

function Filters({ hasAvatar, setHasAvatar, ageFilter, setAgeFilter, search, setSearch }) {
  return (
    <Form
      className="p-3 rounded shadow-sm mb-3"
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        border: "1px solid #d6eaff",
        backdropFilter: "blur(6px)",
      }}
    >
      <Row className="g-3 align-items-center">
        {/* Search input */}
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="🔍 Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              borderRadius: "20px",
              padding: "10px 15px",
              border: "1px solid #a1c4fd",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          />
        </Col>

        {/* Age filter */}
        <Col md={3}>
          <Form.Select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            style={{
              borderRadius: "20px",
              padding: "10px 15px",
              border: "1px solid #a1c4fd",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <option>All Ages</option>
            <option>≤ 20</option>
            <option>21 – 25</option>
            <option>&gt; 25</option>
          </Form.Select>
        </Col>

        {/* Has avatar */}
        <Col md={3} className="d-flex align-items-center">
          <Form.Check
            type="checkbox"
            label="Has Avatar"
            checked={hasAvatar}
            onChange={(e) => setHasAvatar(e.target.checked)}
            style={{
              fontWeight: "500",
              color: "#003366",
            }}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default Filters;
