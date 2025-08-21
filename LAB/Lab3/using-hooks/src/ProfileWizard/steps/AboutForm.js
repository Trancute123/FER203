import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form, Image } from "react-bootstrap";
import { emailRe } from "../validators";

function AboutForm({ data, onChange, onFileChange, showErrors }) {
  // các lỗi khác giữ nguyên
  const invalid = {
    firstName: showErrors && !data.firstName.trim(),
    lastName: showErrors && !data.lastName.trim(),
    email: showErrors && !emailRe.test(data.email),
  };

  // 🔹 Xử lý lỗi riêng cho Age
  let ageError = "";
  if (showErrors) {
    const n = Number(data.age);
    if (data.age === "" || data.age === null || data.age === undefined) {
      ageError = "Please enter your age";
    } else if (Number.isNaN(n)) {
      ageError = "Please enter a valid age";
    } else if (!Number.isInteger(n)) {
      ageError = "Age must be a whole number";
    } else if (n < 0 || n > 100) {
      ageError = "Age must be between 0 and 100";
    }
  }

  return (
    <Row className="g-4 align-items-start">
      <Col md={4} className="text-center">
        <div style={{ fontWeight: 600, color: "#003366", marginBottom: 8 }}>
          CHOOSE PICTURE
        </div>
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            border: "3px solid #a1c4fd",
            background: "#f5f9ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 10px",
            overflow: "hidden",
          }}
        >
          {data.avatarUrl ? (
            <Image src={data.avatarUrl} alt="avatar" fluid />
          ) : (
            <span style={{ color: "#8aa9d6" }}>No image</span>
          )}
        </div>
        <Form.Control type="file" accept="image/*" onChange={onFileChange} />
      </Col>

      <Col md={8}>
        <Form.Group className="mb-3">
          <Form.Control
            placeholder="First Name"
            value={data.firstName}
            isInvalid={invalid.firstName}
            onChange={(e) => onChange("about", "firstName", e.target.value)}
          />
          {invalid.firstName && (
            <Form.Text className="text-danger">
              Please enter your first name
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Last Name"
            value={data.lastName}
            isInvalid={invalid.lastName}
            onChange={(e) => onChange("about", "lastName", e.target.value)}
          />
          {invalid.lastName && (
            <Form.Text className="text-danger">
              Please enter your last name
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Email"
            value={data.email}
            isInvalid={invalid.email}
            onChange={(e) => onChange("about", "email", e.target.value)}
          />
          {invalid.email && (
            <Form.Text className="text-danger">
              Please enter a valid email
            </Form.Text>
          )}
        </Form.Group>

        {/* 🔹 Age input (0–100, chỉ số nguyên) */}
        <Form.Group>
          <Form.Control
            type="number"
            placeholder="Age"
            value={data.age}
            min={0}
            max={100}
            step={1}
            isInvalid={!!ageError}
            onChange={(e) => onChange("about", "age", e.target.value)}
          />
          {ageError && (
            <Form.Text className="text-danger">{ageError}</Form.Text>
          )}
        </Form.Group>
      </Col>
    </Row>
  );
}

AboutForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  showErrors: PropTypes.bool.isRequired,
};

export default AboutForm;
