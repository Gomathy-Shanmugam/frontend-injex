import React, { useEffect, useState } from "react";
import { Button, Card, Table, Badge } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Courseview from "./CollegeOverview"
import "./CollegeSummaryButtons.css";

const CollegeSummaryButtons: React.FC = () => {

   const navigate = useNavigate();
  const [colleges, setColleges] = useState<any[]>([]);
  const [authorCount, setAuthorCount] = useState(0);
  const [tutorCount, setTutorCount] = useState(0);

  useEffect(() => {
    const loadColleges = () => {
      const storedList = localStorage.getItem("colleges");
      if (storedList) {
        const parsedList = JSON.parse(storedList);
        setColleges(parsedList);

        const authors = parsedList.filter((c: any) => c.role === "author").length;
        const tutors = parsedList.filter((c: any) => c.role === "tutor").length;

        setAuthorCount(authors);
        setTutorCount(tutors);
      }
    };

    loadColleges();
    window.addEventListener("focus", loadColleges);
    return () => window.removeEventListener("focus", loadColleges);
  }, []);

  return (
    <Card className="p-4 college-summary-container">
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button className="summary-tab active-tab">
          Colleges <span>{colleges.length}</span>
        </button>
        <button className="summary-tab">Students <span>{colleges.length}</span></button>
        <button className="summary-tab">Author's <span>{authorCount}</span></button>
        <button className="summary-tab">Tutor's <span>{tutorCount}</span></button>
      </div>

      <Table hover responsive className="custom-table">
        <thead>
          <tr>
            <th>College Name</th>
            <th>Location</th>
            <th>Contact Person</th>
            <th>Contact Number</th>
            <th>Email ID</th>
            <th>Program</th>
          </tr>
        </thead>
        <tbody>
          {colleges.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-muted py-3">
                No colleges found.
              </td>
            </tr>
          ) : (
            colleges.map((college, idx) => (
              <tr key={idx}>
                <td>{college.collegeName || college.name}</td>
                <td>{college.location}</td>
                <td>{college.contactPerson}</td>
                <td>{college.contactNumber}</td>
                <td>{college.emailId || college.email}</td>
                <td className="d-flex align-items-center justify-content-between">
                  <Badge
                    bg={college.program === "Started" ? "success" : "danger"}
                    className="px-4 py-2 mt-3 rounded-pill"
                  >
                    {college.program || "Not started"}
                  </Badge>
                 
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <div className="text-start mt-3">
        <Button variant="primary" className="rounded-pill px-4" onClick={()=>navigate("/college-overview")}>View All</Button>
      </div>
    </Card>
  );
};

export default CollegeSummaryButtons;
