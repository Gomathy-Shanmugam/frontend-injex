import React, { useEffect, useState } from "react";
import { Table, Badge, Button } from "react-bootstrap";

import { FaRegFolderOpen } from "react-icons/fa6";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import MasterNav from "./MasterNav";
import { useNavigate } from "react-router-dom";
import "./AppAdminModule.css";

interface ModuleData {
  id: number;
  name: string;
  dropdowns: number;
  createdOn: string;
  createdBy: string;
  status: string;
  path: string;
}

const AppAdminModule: React.FC = () => {
  const [modules, setModules] = useState<ModuleData[]>([]);
  const navigate = useNavigate();

  const handleViewClick = (path: string) => {
    navigate(path);
  };

  // Simulate API call
  useEffect(() => {
    const dummyData: ModuleData[] = [
      {
        id: 1,
        name: "College Admin Signup",
        dropdowns: 7,
        createdOn: "12/07/2025",
        createdBy: "Admin",
        status: "Active",
        path: "/course-category",
      },
      {
        id: 2,
        name: "Student's Registration",
        dropdowns: 4,
        createdOn: "12/07/2025",
        createdBy: "Admin",
        status: "Active",
        path: "",
      },
      {
        id: 3,
        name: "Grading",
        dropdowns: 3,
        createdOn: "12/07/2025",
        createdBy: "Admin",
        status: "Active",
        path: "",
      },
      {
        id: 4,
        name: "Rubrics",
        dropdowns: 4,
        createdOn: "12/07/2025",
        createdBy: "Admin",
        status: "Active",
        path: "",
      },
      {
        id: 5,
        name: "Course Creation",
        dropdowns: 3,
        createdOn: "12/07/2025",
        createdBy: "Admin",
        status: "Active",
        path: "",
      },
      {
        id: 6,
        name: "Injex Program",
        dropdowns: 3,
        createdOn: "12/07/2025",
        createdBy: "Admin",
        status: "Active",
        path: "",
      },
      {
        id: 7,
        name: "Author/Tutor Approval",
        dropdowns: 3,
        createdOn: "12/07/2025",
        createdBy: "Admin",
        status: "Active",
        path: "",
      },
    ];

    setModules(dummyData);
  }, []);

  return (
    <>
      <TopBar />
      <MainNav />
      <div className="d-flex">
        <MasterNav />
        <div className="container mt-4">
          <h5 className="fw-bold mb-3">
            <FaRegFolderOpen className="me-2" />
            Choose the Module
          </h5>
          <Table hover responsive className="p-3">
            <thead
              className="text-white"
              style={{ backgroundColor: "#0066da" }}
            >
              <tr>
                <th>S.No</th>
                <th>Module Name</th>
                <th>Dropdowns</th>
                <th>Created On</th>
                <th>Created by</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((mod, index) => (
                <tr
                  key={mod.id}
                  className="align-middle"
                  style={{ padding: "10px 0" }}
                >
                  <td style={{ padding: "14px 8px" }}>{index + 1}</td>
                  <td style={{ padding: "14px 8px" }}>{mod.name}</td>
                  <td style={{ padding: "12px 8px" }}>{mod.dropdowns}</td>
                  <td style={{ padding: "12px 8px" }}>{mod.createdOn}</td>
                  <td style={{ padding: "12px 8px" }}>{mod.createdBy}</td>
                  <td>
                    <span className="status-badge">{mod.status}</span>
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    <Button
                      variant="link"
                      className="view-btn p-0"
                      onClick={() => handleViewClick(mod.path)}
                    >
                      <span className="arrow-icon-circle">→</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AppAdminModule;
