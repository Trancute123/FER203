import React from "react";

function Exercise4() {
  const people = [
    { name: "Jack", age: 50 },
    { name: "Michael", age: 9 },
    { name: "John", age: 40 },
    { name: "Ann", age: 19 },
    { name: "Elisabeth", age: 16 },
  ];

  const firstTeen = people.find((p) => p.age >= 10 && p.age <= 20);
  const allTeens = people.filter((p) => p.age >= 10 && p.age <= 20);
  const isEveryTeen = people.every((p) => p.age >= 10 && p.age <= 20);
  const isAnyTeen = people.some((p) => p.age >= 10 && p.age <= 20);

  return (
    <div>
      <h2>Exercise 4 - JSX & ES6</h2>
      <p>First teen: {firstTeen ? firstTeen.name : "None"}</p>
      <p>All teens: {allTeens.map((p) => p.name).join(", ")}</p>
      <p>Every person is teen? {isEveryTeen.toString()}</p>
      <p>Any person is teen? {isAnyTeen.toString()}</p>
    </div>
  );
}

export default Exercise4;
