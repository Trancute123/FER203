import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "react-bootstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { passRe } from "../validators";

function AccountForm({ data, onChange, showErrors }) {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  // --- flags lỗi chi tiết ---
  const isPwdEmpty = showErrors && !data.password.trim();
  const isPwdWeak  = showErrors && data.password.trim() && !passRe.test(data.password);

  const isConfirmEmpty     = showErrors && !data.confirm.trim();
  const isConfirmMismatch  =
    showErrors && data.confirm.trim() && data.confirm !== data.password;

  const invalid = {
    username: showErrors && data.username.trim().length < 6,
    password: isPwdEmpty || isPwdWeak,
    confirm:  isConfirmEmpty || isConfirmMismatch,
    question: showErrors && !data.question,
    answer:   showErrors && !data.answer.trim(),
  };

  return (
    <>
      {/* Username */}
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="User name"
          value={data.username}
          isInvalid={invalid.username}
          onChange={(e) => onChange("account", "username", e.target.value)}
        />
        {invalid.username && (
          <Form.Text className="text-danger">
            Username must be at least 6 characters
          </Form.Text>
        )}
      </Form.Group>

      <Row className="g-3">
        {/* Password */}
        <Col md={6}>
          <div className="position-relative">
            <Form.Control
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              value={data.password}
              isInvalid={invalid.password}
              onChange={(e) => onChange("account", "password", e.target.value)}
              aria-invalid={invalid.password}
              aria-describedby="password-help"
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
              role="button"
              onClick={() => setShowPwd((s) => !s)}
              aria-label={showPwd ? "hide password" : "show password"}
            >
              {showPwd ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {isPwdEmpty && (
            <Form.Text id="password-help" className="text-danger">
              Please enter your password
            </Form.Text>
          )}
          {isPwdWeak && (
            <Form.Text id="password-help" className="text-danger">
              Min 8 chars, include uppercase, number, special character
            </Form.Text>
          )}
        </Col>

        {/* Confirm password */}
        <Col md={6}>
          <div className="position-relative">
            <Form.Control
              type={showPwd2 ? "text" : "password"}
              placeholder="Confirm password"
              value={data.confirm}
              isInvalid={invalid.confirm}
              onChange={(e) => onChange("account", "confirm", e.target.value)}
              aria-invalid={invalid.confirm}
              aria-describedby="confirm-help"
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
              role="button"
              onClick={() => setShowPwd2((s) => !s)}
              aria-label={showPwd2 ? "hide confirm password" : "show confirm password"}
            >
              {showPwd2 ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {isConfirmEmpty && (
            <Form.Text id="confirm-help" className="text-danger">
              Please confirm your password
            </Form.Text>
          )}
          {isConfirmMismatch && (
            <Form.Text id="confirm-help" className="text-danger">
              Passwords do not match
            </Form.Text>
          )}
        </Col>
      </Row>

      {/* Secret question + Answer */}
      <Row className="g-3 mt-1">
        <Col md={6}>
          <Form.Select
            value={data.question}
            isInvalid={invalid.question}
            onChange={(e) => onChange("account", "question", e.target.value)}
          >
            <option value="">Secret question</option>
            <option>What is your first pet’s name?</option>
            <option>What is your mother’s maiden name?</option>
            <option>In which city were you born?</option>
            <option>Who was your favorite teacher?</option>
          </Form.Select>
          {invalid.question && (
            <Form.Text className="text-danger">Please choose a question</Form.Text>
          )}
        </Col>

        <Col md={6}>
          <Form.Control
            placeholder="Answer"
            value={data.answer}
            isInvalid={invalid.answer}
            onChange={(e) => onChange("account", "answer", e.target.value)}
          />
          {invalid.answer && (
            <Form.Text className="text-danger">Please enter your answer</Form.Text>
          )}
        </Col>
      </Row>
    </>
  );
}

AccountForm.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirm:  PropTypes.string.isRequired,
    question: PropTypes.string,
    answer:   PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  showErrors: PropTypes.bool.isRequired,
};

export default AccountForm;
