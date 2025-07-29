import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./CollegeSummaryCard.css"

const CollegeSummaryCard: React.FC = () => {
  const [colleges, setColleges] = useState<{ collegeName: string }[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("colleges");
    if (stored) {
      const parsed = JSON.parse(stored);
      setColleges(parsed);
    }
  }, []);

  
  return (
  <div className="college-summary-card shadow-sm rounded-4 mb-4 ">
  <div className="college-info-wrapper">
    <div className="college-info p-3">
      <h6 className="fw-bold mb-3 text-primary">Driven by Injex</h6>
      <ul className="ps-2 mb-3" style={{ listStyleType: "disc" }}>
        {colleges.slice(0, 4).map((college, index) => (
          <li
            key={index}
            style={{
              fontSize: "14px",
              color: "#1f2937",
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {college.collegeName}
          </li>
        ))}
      </ul>
      <Button size="sm" variant="primary" className="rounded-pill px-3 ">
        View All
      </Button>
    </div>
  </div>

  <div className="college-count">
    <div style={{ fontSize: "42px", fontWeight: 600,paddingLeft:'70px' }}>{colleges.length}</div>
    <div style={{ fontSize: "15px", fontWeight: 500,paddingLeft:'70px' }}>Colleges</div>
  </div>
</div>

);

};

export default CollegeSummaryCard;
