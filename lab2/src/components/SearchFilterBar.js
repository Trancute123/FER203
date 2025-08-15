import PropTypes from "prop-types";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { Search as SearchIcon, Funnel } from "react-bootstrap-icons";

export default function SearchFilterBar({
  search,
  onSearchChange,
  genre,
  onGenreChange,
  sort,
  onSortChange,
  genres,
  resultCount,
}) {
  const labelStyle = { fontWeight: 500, color: "#ffc107" }; // vàng
  const boxStyle = {
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "#212529",
    color: "white",
  };
  const iconBoxStyle = {
    ...boxStyle,
    borderRight: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Row className="g-2 align-items-end mb-3 search-bar">
      {/* Search */}
      <Col xs={12} md={6}>
        <Form.Label style={labelStyle}>Search</Form.Label>
        <InputGroup>
          <InputGroup.Text style={iconBoxStyle}>
            <SearchIcon color="#ffc107" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Type movie name…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={boxStyle}
          />
        </InputGroup>
      </Col>

      {/* Genre */}
      <Col xs={6} md={3}>
        <Form.Label style={labelStyle}>Genre</Form.Label>
        <Form.Select
          value={genre}
          onChange={(e) => onGenreChange(e.target.value)}
          style={boxStyle}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </Form.Select>
      </Col>

      {/* Sort */}
      <Col xs={6} md={3}>
        <Form.Label style={labelStyle}>Sort</Form.Label>
        <InputGroup>
          <InputGroup.Text style={iconBoxStyle}>
            <Funnel color="#ffc107" />
          </InputGroup.Text>
          <Form.Select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            style={boxStyle}
          >
            <option value="none">None</option>
            <option value="dur-asc">Duration ↑</option>
            <option value="dur-desc">Duration ↓</option>
          </Form.Select>
        </InputGroup>
      </Col>

      {/* Result count */}
      {typeof resultCount === "number" && (
        <Col xs={12}>
          <small className="text-muted">
            Found {resultCount} result(s)
          </small>
        </Col>
      )}
    </Row>
  );
}

SearchFilterBar.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  resultCount: PropTypes.number,
};
