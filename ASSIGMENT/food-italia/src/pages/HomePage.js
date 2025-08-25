import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import HeroCarousel from "../layout/HeroCarousel";
import AppNavbar from "../layout/AppNavbar";
import ProductsGrid from "../components/ProductsGrid";
import { getProducts } from "../api";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [filters, setFilters] = useState({ category: "", priceRange: "" });
  const navigate = useNavigate();

  useEffect(() => { getProducts().then(setAll).finally(() => setLoading(false)); }, []);

  const norm = (s) => (s || "").toLowerCase();
  const priceOf = (p) => p.salePrice ?? p.price;

  const visible = useMemo(() => {
    let arr = all.filter(
      (p) => !query || norm(p.title).includes(norm(query)) || norm(p.description).includes(norm(query))
    );
    if (filters.category) {
      arr = arr.filter(
        (p) => (p.tags || []).some((t) => norm(t) === norm(filters.category)) || norm(p.name).includes(norm(filters.category))
      );
    }
    if (filters.priceRange) {
      if (filters.priceRange === "0-10") arr = arr.filter((p) => priceOf(p) < 10);
      if (filters.priceRange === "10-20") arr = arr.filter((p) => priceOf(p) >= 10 && priceOf(p) <= 20);
      if (filters.priceRange === "20+") arr = arr.filter((p) => priceOf(p) > 20);
    }
    arr.sort((a, b) => {
      switch (sort) {
        case "name-asc": return a.title.localeCompare(b.title);
        case "name-desc": return b.title.localeCompare(a.title);
        case "price-asc": return priceOf(a) - priceOf(b);
        case "price-desc": return priceOf(b) - priceOf(a);
        default: return 0;
      }
    });
    return arr;
  }, [all, query, sort, filters]);

  const titleSx = {
    fontFamily: "Marcellus, serif",
    fontSize: "1.8rem",
    fontWeight: 600,
    color: "#1b5e20",
    position: "relative",
    display: "inline-block",
    marginBottom: "1rem",
  };
  const underline = {
    content: '""',
    position: "absolute",
    bottom: -6,
    left: 0,
    width: "60%",
    height: 3,
    background: "linear-gradient(90deg, #c1121f, #1b5e20)",
    borderRadius: 2,
  };

  return (
    <>
      <Container className="py-4 mb-0">
        {loading ? <p>Loading hero…</p> : (
          <HeroCarousel items={all} take={4} height={380} interval={2000} fade rounded="1rem" shadow />
        )}
      </Container>

      <Container className="py-2">
        <AppNavbar onQueryChange={setQuery} onSortChange={setSort} onFiltersChange={setFilters} />
      </Container>

      <Container className="py-4">
        <h3 style={titleSx}>
          Italian Dishes
          <span style={underline} />
        </h3>
        {loading ? <p>Loading products…</p> : (
          <ProductsGrid products={visible} onViewDetails={(id) => navigate(`/product/${id}`)} />
        )}
      </Container>
    </>
  );
}
