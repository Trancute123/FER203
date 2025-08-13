import React, { useState, useMemo } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import Filters from "./Filters";

export default function RecipeGrid({
  items,
  onAddToFavorites,
  onAddToCart,
  pageSize,
  setPageSize
}) {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [maxPrep, setMaxPrep] = useState(0);
  const [maxCook, setMaxCook] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu
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

  // Tổng số trang
  const totalPages = Math.ceil(filtered.length / pageSize);

  // Cắt dữ liệu theo trang
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Chuyển trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Khi đổi pageSize → quay lại trang 1
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <>
      <Filters
        q={q}
        setQ={setQ}
        maxPrep={maxPrep}
        setMaxPrep={setMaxPrep}
        maxCook={maxCook}
        setMaxCook={setMaxCook}
        pageSize={pageSize}
        setPageSize={handlePageSizeChange}
      />

      <Row xs={1} md={2} lg={3} className="g-4">
        {paginated.map((r, idx) => (
          <Col key={idx}>
            <RecipeCard
              recipe={r}
              onView={(rec) => {
                setSelected(rec);
                setOpen(true);
              }}
              onAddToFavorites={onAddToFavorites}
            />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}

      <RecipeModal
        show={open}
        recipe={selected}
        onAddToCart={() => {
          onAddToCart();
          setOpen(false);
        }}
        onHide={() => setOpen(false)}
      />
    </>
  );
}
