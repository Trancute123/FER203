import { useEffect, useState } from "react";
import { Form, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";

export default function AppNavbar({ onQueryChange, onSortChange, onFiltersChange }) {
  const [q, setQ] = useState("");
  const categories = ["All Categories", "Pizza", "Pasta", "Salad", "Dessert", "Meat", "Seafood"];

  // ⏱ Debounce 300ms
  useEffect(() => {
    const id = setTimeout(() => onQueryChange?.(q), 300);
    return () => clearTimeout(id);
  }, [q, onQueryChange]);

  return (
    <Row className="g-2 align-items-center mb-3">
      <Col xs={12} md={4}>
        <Form.Control
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="rounded-4 shadow-sm"
        />
      </Col>

      <Col xs="auto">
        <DropdownButton
          id="sort-dropdown"
          title="Name A→Z"
          variant="outline-success"
          className="rounded-4"
          onSelect={(key) => onSortChange?.(key)}
        >
          <Dropdown.Item eventKey="name-asc">Name A→Z</Dropdown.Item>
          <Dropdown.Item eventKey="name-desc">Name Z→A</Dropdown.Item>
          <Dropdown.Item eventKey="price-asc">Price Ascending</Dropdown.Item>
          <Dropdown.Item eventKey="price-desc">Price Descending</Dropdown.Item>
        </DropdownButton>
      </Col>

      <Col xs="auto">
        <DropdownButton
          id="category-dropdown"
          title="All Categories"
          variant="outline-success"
          className="rounded-4"
          onSelect={(key) =>
            onFiltersChange?.((f) => ({ ...f, category: key === "All Categories" ? "" : key }))
          }
        >
          {categories.map((c) => (
            <Dropdown.Item key={c} eventKey={c}>
              {c}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Col>

      <Col xs="auto">
        <DropdownButton
          id="price-dropdown"
          title="Any Price"
          variant="outline-success"
          className="rounded-4"
          onSelect={(key) =>
            onFiltersChange?.((f) => ({ ...f, priceRange: key === "Any Price" ? "" : key }))
          }
        >
          <Dropdown.Item eventKey="Any Price">Any Price</Dropdown.Item>
          <Dropdown.Item eventKey="0-10">Under $10</Dropdown.Item>
          <Dropdown.Item eventKey="10-20">$10 – $20</Dropdown.Item>
          <Dropdown.Item eventKey="20+">Above $20</Dropdown.Item>
        </DropdownButton>
      </Col>
    </Row>
  );
}
