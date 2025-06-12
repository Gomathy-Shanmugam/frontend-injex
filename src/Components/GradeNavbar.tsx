import React, { useState } from "react";
import { Container } from "react-bootstrap";

const GradeTabs = () => {
  const [activeTab, setActiveTab] = useState("grade");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Container
      fluid
      className="pt-1"
      style={{ height: "100vh", display: "flex", alignItems: "flex-start" }}
    >
      <div
        style={{
          backgroundColor: "lightgray",
          padding: "20px",
          borderRadius: "8px",
          width: "250px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <p className="mb-2 text-muted" style={{ fontSize: "14px" }}>
          ← My Courses
        </p>
        <h4 className="fw-bold mb-4" style={{ fontSize: "16px" }}>
          Create Course
        </h4>

        <div className="vertical-tabs">
          <div
            className={`tab-item ${activeTab === "grade" ? "active" : ""}`}
            onClick={() => handleTabClick("grade")}
            style={{ fontSize: "14px", cursor: "pointer", marginBottom: "10px" }}
          >
            Grade
          </div>
          <div
            className={`tab-item ${activeTab === "rubrics" ? "active" : ""}`}
            onClick={() => handleTabClick("rubrics")}
            style={{ fontSize: "14px", cursor: "pointer" }}
          >
            Rubrics
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GradeTabs;
