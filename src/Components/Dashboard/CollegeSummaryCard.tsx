import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

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
    <Card
      className="shadow-sm rounded-4 p-3 d-flex flex-column justify-content-between"
      style={{
        minWidth: 280,
        maxWidth: 400,
        height: 230,
        background: "linear-gradient(90deg, #ffffff 60%, #2563eb 40%)",
        color: "#111827",
        overflow: "hidden",
      }}
    >
      <div>
        <h6 className="fw-bold mb-3 text-primary">Driven by Injex</h6>
        <ul className="ps-3 mb-3" style={{ listStyleType: "disc" }}>
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
        <Button size="sm" variant="primary">
          View All
        </Button>
      </div>

      <div
        className="text-white text-end fw-bold"
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          fontSize: "32px",
        }}
      >
        {colleges.length}
        <div className="fs-6">Colleges</div>
      </div>
    </Card>
  );
};

export default CollegeSummaryCard;
