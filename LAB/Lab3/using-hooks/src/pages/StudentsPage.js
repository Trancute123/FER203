import React, { useState, useMemo, useEffect } from "react";
import { students } from "../data/students";
import Filters from "../components/students/Filters";
import SortDropdown from "../components/students/SortDropdown";
import StudentGrid from "../components/students/StudentGrid";
import StudentDetailModal from "../components/students/StudentDetailModal";

function StudentsPage({ searchQuery = "" }) {
  const [search, setSearch] = useState(searchQuery);
  const [ageFilter, setAgeFilter] = useState("All Ages");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // đồng bộ quick search từ navbar
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  // Filter + Sort
  const filteredStudents = useMemo(() => {
    let result = [...students];

    // search theo name/email/id/age
    if (search) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          String(s.id).includes(q) ||
          String(s.age).includes(q)
      );
    }

    // filter age
    if (ageFilter === "≤ 20") result = result.filter((s) => s.age <= 20);
    if (ageFilter === "21 – 25") result = result.filter((s) => s.age >= 21 && s.age <= 25);
    if (ageFilter === "> 25") result = result.filter((s) => s.age > 25);

    // filter avatar: tick -> chỉ còn người có avatar; bỏ tick -> hiện tất cả
    if (hasAvatar) {
      result = result.filter((s) => s.avatar && s.avatar.trim() !== "");
    }

    // sort
    if (sortBy === "age-asc") result.sort((a, b) => a.age - b.age);
    if (sortBy === "age-desc") result.sort((a, b) => b.age - a.age);
    if (sortBy === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "name-desc") result.sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [search, ageFilter, hasAvatar, sortBy]);

  const handleView = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  return (
    <div className="container my-4">
      <Filters
        search={search}
        setSearch={setSearch}
        ageFilter={ageFilter}
        setAgeFilter={setAgeFilter}
        hasAvatar={hasAvatar}
        setHasAvatar={setHasAvatar}
      />
      <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />

      <StudentGrid students={filteredStudents} onView={handleView} />

      <StudentDetailModal
        student={selectedStudent}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
}

export default StudentsPage;
