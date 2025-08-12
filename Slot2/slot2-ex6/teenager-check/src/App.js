import React from "react";

export default function App() {
  // Dữ liệu people
  const people = [
    { name: "Jack", age: 50 },
    { name: "Michael", age: 9 },
    { name: "John", age: 40 },
    { name: "Ann", age: 19 },
    { name: "Elisabeth", age: 16 },
  ];

  // Điều kiện tuổi teen
  const isTeen = (p) => p.age >= 10 && p.age <= 20;

  // 1. Tìm người đầu tiên là teenager
  const firstTeen = people.find(isTeen);

  // 2. Tìm tất cả người là teenager
  const allTeens = people.filter(isTeen);

  // 3. Kiểm tra tất cả có phải teenager không
  const everyTeen = people.every(isTeen);

  // 4. Kiểm tra ít nhất 1 người là teenager không
  const anyTeen = people.some(isTeen);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Teenager Checker</h1>
      <p>
        <strong>First teen:</strong>{" "}
        {firstTeen ? `${firstTeen.name} (${firstTeen.age})` : "Không có"}
      </p>
      <p>
        <strong>All teens:</strong>{" "}
        {allTeens.length > 0
          ? allTeens.map((p) => p.name).join(", ")
          : "Không có"}
      </p>
      <p>
        <strong>Every is teen?</strong> {everyTeen ? "Yes" : "No"}
      </p>
      <p>
        <strong>Any teen?</strong> {anyTeen ? "Yes" : "No"}
      </p>
    </div>
  );
}
