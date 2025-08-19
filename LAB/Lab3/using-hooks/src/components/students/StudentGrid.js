import React from "react";
import { Row, Col } from "react-bootstrap";
import StudentCard from "./StudentCard";

function StudentGrid({ students = [], onView }) {
  return (
    <Row xs={1} sm={2} md={3} className="g-3">
      {students && students.length > 0 ? (
        students.map((s) => (
          <Col key={s.id}>
            <StudentCard student={s} onView={onView} />
          </Col>
        ))
      ) : (
        <Col><p>No students found</p></Col>
      )}
    </Row>
  );
}

export default StudentGrid;
