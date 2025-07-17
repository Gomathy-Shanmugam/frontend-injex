import React, { useEffect, useState, type ReactNode } from "react";
import { Card, Table, Button } from "react-bootstrap";
import axios from "axios";
import "./Dashboard.css";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import Sidenav from "./Sidenav";
import { FaArrowRight } from "react-icons/fa";
import CollegeSummaryButtons from "./CollegeSummaryButtons";
import CollegeSummaryCard from "./CollegeSummaryCard";


type College = {
  name: string;
  location: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  program?: string;
};

type Interview = {
  name: string;
  role: string;
  date: string;
  time: string;
};

type PendingUser = {
  timeAgo: ReactNode;
  color: string;
  name: string;
  role: string;
};



const Dashboard = () => {
  const [requests, setRequests] = useState({ accepted: 0, pending: 0 });
  const [colleges, setColleges] = useState<College[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);

  useEffect(() => {
    axios.get("/api/requests/count").then((res) => setRequests(res.data));
    axios.get("/api/colleges").then((res) => {
      const data = Array.isArray(res.data) ? res.data : res.data.colleges ?? [];
      setColleges(data);
    });
    axios.get("/api/interviews/upcoming").then((res) => {
      const data = Array.isArray(res.data) ? res.data : res.data.interviews ?? [];
      setInterviews(data);
    });
    axios.get("http://localhost:5000/api/requests/pending-users").then((res) => {
      console.log("Pending Users API Response", res.data);
      const data = Array.isArray(res.data) ? res.data : res.data.pendingUsers ?? [];
      setPendingUsers(data);
    });
  }, []);


  useEffect(() => {
  setPendingUsers([
    {
      name: "Sampath Kasirajan",
      role: "Knitting & Product Development",
      timeAgo: "4 hours ago",
      color: "#00B894"
    },
    {
      name: "Firosh",
      role: "Fashion Designer",
      timeAgo: "16 hours ago",
      color: "#A29BFE"
    },
    {
      name: "Roshan",
      role: "Product Quality Analyst",
      timeAgo: "3 days ago",
      color: "#FF7675"
    },
     {
      name: "Roshan",
      role: "Product Quality Analyst",
      timeAgo: "3 days ago",
      color: "#FF7675"
    }
  ]);
}, []);


  // Safely calculate circle stroke progress
  const accepted = requests.accepted ?? 0;
  const pending = requests.pending ?? 0;
  const total = accepted + pending;
  const percent = total === 0 ? 0 : accepted / total;
  const dashOffset = 219.91 - percent * 219.91;

  return (
  // Inside return(...)
<>
  <TopBar />
  <MainNav />
  <div className="d-flex">
    <Sidenav />
    <div className="dashboard p-4 flex-grow-1">
      <div className="row">
        {/* Left Column */}
        <div className="col-md-8">
    {/* Cards Row */}
    <div className="d-flex flex-row flex-wrap justify-content-between gap-3 mb-4">
      {/* Author/Tutor Requests */}
      <Card className="text-center p-3 shadow-sm rounded-4 flex-fill" style={{ minWidth: 20, maxWidth: 250, height: 230 }}>
        <h6 className="text-primary fw-semibold">Author/Tutor Requests</h6>
        <div className="position-relative d-flex justify-content-center align-items-center" style={{ height: 100 }}>
          <svg width="80" height="80">
            <circle cx="40" cy="40" r="35" stroke="#E0E0E0" strokeWidth="5" fill="none" />
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="#007BFF"
              strokeWidth="5"
              fill="none"
              strokeDasharray="219.91"
              strokeDashoffset={dashOffset}
              transform="rotate(-90 40 40)"
              strokeLinecap="round"
            />
          </svg>
          <div className="position-absolute text-primary fw-bold" style={{ fontSize: "22px" }}>{total}</div>
        </div>
        <div className="d-flex justify-content-between px-2 mt-2">
          <span className="text-primary" style={{ fontSize: "13px" }}>{accepted} <u>Accepted</u></span>
          <span className="text-secondary" style={{ fontSize: "13px" }}>{pending} <u>Pending</u></span>
        </div>
      </Card>

      {/* Driven by Injex */}
<div className="d-flex gap-3 flex-wrap">
 <CollegeSummaryCard/>


</div>
    
      {/* <Card className="p-3 shadow-sm rounded-4 flex-fill" style={{ minWidth: 250, maxWidth: 280, height: 230 }}>
        <h6>Driven by Injex</h6>
        <div className="d-flex justify-content-between h-100">
          <div>
            <ul className="mb-2 ps-3">
              {colleges.slice(0, 4).map((college, idx) => (
                <li key={idx}>{college.name}</li>
              ))}
            </ul>
            <Button variant="primary" size="sm">View All</Button>
          </div>
          <div className="display-5 fw-bold text-primary align-self-center text-end">
            {colleges.length}
            <br />
            <span className="fs-6">Colleges</span>
          </div>
        </div>
      </Card> */}

      {/* Upcoming Interviews */}
      <Card className="p-3 shadow-sm rounded-4 flex-fill" style={{ minWidth: 250, maxWidth: 250, height: 230 }}>
        <h6>Upcoming Interviews</h6>
        <ul className="list-unstyled mt-3">
          {interviews.map((item, idx) => (
            <li key={idx} className="mt-2">
              <strong>{item.name}</strong><br />
              {item.role}<br />
              {new Date(item.date).toLocaleDateString()} - {item.time}
            </li>
          ))}
        </ul>
      </Card>
    </div>

          {/* Categories Table */}
          {/* <Card className="p-3">
            <div className="d-flex justify-content-between mb-3">
              <h6>Categories</h6>
              <div className="tabs">
                <Button variant="light">Colleges <span className="badge bg-primary">{colleges.length}</span></Button>
                <Button variant="light">Students <span className="badge bg-primary">2035</span></Button>
                <Button variant="light">Author's <span className="badge bg-primary">110</span></Button>
                <Button variant="light">Tutor's <span className="badge bg-primary">20</span></Button>
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
                {colleges.map((college, idx) => (
                  <tr key={idx}>
                    <td>{college.name}</td>
                    <td>{college.location}</td>
                    <td>{college.contactPerson}</td>
                    <td>{college.contactNumber}</td>
                    <td>{college.email}</td>
                    <td>{college.program ? <span className="badge bg-danger">{college.program}</span> : null}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="primary">View All</Button>
          </Card> */}


          <CollegeSummaryButtons/>

          {/* <CollegeSummaryButtons /> */}
        </div>

        {/* Right Column */}
        <div className="col-md-4">
          <Card className="p-3 shadow-sm rounded-4 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">{pendingUsers.length} Pending Requests</h6>
              <Button variant="link" className="p-0 text-primary text-decoration-none">View All</Button>
            </div>
            <ul className="list-unstyled mt-3 pending-list">
              {pendingUsers.slice(0, 5).map((user, idx) => (
                <li key={idx} className="d-flex align-items-start mb-3 border-bottom pb-2">
                  <span
                    className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold me-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: user.color || "#6c63ff",
                      fontSize: "16px"
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="flex-grow-1">
                    <strong>{user.name}</strong><br />
                    <small>{user.role}</small><br />
                    <a href="#" className="text-primary text-decoration-none d-inline-flex align-items-center">
                      View Registration Details <FaArrowRight className="ms-1" size={12} />
                    </a>
                    <div className="text-muted" style={{ fontSize: "12px" }}>{user.timeAgo}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  </div>
</>


  );
};

export default Dashboard;
