import React, { useMemo, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import HeroCarousel from "../components/HeroCarousel";   // ✅ thêm
import { products } from "../data/products";

export default function Products() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("title-asc");
  const [maxPrice, setMaxPrice] = useState("");

  const filtered = useMemo(() => {
    let arr = products.filter(
      p =>
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase())
    );
    if (maxPrice) arr = arr.filter(p => Number(p.price) <= Number(maxPrice));
    switch (sort) {
      case "price-asc":  arr.sort((a, b) => a.price - b.price); break;
      case "price-desc": arr.sort((a, b) => b.price - a.price); break;
      case "title-desc": arr.sort((a, b) => b.title.localeCompare(a.title)); break;
      default:           arr.sort((a, b) => a.title.localeCompare(b.title));
    }
    return arr;
  }, [q, sort, maxPrice]);

  return (
    <>
      {/* ✅ Carousel ngay đầu trang Products */}
      <HeroCarousel items={products} />

      <div className="container py-4">
        <h2 className="mb-3">Products</h2>

        <div className="d-flex gap-3 mb-3 flex-wrap">
          <Form.Control
            placeholder="Search..."
            value={q}
            onChange={e => setQ(e.target.value)}
            style={{ maxWidth: 260 }}
          />
          <Form.Select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{ maxWidth: 200 }}
          >
            <option value="title-asc">Title A→Z</option>
            <option value="title-desc">Title Z→A</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </Form.Select>
          <Form.Control
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            style={{ maxWidth: 140 }}
          />
        </div>

        <Row className="g-4">
          {filtered.map(p => (
            <Col key={p.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard p={p} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
