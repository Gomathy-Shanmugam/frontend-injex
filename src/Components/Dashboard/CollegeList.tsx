import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CollegeList.css";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import Sidenav from "./Sidenav";

export interface College {
  id: number;
  collegeName: string;
  location: string;
  universityType: string;
  contactPerson: string;
  contactNumber: string;
  emailId: string;
}




 const CollegeList = () => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState<College[]>([]);

  // Load colleges from localStorage on component mount
  useEffect(() => {
    const savedColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
    setColleges(savedColleges);
  }, []);

  // Refresh colleges when component becomes visible (when navigating back from register)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedColleges = JSON.parse(
        localStorage.getItem("colleges") || "[]"
      );
      setColleges(savedColleges);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleStorageChange);
    };
  }, []);

  const handleNewCollege = () => {
    navigate("/college-register");
  };

  const handleStudentRegistration = (collegeId: number) => {
    navigate("/student-registration");
  };

  return  (
    <>
      <TopBar />
      <MainNav />
      <div className="d-flex">
        <Sidenav />
        <div className="college-list-main-content">
          <div className="college-list-container">
            <div className="college-list-header">
              <h2>College list</h2>
              <button className="new-college-btn" onClick={handleNewCollege}>
                <span className="plus-icon">+</span>
                New College
              </button>
            </div>

            <div className="college-table-container">
              <table className="college-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>College Name</th>
                    <th>Location</th>
                    <th>University Type</th>
                    <th>Contact Person</th>
                    <th>Contact Number</th>
                    <th>Email ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {colleges.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        style={{
                          textAlign: "center",
                          padding: "40px",
                          color: "#6b7280",
                        }}
                      >
                        <div style={{ fontSize: "16px", fontWeight: "500" }}>
                          No colleges found. Click "New College" to add your
                          first college.
                        </div>
                      </td>
                    </tr>
                  ) : (
                    colleges.map((college, index) => (
                      <tr key={college.id}>
                        <td>{index + 1}</td>
                        <td>{college.collegeName}</td>
                        <td>{college.location}</td>
                        <td>{college.universityType}</td>
                        <td>{college.contactPerson}</td>
                        <td>{college.contactNumber}</td>
                        <td>{college.emailId}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="edit-btn" title="Edit">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <button
                              className="arrow-btn"
                              title="Student Registration"
                              onClick={() =>
                                handleStudentRegistration(college.id)
                              }
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M5 12h14M12 5l7 7-7 7"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeList;
