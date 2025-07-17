import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";

const CollegeOverviewCard: React.FC = () => {
  const [colleges, setColleges] = useState<any[]>([]);
  const [authorCount, setAuthorCount] = useState(0);
  const [tutorCount, setTutorCount] = useState(0);

  useEffect(() => {
    const loadColleges = () => {
      const storedList = localStorage.getItem("colleges"); // ✅ Corrected key
      if (storedList) {
        const parsedList = JSON.parse(storedList);
        setColleges(parsedList);

        // Count based on role (if available)
        const authors = parsedList.filter((c: any) => c.role === "author").length;
        const tutors = parsedList.filter((c: any) => c.role === "tutor").length;

        setAuthorCount(authors);
        setTutorCount(tutors);
      }
    };

    loadColleges();

    // Optional: Auto-refresh when window/tab is focused
    window.addEventListener("focus", loadColleges);

    return () => {
      window.removeEventListener("focus", loadColleges);
    };
  }, []);

  return (
    <Card className="p-3">
      <div className="d-flex justify-content-between mb-3">
        <h6>Categories</h6>
        <div className="tabs">
          <Button variant="light" className="me-2">
            Colleges <span className="badge bg-primary">{colleges.length}</span>
          </Button>
          <Button variant="light" className="me-2">
            Students <span className="badge bg-primary">{colleges.length }</span>
          </Button>
          <Button variant="light" className="me-2">
            Author's <span className="badge bg-primary">{authorCount}</span>
          </Button>
          <Button variant="light">
            Tutor's <span className="badge bg-primary">{tutorCount}</span>
          </Button>
        </div>
      </div>

      <Table bordered hover responsive>
        <thead className="table-light">
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
              <td colSpan={6} className="text-center text-muted py-4">
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
                <td>
                  {college.program ? (
                    <span className="badge bg-danger">{college.program}</span>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <div className="text-end">
        <Button variant="primary">View All</Button>
      </div>
    </Card>
  );
};

export default CollegeOverviewCard;
