import React, { useState, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import Filters from "./Filters";

export default function RecipeGrid({ items, onAddToCart }) {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [maxPrep, setMaxPrep] = useState(0);
  const [maxCook, setMaxCook] = useState(0);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter((r) => {
      const matchesQuery =
        !query ||
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query);
      const matchesPrep = !maxPrep || r.prep <= maxPrep;
      const matchesCook = !maxCook || r.cook <= maxCook;
      return matchesQuery && matchesPrep && matchesCook;
    });
  }, [items, q, maxPrep, maxCook]);

  return (
    <>
      <Filters
        q={q}
        setQ={setQ}
        maxPrep={maxPrep}
        setMaxPrep={setMaxPrep}
        maxCook={maxCook}
        setMaxCook={setMaxCook}
      />
      <Row xs={1} md={2} lg={3} className="g-4">
        {filtered.map((r, idx) => (
          <Col key={idx}>
            <RecipeCard recipe={r} onView={(rec) => { setSelected(rec); setOpen(true); }} />
          </Col>
        ))}
      </Row>
      <RecipeModal
        show={open}
        recipe={selected}
        onAddToCart={onAddToCart}
        onHide={() => setOpen(false)}
      />
    </>
  );
}
