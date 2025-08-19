import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const ValidatedFormEx6 = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [agree, setAgree] = useState(false);

  const [touched, setTouched] = useState({
    name: false,
    gender: false,
    country: false,
    agree: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Validate
  const isNameValid = name.trim().length >= 3;
  const isGenderValid = gender !== "";
  const isCountryValid = country !== "";
  const isAgreeValid = agree;

  useEffect(() => {
    if (isNameValid && isGenderValid && isCountryValid && isAgreeValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isNameValid, isGenderValid, isCountryValid, isAgreeValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      {/* Name */}
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched({ ...touched, name: true })}
          isInvalid={touched.name && !isNameValid}
          isValid={touched.name && isNameValid}
        />
        <Form.Control.Feedback type="invalid">
          Name must be at least 3 characters long.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Gender */}
      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <div>
          {["Male", "Female", "Other"].map((g) => (
            <Form.Check
              inline
              key={g}
              type="radio"
              label={g}
              name="gender"
              value={g}
              checked={gender === g}
              onChange={(e) => setGender(e.target.value)}
              onBlur={() => setTouched({ ...touched, gender: true })}
              isInvalid={touched.gender && !isGenderValid}
              isValid={touched.gender && isGenderValid}
            />
          ))}
        </div>
        {touched.gender && !isGenderValid && (
          <div className="text-danger small">Please select your gender.</div>
        )}
      </Form.Group>

      {/* Country */}
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          onBlur={() => setTouched({ ...touched, country: true })}
          isInvalid={touched.country && !isCountryValid}
          isValid={touched.country && isCountryValid}
        >
          <option value="">-- Select country --</option>
          <option value="Hanoi">Hà Nội</option>
          <option value="Danang">Đà Nẵng</option>
          <option value="HCM">TP.HCM</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Please select a country.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Agree */}
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="I agree to the terms and conditions"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          onBlur={() => setTouched({ ...touched, agree: true })}
          isInvalid={touched.agree && !isAgreeValid}
          isValid={touched.agree && isAgreeValid}
        />
        {touched.agree && !isAgreeValid && (
          <div className="text-danger small">
            You must agree to the terms and conditions
          </div>
        )}
      </Form.Group>

      {/* Submit */}
      <Button type="submit" variant="primary" disabled={!isFormValid} className="w-100">
        Submit
      </Button>
    </Form>
  );
};

export default ValidatedFormEx6;
