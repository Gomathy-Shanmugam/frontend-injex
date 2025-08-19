import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import "./ModuleView.css";
import MasterNav from "./MasterNav";
import { FaChevronRight, FaEdit } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

interface ModuleData {
  _id: string;
  name: string;
  dropdowns: number;
  createdon: string;
  createdBy?: string;
  updatedAt?: string;
  status: string;
  noOfdropdown: number;
}

// ✅ Map slug to actual numeric ID
// const slugToIdMap: Record<string, string> = {
//   "app-admin": "1",
//   students: "2",
// };

const ModuleView = () => {
  const { pipelineId } = useParams();
  const navigate = useNavigate();
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [pipelineData, setPipelineData] = useState<
    { _id: string; name: string; noOfdropdown: string }[]
  >([]);

  const [newModule, setNewModule] = useState({
    pipeline: "",
    name: "",
    status: "Active",
    noOfdropdown: 0,
  });

  useEffect(() => {
    const fetchAllModules = async () => {
      try {
        const res = await axios.get(`/api/module/pipeline/${pipelineId}`);
        const modulesWithDropdowns = await Promise.all(
          res.data.map(async (mod: ModuleData) => {
            const dropdownRes = await axios.get(
              `/api/dropdown/module/${mod._id}`
            );
            return {
              ...mod,
              noOfdropdown: dropdownRes.data.length,
            };
          })
        );
        setModules(modulesWithDropdowns);
      } catch (err) {
        console.error("Error fetching modules or dropdowns:", err);
      }
    };

    fetchAllModules();
  }, [pipelineId]);

  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        const res = await axios.get("/api/pipeline");
        setPipelineData(
          res.data.map((p: any) => ({
            ...p,
            _id: p._id.toString(),
          }))
        );
      } catch (err) {
        console.error("Error fetching pipelines:", err);
      }
    };
    fetchPipelines();
  }, []);

  const handleViewClick = (moduleId: string) => {
    navigate(`/pipeline/${pipelineId}/module/${moduleId}`);
  };

  const handleEditClick = (module: ModuleData) => {
    setEditRowId(module._id.toString());
    setEditedName(module.name);
  };

  const handleSaveEdit = async (id: string | number) => {
    try {
      await axios.patch(`/api/module/${id}`, { name: editedName });
      setModules((prev) =>
        prev.map((m) => (m._id === id ? { ...m, name: editedName } : m))
      );
      setEditRowId(null);
      setEditedName("");
    } catch (err) {
      console.error("Error updating module:", err);
      alert("Failed to update module name");
    }
  };

  const handleSaveModule = async () => {
    if (!newModule.pipeline || !newModule.name || !newModule.status) {
      alert("Please fill all fields"); // validation-ku leave panirunga
      return;
    }

    try {
      // Send POST request to backend
      const res = await axios.post(`/api/module/${newModule.pipeline}`, {
        name: newModule.name,
        status: newModule.status,
        dropdowns: newModule.noOfdropdown,
        createdBy: "Admin",
      });

      // Add the newly created module to local state
      setModules((prev) => [...prev, res.data]);

      // Reset form & close it
      setShowForm(false);
      setNewModule({
        pipeline: "",
        name: "",
        status: "Active",
        noOfdropdown: 0,
      });

      // ✅ Removed success alert
    } catch (err) {
      console.error("Error creating module:", err);
      alert("Failed to create module"); // error-ku keep pannunga
    }
  };

  return (
    <>
      <TopBar />
      <MainNav />
      <div className="layout-wrapper d-flex flex-nowrap">
        <MasterNav />
        <div className="content-wrapper">
          <div className="p-2 w-100">
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
              <div className="border p-3 rounded mb-4 shadow-sm bg-white">
                <h6 className="mb-3 fw-bold">Create Module</h6>
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  {/* Pipeline Dropdown */}
                  <Form.Select
                    value={newModule.pipeline}
                    onChange={(e) =>
                      setNewModule({ ...newModule, pipeline: e.target.value })
                    }
                    style={{ width: "250px", height: "45px" }}
                  >
                    <option value="">Choose Pipeline</option>
                    {pipelineData.map((p) => (
                      <option key={p._id} value={p._id.toString()}>
                        {p.name}
                      </option>
                    ))}
                  </Form.Select>

                  {/* Module Name Input */}
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Module Name"
                    value={newModule.name}
                    onChange={(e) =>
                      setNewModule({ ...newModule, name: e.target.value })
                    }
                    style={{ width: "300px", height: "45px" }}
                  />

                  {/* Status Dropdown */}
                  <Form.Select
                    name="status"
                    value={newModule.status}
                    onChange={(e) =>
                      setNewModule({ ...newModule, status: e.target.value })
                    }
                    style={{ width: "200px", height: "45px" }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>

                  {/* Save Button */}
                  <Button variant="primary" onClick={handleSaveModule}>
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="table-responsive">
            <Table hover className="module-view align-middle text-center">
              <thead className="text-white" style={{ backgroundColor: "blue" }}>
                <tr className="table-header-row">
                  <th>S.No</th>
                  <th>Module Name</th>
                  <th>Dropdowns</th>
                  <th>Created On</th>
                  <th>Created By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {modules.length > 0 &&
                  modules.map((mod, idx) => (
                    <tr key={mod._id}>
                      <td>{idx + 1}</td>
                      <td style={{ textAlign: "left", paddingLeft: "10px" }}>
                        {editRowId === mod._id ? (
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "200px" }}
                            value={editedName ?? ""}
                            onChange={(e) => setEditedName(e.target.value)}
                          />
                        ) : (
                          mod.name
                        )}
                      </td>
                      <td>{mod.noOfdropdown}</td>
                      <td>
                        {mod.createdon
                          ? new Date(mod.createdon).toLocaleDateString("en-GB")
                          : "-"}
                      </td>
                      <td>{mod.createdBy || "Admin"}</td>
                      <td>
                        <span className="status-badge">
                          {mod.status.charAt(0).toUpperCase() +
                            mod.status.slice(1)}
                        </span>
                      </td>
                      <td
                        className="gap-2"
                        style={{ textAlign: "left", paddingLeft: "10px" }}
                      >
                        {editRowId === mod._id ? (
                          <Button
                            variant="link"
                            className="p-0"
                            onClick={() => handleSaveEdit(mod._id)}
                          >
                            ✅
                          </Button>
                        ) : (
                          <Button
                            variant="link"
                            className="p-0"
                            onClick={() => handleEditClick(mod)}
                          >
                            <FaEdit size={16} />
                          </Button>
                        )}
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={() => handleViewClick(mod._id)}
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

export default ModuleView;
