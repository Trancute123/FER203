import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS của Bootstrap
import {
  Table,
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
  Card,
  Badge,
} from "react-bootstrap"; // Import các component của React Bootstrap

// Dữ liệu gốc (mảng các công ty)
const companiesData = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
];

// Map màu cho từng category (sử dụng Badge Bootstrap)
const categoryColors = {
  Finance: "primary",
  Retail: "warning",
  Auto: "success",
  Technology: "info",
};

export default function App() {
  // State cho input tìm kiếm (text đang nhập) và giá trị tìm kiếm đã áp dụng khi bấm Search
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // State cho lựa chọn sắp xếp
  // sortOption có thể là "", "startAsc", "startDesc", "duration"
  const [sortOption, setSortOption] = useState("");

  // State cho filter category
  // Mặc định là "All" (hiển thị tất cả)
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Lấy danh sách category duy nhất từ dữ liệu gốc (dùng Set để lọc trùng)
  // Dùng useMemo để chỉ tính lại khi companiesData thay đổi
  const categories = useMemo(() => {
    const uniq = Array.from(new Set(companiesData.map((c) => c.category)));
    return ["All", ...uniq]; // Thêm "All" vào đầu danh sách
  }, []);

  // Tạo mảng filteredCompanies từ dữ liệu gốc dựa vào searchTerm, categoryFilter, sortOption
  const filteredCompanies = useMemo(() => {
    // Lọc theo tên (không phân biệt hoa thường)
    let result = companiesData.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Lọc theo category nếu khác "All"
    if (categoryFilter !== "All") {
      result = result.filter((c) => c.category === categoryFilter);
    }

    // Copy mảng trước khi sort để không làm thay đổi mảng gốc
    result = [...result];

    // Sắp xếp dựa vào sortOption
    if (sortOption === "startAsc") {
      result.sort((a, b) => a.start - b.start); // Năm start tăng dần
    } else if (sortOption === "startDesc") {
      result.sort((a, b) => b.start - a.start); // Năm start giảm dần
    } else if (sortOption === "duration") {
      // Sắp theo thời gian hoạt động (end - start)
      result.sort((a, b) => a.end - a.start - (b.end - b.start));
    }

    return result;
  }, [searchTerm, sortOption, categoryFilter]);

  // Hàm xử lý khi bấm nút Search
  const handleSearch = (e) => {
    e.preventDefault(); // Chặn reload trang
    setSearchTerm(searchText.trim()); // Lưu giá trị tìm kiếm
  };

  // Hàm Clear để reset tìm kiếm
  const clearSearch = () => {
    setSearchText("");
    setSearchTerm("");
  };

  return (
    <Container className="my-4">
      {/* Tiêu đề với gradient hồng tím */}
      <h2
        className="mb-4 text-center text-white p-3 rounded"
        style={{
          background: "linear-gradient(90deg, #f48fb1, #ce93d8)",
        }}
      >
        Company List
      </h2>

      {/* Form tìm kiếm */}
      <Form onSubmit={handleSearch} className="mb-3">
        <Row className="g-2 align-items-center justify-content-center">
          <Col md="4">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="success">
              Search
            </Button>
          </Col>
          <Col xs="auto">
            <Button type="button" variant="danger" onClick={clearSearch}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Dropdown Sort & Filter */}
      <Row className="g-3 mb-3 justify-content-center">
        {/* Dropdown Sort */}
        <Col md="4">
          <Form.Label>Sort</Form.Label>
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">-- None --</option>
            <option value="startAsc">Year Start Asc</option>
            <option value="startDesc">Year Start Desc</option>
            <option value="duration">By Duration</option>
          </Form.Select>
        </Col>

        {/* Dropdown Filter Category */}
        <Col md="4">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Bảng nằm trong Card để đẹp hơn */}
      <Card className="shadow-lg border-0">
        <Card.Body>
          {/* Hiển thị bảng hoặc thông báo "No result" */}
          {filteredCompanies.length > 0 ? (
            <Table
              striped
              bordered
              hover
              responsive
              className="align-middle"
              style={{ backgroundColor: "#fff0f5" }} // Nền bảng màu hồng nhạt
            >
              <thead style={{ backgroundColor: "#f8bbd0", color: "#4a148c" }}>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((c, idx) => (
                  <tr key={idx}>
                    <td>{c.name}</td>
                    {/* Hiển thị category bằng Badge màu sắc */}
                    <td>
                      <Badge bg={categoryColors[c.category] || "secondary"}>
                        {c.category}
                      </Badge>
                    </td>
                    <td>{c.start}</td>
                    <td>{c.end}</td>
                    <td>{c.end - c.start} years</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="warning" className="text-center">
              No result
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
