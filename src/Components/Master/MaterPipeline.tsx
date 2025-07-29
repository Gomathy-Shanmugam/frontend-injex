import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import "./MaterPipeline.css";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import MasterNav from "./MasterNav";

const pipelineData = [
  {
    name: "App Admin",
    modules: 7,
    created: "12/07/2025",
    by: "Admin",
    status: "Active",
  },
  {
    name: "College Admin",
    modules: 4,
    created: "12/07/2025",
    by: "Admin",
    status: "Active",
  },
  {
    name: "College Faculty",
    modules: 3,
    created: "12/07/2025",
    by: "Admin",
    status: "Active",
  },
  {
    name: "Student's",
    modules: 4,
    created: "12/07/2025",
    by: "Admin",
    status: "Active",
  },
  {
    name: "Author",
    modules: 3,
    created: "12/07/2025",
    by: "Admin",
    status: "Active",
  },
  {
    name: "Tutor",
    modules: 3,
    created: "12/07/2025",
    by: "Admin",
    status: "Active",
  },
];

const MasterPipeline = () => {
  return (
    <>
      <TopBar />
      <MainNav />
      <div className="d-flex">
        <MasterNav />
        <div className="master-pipeline-container p-3 w-100">
          <h5 className="mb-5 fw-bold">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              alt="icon"
              width={20}
              className="me-2"
            />
            Choose the Pipeline
          </h5>

          <div className="table-responsive">
            <Table hover className="pipeline-table align-middle text-center  ">
              <thead className="table-header">
                <tr>
                  <th>S.No</th>
                  <th>Pipeline Name</th>
                  <th>No.of Modules</th>
                  <th>Created On</th>
                  <th>Created by</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {pipelineData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.modules}</td>
                    <td>{item.created}</td>
                    <td>{item.by}</td>
                    <td>
                      <span className="status-badge">{item.status}</span>
                    </td>
                    <td>
                      <Button variant="link" className="view-btn p-0">
                        <span className="arrow-icon-circle">→</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterPipeline;
