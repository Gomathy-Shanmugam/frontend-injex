import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaArrowRight, FaEdit } from "react-icons/fa";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import MasterNav from "./MasterNav";
import "./MaterPipeline.css";

// import axios from "axios";
import axios, { AxiosError } from "axios";

// PipelineItem interface defined outside to reuse
interface CreatePipelineItem {
  _id: string;
  name: string;
  status: string;
  createdby?: string;
  createdon: string;
  updatedAt?: string;
  noOfMod: number;
}

const MasterPipeline: React.FC = () => {
  const navigate = useNavigate();

  const [pipelineData, setPipelineData] = useState<CreatePipelineItem[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [newPipeline, setNewPipeline] = useState<{
    noOfMod: number;
    name: string;
    status: string;
  }>({
    name: "",
    status: "Active",
    noOfMod: 0,
  });
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedStatus, setEditedStatus] = useState<string>("Active");

  // Fetch pipelines from backend
  const fetchPipelines = async () => {
    try {
      const res = await axios.get(`/api/pipeline/`);
      setPipelineData(res.data);
    } catch (error) {
      console.error("Error fetching pipelines:", error);
    }
  };

  useEffect(() => {
    fetchPipelines();
  }, []);

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

  const handleSave = async () => {
    if (!newPipeline.name.trim()) return;

    try {
      const res = await axios.post(`/api/pipeline`, {
        name: newPipeline.name,
        status: newPipeline.status,
      });

      setPipelineData((prev) => [...prev, res.data]); // append the newly created pipeline
      setNewPipeline({ name: "", status: "Active", noOfMod: 0 });
      setShowForm(false);
    } catch (error) {
      console.error("Error creating pipeline:", error);
    }
  };

  const handleEditClick = (item: CreatePipelineItem) => {
    setEditRowId(item._id);
    setEditedName(item.name);
    setEditedStatus(item.status);
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const res = await axios.patch(`/api/pipeline/${id}`, {
        name: editedName,
        status: editedStatus,
      });
      setPipelineData((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
      setEditRowId(null);
    } catch (error) {
      console.error("Error updating pipeline:", error);
    }
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pipelineData.map((item: CreatePipelineItem, idx: number) => (
                  <tr key={item._id}>
                    <td>{idx + 1}</td>

                    {/* Editable Pipeline Name */}
                    <td>
                      {editRowId === item._id ? (
                        <Form.Control
                          type="text"
                          value={editedName ?? ""}
                          onChange={(e) => setEditedName(e.target.value)}
                          style={{ width: "200px" }}
                        />
                      ) : (
                        item.name
                      )}
                    </td>

                    {/* Non-editable Modules */}
                    <td>{item.noOfMod}</td>

                    <td>
                      {item.createdon
                        ? new Date(item.createdon).toLocaleDateString("en-GB") // show updated date if available
                        : "-"}
                    </td>

                    <td>{item.createdby || "Admin"}</td>
                    <td>
                      <span className="status-badge">{item.status}</span>
                    </td>

                    {/* Actions (View, Edit, Save) */}
                    <td className="d-flex justify-content-center gap-2">
                      {/* View Button */}

                      {/* Edit / Save Button */}
                      {editRowId === item._id ? (
                        <Button
                          variant="link"
                          className="view-btn p-0"
                          onClick={() => handleSaveEdit(item._id)}
                        >
                          ✅
                        </Button>
                      ) : (
                        <Button
                          variant="link"
                          className=" p-0"
                          onClick={() => handleEditClick(item)}
                        >
                          <FaEdit size={16} />
                        </Button>
                      )}

                      <Button
                        variant="link"
                        className="view-btn p-0"
                        onClick={() => handleViewClick(item._id)}
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
