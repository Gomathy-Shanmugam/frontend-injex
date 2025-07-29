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
import PendingRequestCard from "./PendingRequestsCard";
import UpcomingInterviewsCard from "./UpcomingInterviewsCard";
import { Outlet } from 'react-router-dom';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    axios.get("/api/requests/count").then((res) => setRequests(res.data));
    axios.get("/api/colleges").then((res) => {
      const data = Array.isArray(res.data) ? res.data : res.data.colleges ?? [];
      setColleges(data);
    });
    axios.get("/api/interviews/upcoming").then((res) => {
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.interviews ?? [];
      setInterviews(data);
    });
    axios
      .get("http://localhost:5000/api/requests/pending-users")
      .then((res) => {
        console.log("Pending Users API Response", res.data);
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.pendingUsers ?? [];
        setPendingUsers(data);
      });
  }, []);

  // Safely calculate circle stroke progress
  const accepted = requests.accepted ?? 0;
  const pending = requests.pending ?? 0;
  const total = accepted + pending;
  const percent = total === 0 ? 0 : accepted / total;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percent);

  return (
    // Inside return(...)
    <>
      <TopBar />
      <MainNav />
      <div className="d-flex">
        <Sidenav />

        <div className="dashboard px-2 pt-4 pb-4 flex-grow-1 ">
          <div className="row g-0">
            {/* Left Column */}
            <div className="col-md-9  left-col">
              {/* Cards Row */}
              {/* <div className="d-flex flex-row flex-wrap gap-1 mb-4  flex-fill"> */}
              <div
                className="card-wrapper mb-4"
                style={{
                  width: "100%",
                  transition: "all 0.3s ease",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                }}
              >
                {/* Author/Tutor Requests */}
                <div
                  className="shadow-sm rounded-4"
                  style={{
                    flex: "1 1 200px",
                    minWidth: "180px",
                    maxWidth: "200px",
                    height: "250px",
                  }}
                >
                  {/* Author/Tutor Requests */}
                  <Card
                    className="author-card text-center p-3 shadow-sm rounded-4"
                    style={{
                      flex: "1 1 180px",
                      minWidth: "150px",
                      maxWidth: "200px",
                      height: "250px",
                      transition: "all 0.3s ease",
                      marginTop:"20px"
                    }}
                  >
                    <h6 className="text-primary fw-semibold p-1 mt-3">
                      Author/Tutor Requests
                    </h6>
                    <div
                      className="position-relative d-flex justify-content-center align-items-center"
                      style={{ height: 200 }}
                    >
                      <svg width="120" height="120">
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          stroke="#E0E0E0"
                          strokeWidth="5"
                          fill="none"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          stroke="#007BFF"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray="314.16" // 2 * π * 50
                          strokeDashoffset={dashOffset}
                          transform="rotate(-90 60 60)"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div
                        className="position-absolute text-primary fw-bold"
                        style={{ fontSize: "27px" }}
                      >
                        {total}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-2 mt-3">
                      <span
                        className="text-primary"
                        style={{ fontSize: "13px" }}
                      >
                        {accepted} <u>Accepted</u>
                      </span>
                      <span
                        className="text-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        {pending} <u>Pending</u>
                      </span>
                    </div>
                  </Card>
                </div>

                {/* Driven by Injex */}
               

                {/* College Summary Card */}
                <div
                  className="shadow-sm rounded-4"
                  style={{
                    // flex: "1 1 320px",
                    minWidth: "280px",
                    maxWidth: "400px",
                    height: "250px",
                    marginTop:"20px"
                  }}
                >
                  <CollegeSummaryCard />
                </div>

              

                {/* Upcoming Interviews */}
                <div
                  className="shadow-sm rounded-4 "
                  style={{
                    flex: "1 1 300px",
                    minWidth: "260px",
                    maxWidth: "320px",
                    height: "250px",
                    marginTop:"20px",
                   
                  }}
                >
                  <UpcomingInterviewsCard />
                </div>

                {/* </Card> */}
              </div>

              {/* Categories Table */}
               <CollegeSummaryButtons />

              {/* <CollegeSummaryButtons /> */}
            </div>

            {/* Right Column */}
            <div className="col-md-3 right-col">
              
              <PendingRequestCard />
            </div>
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
