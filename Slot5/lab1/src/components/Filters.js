import React from "react";
import { Row, Col, Form } from "react-bootstrap"; // Form nhập liệu Bootstrap

export default function Filters({
  q, setQ,              // Từ khóa tìm kiếm và hàm cập nhật
  maxPrep, setMaxPrep,  // Thời gian chuẩn bị tối đa
  maxCook, setMaxCook,  // Thời gian nấu tối đa
  pageSize, setPageSize // Số món/trang và hàm cập nhật
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

      {/* Ô tìm kiếm theo tên hoặc nguyên liệu */}
      <Col xs={12} md={4}>
        <Form.Control
          type="text"
          placeholder="Search by name or ingredient..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </Col>

      {/* Chọn số món hiển thị mỗi trang */}
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
