// src/components/ProductsGrid.js
import { useMemo, useState } from "react";
import { Row, Col, Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import ProductCard from "./ProductCard";
import "./product-card.css";

const SORTS = {
  "name-asc": (a,b)=>a.title.localeCompare(b.title),
  "name-desc": (a,b)=>b.title.localeCompare(a.title),
  "price-asc": (a,b)=>(a.salePrice ?? a.price) - (b.salePrice ?? b.price),
  "price-desc": (a,b)=>(b.salePrice ?? b.price) - (a.salePrice ?? a.price),
};

export default function ProductsGrid({ products=[] }) {
  // --- controls state
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [cat, setCat] = useState("all");
  const [price, setPrice] = useState("any");

  // derive categories
  const categories = useMemo(()=>{
    const s = new Set(products.map(p=>p.category).filter(Boolean));
    return ["all", ...Array.from(s)];
  }, [products]);

  // filter + search + sort
  const list = useMemo(()=>{
    let arr = products.slice();

    // search
    if (q.trim()) {
      const k = q.toLowerCase();
      arr = arr.filter(p =>
        p.title?.toLowerCase().includes(k) ||
        p.description?.toLowerCase().includes(k)
      );
    }

    // category
    if (cat !== "all") arr = arr.filter(p => (p.category || "all") === cat);

    // price range
    const priceOf = p => Number(p.salePrice ?? p.price) || 0;
    if (price !== "any") {
      const [min,max] = price.split("-").map(Number);
      arr = arr.filter(p => {
        const v = priceOf(p);
        return (isNaN(min) || v >= min) && (isNaN(max) || v <= max);
      });
    }

    // sort
    arr.sort(SORTS[sort] || SORTS["name-asc"]);
    return arr;
  }, [products, q, sort, cat, price]);

  return (
    <>
      {/* FILTER BAR */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <Form.Control
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="Search products…"
          className="rounded-pill px-3 py-2"
          style={{minWidth:280, maxWidth:420}}
        />

        <Form.Select
          value={sort}
          onChange={e=>setSort(e.target.value)}
          className="rounded-pill px-3 py-2 w-auto"
        >
          <option value="name-asc">Name A→Z</option>
          <option value="name-desc">Name Z→A</option>
          <option value="price-asc">Price Low→High</option>
          <option value="price-desc">Price High→Low</option>
        </Form.Select>

        <Form.Select
          value={cat}
          onChange={e=>setCat(e.target.value)}
          className="rounded-pill px-3 py-2 w-auto"
        >
          {categories.map(c=>(
            <option value={c} key={c}>{c === "all" ? "All Categories" : c}</option>
          ))}
        </Form.Select>

        <Form.Select
          value={price}
          onChange={e=>setPrice(e.target.value)}
          className="rounded-pill px-3 py-2 w-auto"
        >
          <option value="any">Any Price</option>
          <option value="0-10">$0–10</option>
          <option value="10-20">$10–20</option>
          <option value="20-40">$20–40</option>
          <option value="40-9999">$40+</option>
        </Form.Select>

        <ButtonGroup className="ms-auto">
          <ToggleButton
            id="sort-az" type="radio" variant="outline-success"
            value="name-asc" checked={sort==="name-asc"} onChange={()=>setSort("name-asc")}
            className="rounded-pill px-3 py-2"
          >A–Z</ToggleButton>
          <ToggleButton
            id="sort-price" type="radio" variant="outline-success"
            value="price-asc" checked={sort==="price-asc"} onChange={()=>setSort("price-asc")}
            className="rounded-pill px-3 py-2"
          >$↓</ToggleButton>
        </ButtonGroup>
      </div>

      {/* GRID */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {list.map(p=>(
          <Col key={p.id}><ProductCard product={p} /></Col>
        ))}
      </Row>
    </>
  );
}
