import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { allGenres } from "../movies";

export default function MovieRequestForm() {
  const [form, setForm] = useState({
    title: "",
    genre: "",
    year: "",
    duration: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.genre) e.genre = "Please choose a genre";
    const year = +form.year;
    if (!year || year < 1900) e.year = "Year must be >= 1900";
    const dur = +form.duration;
    if (!dur || dur <= 0) e.duration = "Duration must be > 0";
    if (!form.description.trim() || form.description.trim().length < 30)
      e.description = "Description must be at least 30 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm({ title: "", genre: "", year: "", duration: "", description: "" });
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <h3
            style={{ fontSize: "1.2rem" }}
            className="mb-3 text fw-bold"
          >
            Movie Request Form
          </h3>
          {submitted && (
            <Alert
              variant="success"
              onClose={() => setSubmitted(false)}
              dismissible
            >
              Request submitted. Thank you!
            </Alert>
          )}
          <Form
            noValidate
            onSubmit={handleSubmit}
            className="bg-dark p-4 rounded-4 border border-secondary"
          >
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                isInvalid={!!errors.title}
                placeholder="Movie title"
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="g-3">
              <Form.Group as={Col} md={6}>
                <Form.Label>Genre</Form.Label>
                <Form.Select
                  value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value })}
                  isInvalid={!!errors.genre}
                >
                  <option value="">-- Choose --</option>
                  {allGenres
                    .filter((g) => g !== "All")
                    .map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.genre}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={3}>
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  isInvalid={!!errors.year}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.year}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={3}>
                <Form.Label>Duration (min)</Form.Label>
                <Form.Control
                  type="number"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                  isInvalid={!!errors.duration}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.duration}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="warning"
                type="submit"
                className="px-4 fw-semibold"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
