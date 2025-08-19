import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "react-bootstrap";

function AddressForm({ data, onChange, showErrors }) {
  const invalid = {
    streetName: showErrors && !data.streetName.trim(),
    streetNumber: showErrors && !data.streetNumber.trim(),
    city: showErrors && !data.city.trim(),
    country: showErrors && !data.country,
  };

  return (
    <>
      <Row className="g-3">
        <Col md={6}>
          <Form.Control
            placeholder="Street Name"
            value={data.streetName}
            isInvalid={invalid.streetName}
            onChange={(e) => onChange("address", "streetName", e.target.value)}
          />
          {invalid.streetName && (
            <Form.Text className="text-danger">Required</Form.Text>
          )}
        </Col>

        <Col md={6}>
          <Form.Control
            placeholder="Street Number"
            value={data.streetNumber}
            isInvalid={invalid.streetNumber}
            onChange={(e) => onChange("address", "streetNumber", e.target.value)}
          />
          {invalid.streetNumber && (
            <Form.Text className="text-danger">Required</Form.Text>
          )}
        </Col>
      </Row>

      <Row className="g-3 mt-1">
        <Col md={6}>
          <Form.Control
            placeholder="City"
            value={data.city}
            isInvalid={invalid.city}
            onChange={(e) => onChange("address", "city", e.target.value)}
          />
          {invalid.city && (
            <Form.Text className="text-danger">Required</Form.Text>
          )}
        </Col>

        <Col md={6}>
          <Form.Select
            value={data.country}
            isInvalid={invalid.country}
            onChange={(e) => onChange("address", "country", e.target.value)}
          >
            <option value="">Country</option>
            <option>Viet Nam</option>
            <option>Korea</option>
            <option>Italy</option>
            <option>Japan</option>
            <option>USA</option>
            <option>France</option>
          </Form.Select>
          {invalid.country && (
            <Form.Text className="text-danger">Required</Form.Text>
          )}
        </Col>
      </Row>
    </>
  );
}

AddressForm.propTypes = {
  data: PropTypes.shape({
    streetName: PropTypes.string.isRequired,
    streetNumber: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  showErrors: PropTypes.bool.isRequired,
};

export default AddressForm;
