import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import "./ModuleView.css";
import MasterNav from "./MasterNav";
import { FaChevronRight } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

interface ModuleData {
  id: number;
  name: string;
  dropdowns: number;
  createdOn: string;
  createdBy: string;
  status: string;
}

const today = new Date().toLocaleDateString("en-GB");
// 🔁 Dummy module data (keyed by numeric ID string)
const dummyModules: Record<string, ModuleData[]> = {
  "1": [
    {
      id: 1,
      name: "College Admin Signup",
      dropdowns: 2,
      createdOn: today,
      createdBy: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Rubrics",
      dropdowns: 2,
      createdOn: today,
      createdBy: "Admin",
      status: "Active",
    },
  ],
  "2": [
    {
      id: 1,
      name: "Student Registration",
      dropdowns: 2,
      createdOn: today,
      createdBy: "Admin",
      status: "Active",
    },
  ],
};

// ✅ Map slug to actual numeric ID
const slugToIdMap: Record<string, string> = {
  "app-admin": "1",
  students: "2",
};

const ModuleView = () => {
  const { pipelineId } = useParams();
  const navigate = useNavigate();
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newModule, setNewModule] = useState({
    pipeline: "",
    name: "",
    status: "",
  });

  useEffect(() => {
    if (!pipelineId) return;

    const actualId = slugToIdMap[pipelineId] || pipelineId;

    const savedModules = localStorage.getItem(`modules-${actualId}`);
    if (savedModules) {
      setModules(JSON.parse(savedModules));
    } else {
      const moduleList = dummyModules[actualId];
      setModules(moduleList || []);
    }
  }, [pipelineId]);

  const handleViewClick = (moduleId: number) => {
    const actualId = slugToIdMap[pipelineId!] || pipelineId;
    navigate(`/pipeline/${actualId}/module/${moduleId}`);
  };

  const handleSaveModule = () => {
    const actualId = slugToIdMap[pipelineId!] || pipelineId;

    if (!newModule.pipeline || !newModule.name || !newModule.status) {
      alert("Please fill all fields");
      return;
    }

    const newId = modules.length + 1;

    const newEntry: ModuleData = {
      id: newId,
      name: newModule.name,
      dropdowns: 2,
      createdOn: today,
      createdBy: "Admin",
      status: newModule.status,
    };

    const updatedModules = [...modules, newEntry];
    setModules(updatedModules);

    // ✅ Store in localStorage just like pipelineData
    localStorage.setItem(`modules-${actualId}`, JSON.stringify(updatedModules));

    setShowForm(false);
    setNewModule({ pipeline: "", name: "", status: "" });
  };

  return (
    <>
      <TopBar />
      <MainNav />
      <div className="layout-wrapper d-flex flex-nowrap">
        <MasterNav />
        <div className="content-wrapper">
          <div className="p-2 w-100">
            {/* <h5 className="mb-5 fw-bold">
            <FaChevronRight className="me-3" />
            Choose the Module
          </h5> */}

            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="p-2 fw-bold mb-0 d-flex align-items-center">
                <FaChevronRight className="me-2" />
                Choose the Module
              </h5>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowForm(!showForm)}
                >
                  Create New Module
                </button>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  ← Back
                </Button>
              </div>
            </div>

            {showForm && (
              <div className="form-container mb-3">
                <div className="card shadow-sm p-3 border border-primary rounded">
                  <h6 className="fw-bold mb-3">Create Module</h6>
                  <div className="d-flex flex-wrap align-items-end gap-3">
                    <div>
                      <label className="form-label mb-1">Pipeline</label>
                      <select
                        className="form-control"
                        value={newModule.pipeline}
                        onChange={(e) =>
                          setNewModule({
                            ...newModule,
                            pipeline: e.target.value,
                          })
                        }
                      >
                        <option value="">Choose Pipeline</option>
                        <option value="1">App Admin</option>
                        <option value="2">Students</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label mb-1">Module Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newModule.name}
                        onChange={(e) =>
                          setNewModule({ ...newModule, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="form-label mb-1">Status</label>
                      <select
                        className="form-control"
                        value={newModule.status}
                        onChange={(e) =>
                          setNewModule({ ...newModule, status: e.target.value })
                        }
                      >
                        <option value="">Active/Inactive</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={handleSaveModule}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="table-responsive">
            <Table hover className="module-view">
              <thead className="text-white" style={{ backgroundColor: "blue" }}>
                <tr className="table-header-row">
                  <th>S.No</th>
                  <th>Module Name</th>
                  <th>Dropdowns</th>
                  <th>Created On</th>
                  <th>Created By</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {modules.length > 0 ? (
                  modules.map((mod, idx) => (
                    <tr key={mod.id}>
                      <td>{idx + 1}</td>
                      <td>{mod.name}</td>
                      <td>{mod.dropdowns}</td>
                      <td>{mod.createdOn}</td>
                      <td>{mod.createdBy}</td>
                      <td>
                        <span className="status-badge">{mod.status}</span>
                      </td>
                      <td>
                        <Button
                          variant="link"
                          className="view-btn p-0"
                          onClick={() => handleViewClick(mod.id)}
                        >
                          <span className="arrow-icon-circle">
                            <FaArrowRight size={10} />{" "}
                            {/* Adjust size as needed */}
                          </span>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">
                      No modules found for this pipeline.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleView;
