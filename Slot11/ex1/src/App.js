import React from "react";
import ProfileForm from "./ProfileForm";
import "./App.css";

function App() {
  const handleFormSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="container mt-5">
      <h2>Profile Form</h2>
      <ProfileForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
