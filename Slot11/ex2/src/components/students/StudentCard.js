  import React from "react";
  import PropTypes from "prop-types";
  import { Card, Button } from "react-bootstrap";

  function StudentCard({ student, onView }) {
    const hasAvatar = !!(student.avatar && student.avatar.trim());

    return (
      <>
        <Card className="student-card h-100">
          {/* ✅ Chỉ render ảnh nếu có avatar */}
          {hasAvatar && (
            <Card.Img
              variant="top"
              src={student.avatar}
              alt={student.name}
              className="student-img"
            />
          )}

          <Card.Body>
            <Card.Title className="student-name">{student.name}</Card.Title>
            <Card.Text className="student-info">
              <b>ID:</b> {student.id} <br />
              <b>Email:</b> {student.email} <br />
              <b>Age:</b> {student.age}
            </Card.Text>
            <Button className="btn-view" onClick={() => onView(student)}>
              View Details
            </Button>
          </Card.Body>
        </Card>

        <style>{`
          .student-card {
            border: none; border-radius: 15px; overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 64, 128, 0.1);
            transition: transform .2s, box-shadow .2s; background: #fff;
          }
          .student-card:hover { transform: translateY(-5px); box-shadow: 0 6px 16px rgba(0,64,128,.2); }
          .student-img { height: 200px; object-fit: cover; border-bottom: 3px solid #a1c4fd; }
          .student-name { font-size:1.2rem; font-weight:600; color:#003366; margin-bottom:8px; }
          .student-info { font-size:.95rem; color:#333; margin-bottom:15px; }
          .btn-view { background:#004080 !important; border:none !important; border-radius:25px; padding:6px 16px; font-weight:500; }
          .btn-view:hover { background:#00264d !important; }
        `}</style>
      </>
    );
  }

  StudentCard.propTypes = {
    student: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      avatar: PropTypes.string,
    }),
    onView: PropTypes.func.isRequired,
  };

  export default StudentCard;
