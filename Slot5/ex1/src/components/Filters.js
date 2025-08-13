import React from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";

const timeOptions = [0, 5, 10, 15, 20, 30, 45, 60];

export default function Filters({ q, setQ, maxPrep, setMaxPrep, maxCook, setMaxCook }) {
  return (
    <Row className="g-3 mb-4">
      <Col md={3}>
        <Form.Select
          className="rounded-3 shadow-sm"
          value={maxPrep}
          onChange={(e) => setMaxPrep(Number(e.target.value))}
        >
          <option value={0}>Max Prep Time</option>
          {timeOptions.map((t) => (
            <option key={t} value={t}>{t} mins</option>
          ))}
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select
          className="rounded-3 shadow-sm"
          value={maxCook}
          onChange={(e) => setMaxCook(Number(e.target.value))}
        >
          <option value={0}>Max Cook Time</option>
          {timeOptions.map((t) => (
            <option key={t} value={t}>{t} mins</option>
          ))}
        </Form.Select>
      </Col>
      <Col md={6}>
        <InputGroup className="shadow-sm rounded-3">
          <InputGroup.Text className="bg-white">🔍</InputGroup.Text>
          <Form.Control
            className="rounded-end-3"
            placeholder="Search by name or ingredient..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </InputGroup>
      </Col>
    </Row>
  );
}
