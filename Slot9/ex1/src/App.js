import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import StudentCard from "./components/StudentCard";
import StudentForm from "./components/StudentForm"; // form validate
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [students, setStudents] = useState([
    { name: "anna.nguyen@fe.edu.vn", age: 22, avatar: "/images/student1.jpg" },
    { name: "minh.tran@fe.edu.vn", age: 24, avatar: "/images/student2.jpg" },
    { name: "john.pham@fe.edu.vn", age: 21, avatar: "/images/student3.jpg" },
    { name: "sophia.le@fe.edu.vn", age: 23, avatar: "/images/student4.jpg" },
    { name: "david.vo@fe.edu.vn", age: 25, avatar: "/images/student5.jpg" },
    { name: "linda.ngo@fe.edu.vn", age: 20, avatar: "/images/student6.jpg" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", age: "", avatar: "" });

  // Mở modal edit
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(students[index]);
    setShowModal(true);
  };

  // Cập nhật giá trị trong modal edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu lại thông tin đã chỉnh sửa
  const handleSave = () => {
    setStudents((prev) =>
      prev.map((s, i) => (i === editIndex ? formData : s))
    );
    setShowModal(false);
  };

  // Thêm mới học sinh từ form
  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  return (
    <Container className="py-5">
      <h1
        className="text-center fw-bold mb-4"
        style={{
          fontSize: "2.5rem",
          letterSpacing: "1px",
          background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        Student information
      </h1>

      {/* Form thêm học sinh mới */}
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <StudentForm onSubmit={handleAddStudent} />
        </Col>
      </Row>

      {/* Danh sách student card */}
      <Row className="g-4 justify-content-center">
        {students.map((s, i) => (
          <Col key={i} xs={12} sm={10} md={6} lg={4} xl={3}>
            <StudentCard student={s} onEdit={() => handleEdit(i)} />
          </Col>
        ))}
      </Row>

      {/* Modal edit thông tin */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#f4a261",
            color: "white",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name (email)</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
