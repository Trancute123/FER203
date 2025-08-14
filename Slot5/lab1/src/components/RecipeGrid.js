import React, { useState, useMemo } from "react";
import { Row, Col, Pagination } from "react-bootstrap"; 
import RecipeCard from "./RecipeCard";     
import RecipeModal from "./RecipeModal";  
import Filters from "./Filters";          

export default function RecipeGrid({
  items,              // Danh sách tất cả công thức món ăn
  onAddToFavorites,   // Hàm callback khi thêm vào yêu thích
  onAddToCart,        // Hàm callback khi thêm vào giỏ hàng
  pageSize,           // Số món hiển thị trên 1 trang
  setPageSize         // Hàm thay đổi số món trên 1 trang (truyền từ component cha)
}) {
  // State lưu công thức đang được chọn để xem chi tiết
  const [selected, setSelected] = useState(null);
  // State điều khiển mở/đóng modal chi tiết
  const [open, setOpen] = useState(false);
  // State lưu từ khóa tìm kiếm
  const [q, setQ] = useState("");
  // State lọc: thời gian chuẩn bị tối đa (0 = không lọc)
  const [maxPrep, setMaxPrep] = useState(0);
  // State lọc: thời gian nấu tối đa (0 = không lọc)
  const [maxCook, setMaxCook] = useState(0);
  // State lưu số trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // ========== Lọc dữ liệu ==========
  // useMemo: chỉ tính lại khi items, q, maxPrep, maxCook thay đổi (tối ưu hiệu năng)
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase(); // Chuẩn hóa từ khóa tìm kiếm
    return items.filter((r) => {
      // Kiểm tra tên hoặc mô tả có chứa từ khóa hay không (hoặc không có từ khóa thì luôn đúng)
      const matchesQuery =
        !query ||
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query);
      // Kiểm tra thời gian chuẩn bị
      const matchesPrep = !maxPrep || r.prep <= maxPrep;
      // Kiểm tra thời gian nấu
      const matchesCook = !maxCook || r.cook <= maxCook;
      // Trả về true nếu món thỏa cả 3 điều kiện
      return matchesQuery && matchesPrep && matchesCook;
    });
  }, [items, q, maxPrep, maxCook]);

  // ========== Tính tổng số trang ==========
  const totalPages = Math.ceil(filtered.length / pageSize);

  // ========== Cắt dữ liệu theo trang ==========
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize, // vị trí bắt đầu
    currentPage * pageSize        // vị trí kết thúc
  );

  // ========== Hàm chuyển trang ==========
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ========== Khi đổi pageSize thì về trang 1 ==========
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Bộ lọc + thanh tìm kiếm */}
      <Filters
        q={q} setQ={setQ}                 // Từ khóa và hàm cập nhật
        maxPrep={maxPrep} setMaxPrep={setMaxPrep} // Thời gian chuẩn bị tối đa
        maxCook={maxCook} setMaxCook={setMaxCook} // Thời gian nấu tối đa
        pageSize={pageSize}               // Số món/trang hiện tại
        setPageSize={handlePageSizeChange} // Hàm đổi số món/trang
      />

      {/* Hiển thị danh sách món ăn dạng lưới */}
      {/* xs=1: mobile 1 cột, md=2: tablet 2 cột, lg=3: desktop 3 cột */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {paginated.map((r, idx) => (
          <Col key={idx}>
            <RecipeCard
              recipe={r} // dữ liệu món ăn
              onView={(rec) => { // khi bấm nút xem chi tiết
                setSelected(rec); // lưu món được chọn
                setOpen(true);    // mở modal
              }}
              onAddToFavorites={onAddToFavorites} // thêm vào yêu thích
            />
          </Col>
        ))}
      </Row>

      {/* ========== Thanh phân trang ==========
          Chỉ hiển thị nếu có nhiều hơn 1 trang */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {/* Nút về trang đầu */}
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            {/* Nút lùi 1 trang */}
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {/* Danh sách các số trang */}
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage} // trang hiện tại
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}

            {/* Nút tiến 1 trang */}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            {/* Nút tới trang cuối */}
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}

      {/* ========== Modal xem chi tiết món ăn ========== */}
      <RecipeModal
        show={open}            // true = mở modal
        recipe={selected}      // dữ liệu món được chọn
        onAddToCart={() => {   // khi bấm "Add to Cart"
          onAddToCart();       // gọi callback thêm vào giỏ
          setOpen(false);      // đóng modal
        }}
        onHide={() => setOpen(false)} // đóng modal khi bấm X hoặc Cancel
      />
    </>
  );
}
