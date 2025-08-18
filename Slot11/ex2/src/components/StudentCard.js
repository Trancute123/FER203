import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

function StudentCard({ student, onView, showAvatar }) {
  return (
    <>
      <Card className="student-card h-100">
        {/* ✅ Chỉ render ảnh nếu có avatar + showAvatar = true */}
        {showAvatar && student.avatar && (
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

      {/* CSS lồng trực tiếp */}
      <style>{`
        .student-card {
          border: none;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 64, 128, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          background: #fff;
        }
        .student-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 16px rgba(0, 64, 128, 0.2);
        }
        .student-img {
          height: 200px;
          object-fit: cover;
          border-bottom: 3px solid #a1c4fd;
          transition: transform 0.3s ease;
        }
        .student-card:hover .student-img {
          transform: scale(1.05);
        }
        .student-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: #003366;
          margin-bottom: 8px;
        }
        .student-info {
          font-size: 0.95rem;
          color: #333;
          margin-bottom: 15px;
        }
        .btn-view {
          background-color: #004080 !important;
          border: none !important;
          border-radius: 25px;
          padding: 6px 16px;
          font-weight: 500;
          transition: background-color 0.2s ease;
        }
        .btn-view:hover {
          background-color: #00264d !important;
        }
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
  showAvatar: PropTypes.bool, // ✅ giữ lại để filter avatar
};

export default StudentCard;
