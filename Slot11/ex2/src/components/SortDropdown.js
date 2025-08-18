import React from "react";
import { Dropdown } from "react-bootstrap";

function SortDropdown({ sortBy, setSortBy }) {
  return (
    <Dropdown className="mb-3">
      <Dropdown.Toggle className="sort-btn">Sort By</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item active={sortBy === "age-asc"} onClick={() => setSortBy("age-asc")}>
          Age ↑
        </Dropdown.Item>
        <Dropdown.Item active={sortBy === "age-desc"} onClick={() => setSortBy("age-desc")}>
          Age ↓
        </Dropdown.Item>
        <Dropdown.Item active={sortBy === "name-asc"} onClick={() => setSortBy("name-asc")}>
          Name A → Z
        </Dropdown.Item>
        <Dropdown.Item active={sortBy === "name-desc"} onClick={() => setSortBy("name-desc")}>
          Name Z → A
        </Dropdown.Item>
      </Dropdown.Menu>

      {/* ✅ CSS lồng trực tiếp */}
      <style>{`
        .sort-btn {
          background-color: #4da6ff !important; /* xanh giống Search */
          border: none !important;
          border-radius: 20px !important; /* bo tròn */
          padding: 6px 16px !important;
          font-weight: 600;
        }
        .sort-btn:hover,
        .sort-btn:focus {
          background-color: #3399ff !important; /* hover đậm hơn */
        }
      `}</style>
    </Dropdown>
  );
}

export default SortDropdown;
