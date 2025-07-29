import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Form,
  Dropdown,
  Badge,
  Button,
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CollegeOverview.css";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import Sidenav from "./Sidenav";
import { BsThreeDotsVertical } from "react-icons/bs";
import StudentOverview from "./StudentsOverview"; // Student component

interface College {
  collegeName: string;
  location: string;
  contactPerson: string;
  contactNumber: string;
  emailId: string;
  program: string;
  status: "Started" | "Not started";
}

const Collegeview: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"colleges" | "students">(
    "colleges"
  );
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const dummyData: College[] = [
      {
        collegeName: "KPR College of Arts & Science",
        location: "Karumathampatti",
        contactPerson: "Firosh",
        contactNumber: "9876543210",
        emailId: "firosh.cdf@kpr.com",
        program: "Injex Program",
        status: "Started",
      },
      {
        collegeName: "Kongu College of Arts & Science",
        location: "Nanjampuram",
        contactPerson: "Banu",
        contactNumber: "9876543210",
        emailId: "banu.cdf@kongu.com",
        program: "Mixed",
        status: "Not started",
      },
      {
        collegeName: "Excel College of Arts & Science",
        location: "Komarapalayam",
        contactPerson: "Gomathi",
        contactNumber: "9876543210",
        emailId: "goms.cdf@excel.com",
        program: "Own Program",
        status: "Not started",
      },
      {
        collegeName: "Nandha College of Arts & Science",
        location: "Komarapalayam",
        contactPerson: "Gomathi",
        contactNumber: "9876543210",
        emailId: "goms.cdf@excel.com",
        program: "Own Program",
        status: "Started",
      },
      {
        collegeName: "Kamaden College of Arts & Science",
        location: "Komarapalayam",
        contactPerson: "Gomathi",
        contactNumber: "9876543210",
        emailId: "goms.cdf@excel.com",
        program: "Own Program",
        status: "Not started",
      },
      {
        collegeName: "KPR College of Arts & Science",
        location: "Karumathampatti",
        contactPerson: "Firosh",
        contactNumber: "9876543210",
        emailId: "firosh.cdf@kpr.com",
        program: "Injex Program",
        status: "Started",
      },
      {
        collegeName: "Kongu College of Arts & Science",
        location: "Nanjampuram",
        contactPerson: "Banu",
        contactNumber: "9876543210",
        emailId: "banu.cdf@kongu.com",
        program: "Mixed",
        status: "Not started",
      },
      {
        collegeName: "Excel College of Arts & Science",
        location: "Komarapalayam",
        contactPerson: "hanshi",
        contactNumber: "9876543210",
        emailId: "goms.cdf@excel.com",
        program: "Own Program",
        status: "Not started",
      },
      {
        collegeName: "Nandha College of Arts & Science",
        location: "Komarapalayam",
        contactPerson: "anu",
        contactNumber: "9876543210",
        emailId: "goms.cdf@excel.com",
        program: "Own Program",
        status: "Started",
      },
      {
        collegeName: "Kamaden College of Arts & Science",
        location: "Komarapalayam",
        contactPerson: "abi",
        contactNumber: "9876543210",
        emailId: "goms.cdf@excel.com",
        program: "Own Program",
        status: "Not started",
      },
    ];
    setColleges(dummyData);
  }, []);

  const filtered = colleges.filter((college) => {
    const matchesStatus =
      filterStatus === "All" || college.status === filterStatus;
    const matchesSearch = college.collegeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchTerm]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <TopBar />
      <MainNav />
      <div className="d-flex">
        <Sidenav />
        <Card className="p-4 w-100">
          <div className="d-flex flex-wrap mb-3 gap-2 summary-tab-container">
            {/* Tabs */}
            <div className="d-flex flex-wrap gap-2 mb-2">
              <button
                className={`summary-tab ${
                  activeTab === "colleges" ? "active-tab" : ""
                }`}
                onClick={() => setActiveTab("colleges")}
              >
                Colleges <span>{colleges.length}</span>
              </button>
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

            {/* Search */}
            {activeTab === "colleges" && (
              <Form.Control
                type="text"
                placeholder="Search"
                className="search-input"
                style={{ maxWidth: "300px", minWidth: "200px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}

            {/* Filters & Add */}
            {activeTab === "colleges" && (
              <div className="d-flex flex-wrap gap-2">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="border"
                    style={{ fontSize: "14px" }}
                  >
                    Program Type
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFilterStatus("Started")}>
                      Injex Program
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setFilterStatus("Not started")}
                    >
                      Own Program
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilterStatus("All")}>
                      Mixed Program
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="border"
                    style={{ fontSize: "14px" }}
                  >
                    Program Status
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFilterStatus("Started")}>
                      Started
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setFilterStatus("Not started")}
                    >
                      Not Started
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilterStatus("All")}>
                      All
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  variant="warning"
                  onClick={() => navigate("/college-register")}
                  style={{ fontSize: "14px" }}
                >
                  + New College
                </Button>
              </div>
            )}
          </div>

          {/* College Table View */}
          {activeTab === "colleges" && (
            <>
              <Table hover responsive className="custom-table">
                <thead>
                  <tr>
                    <th>College Name</th>
                    <th>Location</th>
                    <th>Contact Person</th>
                    <th>Contact Number</th>
                    <th>Email ID</th>
                    <th>Program</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((college, idx) => (
                    <tr key={idx}>
                      <td>{college.collegeName}</td>
                      <td>{college.location}</td>
                      <td>{college.contactPerson}</td>
                      <td>{college.contactNumber}</td>
                      <td>{college.emailId}</td>
                      <td>{college.program}</td>
                      <td>
                        <Badge
                          bg={
                            college.status === "Started" ? "success" : "danger"
                          }
                          className="px-3 py-2 rounded-pill"
                        >
                          {college.status}
                        </Badge>
                      </td>
                      <td>
                        <BsThreeDotsVertical />
                      </td>
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
            </>
          )}

          {/* Student Overview */}
          {activeTab === "students" && <StudentOverview />}
        </Card>
      </div>
    </>
  );
};

export default Collegeview;
