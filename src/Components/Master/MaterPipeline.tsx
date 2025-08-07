import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaArrowRight } from "react-icons/fa";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import MasterNav from "./MasterNav";
import "./MaterPipeline.css";

// PipelineItem interface defined outside to reuse
interface PipelineItem {
  id: string;
  name: string;
  modules: number;
  created: string;
  by: string;
  status: string;
}

const today = new Date().toLocaleDateString("en-GB");

// Default data used for initial state
const defaultData: PipelineItem[] = [
  {
    id: "app-admin",
    name: "App Admin",
    modules: 7,
    created: today,
    by: "Admin",
    status: "Active",
  },
  {
    id: "college-admin",
    name: "College Admin",
    modules: 4,
    created: today,
    by: "Admin",
    status: "Active",
  },
  {
    id: "college-faculty",
    name: "College Faculty",
    modules: 3,
    created: today,
    by: "Admin",
    status: "Active",
  },
  {
    id: "students",
    name: "Student's",
    modules: 4,
    created: today,
    by: "Admin",
    status: "Active",
  },
  {
    id: "author",
    name: "Author",
    modules: 3,
    created: today,
    by: "Admin",
    status: "Active",
  },
  {
    id: "tutor",
    name: "Tutor",
    modules: 3,
    created: today,
    by: "Admin",
    status: "Active",
  },
];

const MasterPipeline: React.FC = () => {
  const navigate = useNavigate();

  const [pipelineData, setPipelineData] = useState<PipelineItem[]>(() => {
    const saved = localStorage.getItem("pipelineData");
    return saved ? JSON.parse(saved) : defaultData;
  });

  const [showForm, setShowForm] = useState(false);
  const [newPipeline, setNewPipeline] = useState<{
    name: string;
    status: string;
  }>({
    name: "",
    status: "Active",
  });

  useEffect(() => {
    localStorage.setItem("pipelineData", JSON.stringify(pipelineData));
  }, [pipelineData]);

  const handleViewClick = (id: string) => {
    navigate(`/pipeline/${id}`);
  };

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewPipeline((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!newPipeline.name.trim()) return;

    const newEntry: PipelineItem = {
      id: newPipeline.name.toLowerCase().replace(/\s+/g, "-"),
      name: newPipeline.name,
      modules: 0,
      created: today,
      by: "Admin",
      status: newPipeline.status,
    };

    setPipelineData((prev) => [...prev, newEntry]);
    setNewPipeline({ name: "", status: "Active" });
    setShowForm(false);
  };

  return (
    <>
      <TopBar />
      <MainNav />
      <div className="d-flex">
        <MasterNav />
        <div className="master-pipeline-container p-3 w-100">
          <div className="col-12 field">
            <div className="d-flex justify-content-between align-items-center w-100">
              <h5 className="p-2 fw-bold mb-0 d-flex align-items-center">
                <FaChevronRight className="me-2" />
                Choose the Pipeline
              </h5>
              <button
                className="btn btn-primary mb-4"
                onClick={handleCreateClick}
              >
                Create New Pipeline
              </button>
            </div>
          </div>

          {showForm && (
            <div className="border p-3 rounded mb-4 shadow-sm bg-white">
              <h6 className="mb-3 fw-bold">Create Pipeline</h6>
              <div className="d-flex gap-3 align-items-center">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Pipeline Name"
                  value={newPipeline.name}
                  onChange={handleChange}
                  style={{ width: "300px", height: "45px" }}
                />
                <Form.Select
                  name="status"
                  value={newPipeline.status}
                  onChange={handleChange}
                  style={{ width: "200px", height: "45px" }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          )}

          <div className="table-responsive">
            <Table hover className="pipeline-table align-middle text-center">
              <thead className="table-header">
                <tr className="table-header-row">
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
                {pipelineData.map((item: PipelineItem, idx: number) => (
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
                      <Button
                        variant="link"
                        className="view-btn p-0"
                        onClick={() => handleViewClick(item.id)}
                      >
                        <span className="arrow-icon-circle">
                          <FaArrowRight size={10} />
                        </span>
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
