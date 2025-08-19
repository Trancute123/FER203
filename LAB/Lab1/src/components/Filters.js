import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function Filters({
  q, setQ,              
  maxPrep, setMaxPrep,  
  maxCook, setMaxCook,  
  pageSize, setPageSize,
  sortBy, setSortBy     // 🆕 Thêm props sắp xếp
}) {
  return (
    <Row className="mb-4 g-2">
      {/* Lọc theo thời gian chuẩn bị */}
      <Col xs={12} md={2}>
        <Form.Select
          value={maxPrep}
          onChange={(e) => setMaxPrep(Number(e.target.value))}
        >
          <option value={0}>Max Prep Time</option>
          <option value={5}>5 min</option>
          <option value={10}>10 min</option>
          <option value={15}>15 min</option>
          <option value={30}>30 min</option>
        </Form.Select>
      </Col>

      {/* Lọc theo thời gian nấu */}
      <Col xs={12} md={2}>
        <Form.Select
          value={maxCook}
          onChange={(e) => setMaxCook(Number(e.target.value))}
        >
          <option value={0}>Max Cook Time</option>
          <option value={5}>5 min</option>
          <option value={10}>10 min</option>
          <option value={15}>15 min</option>
          <option value={30}>30 min</option>
        </Form.Select>
      </Col>

      {/* Ô tìm kiếm */}
      <Col xs={12} md={3}>
        <Form.Control
          type="text"
          placeholder="Search by name or ingredient..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </Col>

      {/* Sort by */}
      <Col xs={12} md={3}>
        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by...</option>
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
          <option value="prep-asc">Prep Time ↑</option>
          <option value="prep-desc">Prep Time ↓</option>
          <option value="cook-asc">Cook Time ↑</option>
          <option value="cook-desc">Cook Time ↓</option>
        </Form.Select>
      </Col>

      {/* Chọn số món mỗi trang */}
      <Col xs={12} md={2}>
        <Form.Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={6}>6 per page</option>
          <option value={9}>9 per page</option>
          <option value={12}>12 per page</option>
        </Form.Select>
      </Col>
    </Row>
  );
}
