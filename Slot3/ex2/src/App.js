import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Card,
  Alert,
  Badge,
} from "react-bootstrap";

// File dữ liệu persons
const persons = [
  {
    id: 1,
    firstName: "Linh",
    lastName: "Nguyen",
    age: 28,
    city: "Ha Noi",
    skills: ["React", "Node"],
    isActive: true,
  },
  {
    id: 2,
    firstName: "Minh",
    lastName: "Tran",
    age: 22,
    city: "Da Nang",
    skills: ["Vue", "CSS"],
    isActive: false,
  },
  {
    id: 3,
    firstName: "Anh",
    lastName: "Le",
    age: 35,
    city: "HCM",
    skills: ["React", "Go"],
    isActive: true,
  },
  {
    id: 4,
    firstName: "Ha",
    lastName: "Pham",
    age: 29,
    city: "Ha Noi",
    skills: ["Angular", "RxJS"],
    isActive: true,
  },
  {
    id: 5,
    firstName: "Tuan",
    lastName: "Do",
    age: 41,
    city: "HCM",
    skills: ["Node", "SQL"],
    isActive: false,
  },
];

export default function App() {
  // State tìm kiếm tên
  const [searchText, setSearchText] = useState("");

  // State sort firstName A→Z hay Z→A
  const [sortAZ, setSortAZ] = useState(true);

  // State filter tuổi
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  // State filter skill
  const [skillFilter, setSkillFilter] = useState("All");

  // Lấy danh sách skill duy nhất
  const allSkills = useMemo(() => {
    const skills = persons.reduce((acc, p) => [...acc, ...p.skills], []);
    return ["All", ...new Set(skills)];
  }, []);

  // Filter + Sort danh sách hiển thị
  const filteredList = useMemo(() => {
    let list = [...persons];

    // Filter theo tên
    if (searchText.trim()) {
      const lower = searchText.toLowerCase();
      list = list.filter((p) =>
        (p.firstName + " " + p.lastName).toLowerCase().includes(lower)
      );
    }

    // Filter theo tuổi
    list = list.filter((p) => {
      const condMin = minAge ? p.age >= parseInt(minAge) : true;
      const condMax = maxAge ? p.age <= parseInt(maxAge) : true;
      return condMin && condMax;
    });

    // Filter theo skill
    if (skillFilter !== "All") {
      list = list.filter((p) => p.skills.includes(skillFilter));
    }

    // Sort đa tiêu chí: isActive → age ↑ → lastName A→Z
    list.sort((a, b) => {
      if (a.isActive !== b.isActive) return b.isActive - a.isActive;
      if (a.age !== b.age) return a.age - b.age;
      return a.lastName.localeCompare(b.lastName);
    });

    // Sort theo firstName A→Z hoặc Z→A nếu bấm nút
    list.sort((a, b) =>
      sortAZ
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName)
    );

    return list;
  }, [searchText, minAge, maxAge, skillFilter, sortAZ]);

  // Bảng xếp hạng skill
  const skillRanking = useMemo(() => {
    const countMap = persons.reduce((acc, p) => {
      p.skills.forEach((s) => (acc[s] = (acc[s] || 0) + 1));
      return acc;
    }, {});
    return Object.entries(countMap).sort((a, b) => b[1] - a[1]);
  }, []);

  // Tính statistics
  const statistics = useMemo(() => {
    const total = persons.length;
    const avgAge = (persons.reduce((sum, p) => sum + p.age, 0) / total).toFixed(
      1
    );
    const activeCount = persons.filter((p) => p.isActive).length;
    return { total, avgAge, activeCount };
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center text-danger mb-4"> Persons Management </h2>
      {/* Search & Filter */}
      <Card className="p-3 mb-4 shadow-sm">
        <Row className="g-3">
          <Col md={3}>
            <Form.Control
              placeholder="Search by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Min age"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Max age"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            >
              {allSkills.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button variant="info" onClick={() => setSortAZ(!sortAZ)}>
              Sort First Name {sortAZ ? "A→Z" : "Z→A"}
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Danh sách */}
      {filteredList.length > 0 ? (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-success">
            <tr>
              <th>Full Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Skills</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.firstName} {p.lastName}
                </td>
                <td>{p.age}</td>
                <td>{p.city}</td>
                <td>
                  {p.skills.map((s, idx) => (
                    <Badge key={idx} bg="secondary" className="me-1">
                      {s}
                    </Badge>
                  ))}
                </td>
                <td>
                  {p.isActive ? (
                    <Badge bg="success">Active</Badge>
                  ) : (
                    <Badge bg="danger">Inactive</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="danger">No found.</Alert>
      )}

      {/* Skill ranking */}
      <Card className="p-3 mb-4 shadow-sm">
        <h5>Skill Ranking</h5>
        <Table bordered hover>
          <thead className="table-info">
            <tr>
              <th>Skill</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {skillRanking.map(([skill, count], idx) => (
              <tr
                key={skill}
                style={
                  idx === 0 ? { fontWeight: "bold", background: "#ffecb3" } : {}
                }
              >
                <td>{skill}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Statistics */}
      <Card className="p-3 shadow-sm">
        <h5>Statistics</h5>
        <Row>
          <Col>
            Total Persons: <strong>{statistics.total}</strong>
          </Col>
          <Col>
            Average Age: <strong>{statistics.avgAge}</strong>
          </Col>
          <Col>
            Active Persons: <strong>{statistics.activeCount}</strong>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
