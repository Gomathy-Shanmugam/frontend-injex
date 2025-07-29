import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Dropdown,
  Badge,
  Button,
  Pagination,
} from "react-bootstrap";
import "./StudentOverview.css";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import Sidenav from "./Sidenav";
import { useNavigate } from "react-router-dom";

interface Student {
  name: string;
  section: string;
  college: string;
  batch: string;
  dept: string;
  email: string;
  phone: string;
}

const StudentOverview: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState("colleges");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCollege, setFilterCollege] = useState("All");
  const [filterDept, setFilterDept] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const dummyData: Student[] = [
      {
        name: "Banu",
        section: "B/1st Year",
        college: "KPR College of Arts & Science",
        batch: "KPR234/4th Batch",
        dept: "CDF",
        email: "firosh.cdf@kpr.com",
        phone: "9874561230",
      },
      {
        name: "Gomathi",
        section: "A/2nd Year",
        college: "Kongu College of Arts & Science",
        batch: "KPR234/4th Batch",
        dept: "CDF",
        email: "banu.cdf@kongu.com",
        phone: "9874561230",
      },
      {
        name: "Gomathi",
        section: "A/2nd Year",
        college: "Kathir College of Arts & Science",
        batch: "KPR234/4th Batch",
        dept: "Bsc",
        email: "banu.cdf@kongu.com",
        phone: "9874561230",
      },
    ];
    setStudents(dummyData);
  }, []);

  const filtered = students.filter((s) => {
    const matchSearch =
      s.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCollege = filterCollege === "All" || s.college === filterCollege;
    const matchDept = filterDept === "All" || s.dept === filterDept;
    return matchSearch && matchCollege && matchDept;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const uniqueColleges = Array.from(new Set(students.map((s) => s.college)));
  const uniqueDepts = Array.from(new Set(students.map((s) => s.dept)));

  return (
    <>
      <TopBar />
      <MainNav />
      <div className="d-flex">
        <Sidenav />

        <div className="w-100 px-3">
          {/* Tabs & Filters */}
          <div className="d-flex flex-wrap mb-3 gap-2 p-4 tab-filter-container">
            {/* Tabs */}
            <div className="d-flex flex-wrap gap-2 mb-2">
              <Button
                className={`summary-tab`}
                onClick={() => navigate("/college-overview")}
              >
                Colleges <span>{uniqueColleges.length}</span>
              </Button>

              <Button
                className="summary-tab"
                onClick={() => navigate("/student-overview")} // <-- navigate instead of switching tab
              >
                Students <span>10</span>
              </Button>
              <button className="summary-tab">
                Author's <span>0</span>
              </button>
              <button className="summary-tab">
                Tutor's <span>0</span>
              </button>
            </div>

            {/* Search + Filters */}
            {activeTab === "colleges" && (
              <>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="search-input"
                  style={{ maxWidth: "300px", minWidth: "200px" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="border"
                    style={{ fontSize: "14px" }}
                  >
                    College
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFilterCollege("All")}>
                      All
                    </Dropdown.Item>
                    {uniqueColleges.map((college, idx) => (
                      <Dropdown.Item
                        key={idx}
                        onClick={() => setFilterCollege(college)}
                      >
                        {college}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="border"
                    style={{ fontSize: "14px" }}
                  >
                    Department
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFilterDept("All")}>
                      All
                    </Dropdown.Item>
                    {uniqueDepts.map((dept, idx) => (
                      <Dropdown.Item
                        key={idx}
                        onClick={() => setFilterDept(dept)}
                      >
                        {dept}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </div>

          {/* Table */}
          <Table hover responsive className="custom-table">
            <thead>
              <tr>
                <th>College Name</th>
                <th>Student’s Name</th>
                <th>Section/Year</th>
                <th>Student ID/Batch</th>
                <th>Department</th>
                <th>Email ID</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((s, i) => (
                <tr key={i}>
                  <td>{s.college}</td>
                  <td>{s.name}</td>
                  <td>{s.section}</td>
                  <td>{s.batch}</td>
                  <td>{s.dept}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              <Pagination.First
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentOverview;
