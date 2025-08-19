import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import "./OptionView.css";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "../Common/ModalWrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface Option {
  id: number;
  value: string;
  enabled: boolean;
}

interface OptionViewProps {
  dropdownId: string;
  moduleId: string;
  pipelineId: string;
  onClose: () => void;
}

const OptionView: React.FC<OptionViewProps> = ({
  dropdownId,
  moduleId,
  pipelineId,
  onClose,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [editableId, setEditableId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);

        // API call (backend la /api/dropdown/:id route irukkanum)
        const res = await axios.get(`/api/dropdown/${dropdownId}`);

        const fetchedOptions = res.data.options.map(
          (opt: any, idx: number) => ({
            id: idx, // unique client-side id
            value: typeof opt === "string" ? opt : opt.value, // backend string case handle
            enabled: typeof opt === "string" ? true : opt.enabled ?? true, // default enabled
          })
        );

        setOptions(fetchedOptions);
      } catch (error) {
        console.error("Failed to fetch options", error);
        toast.error("Failed to load options.");
      } finally {
        setLoading(false);
      }
    };

    if (dropdownId) {
      fetchOptions();
    }
  }, [dropdownId]);

  const handleToggle = (id: number) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
      )
    );
  };

  const handleAddOption = () => {
    const newId = Date.now(); // Ensure unique ID
    setOptions([...options, { id: newId, value: "", enabled: true }]);
    setEditableId(newId); // Auto-edit new option
  };

  const handleInputChange = (id: number, value: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, value } : opt))
    );
  };

  // const handleDelete = (id: number) => {
  //   setOptions((prev) => prev.filter((opt) => opt.id !== id));
  //   if (editableId === id) setEditableId(null);
  // };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
  };

  const handleConfirmedDelete = async () => {
    if (deleteId !== null) {
      try {
        await axios.delete(`/api/dropdown/${dropdownId}/option/${deleteId}`);
        setOptions((prev) => prev.filter((_, idx) => idx !== deleteId)); // filter by index
        toast.success("Deleted successfully!");
      } catch (error) {
        console.error("Failed to delete option", error);
        toast.error("Failed to delete option.");
      } finally {
        setDeleteId(null);
        setShowDeleteConfirm(false);
      }
    }
  };

  const handleSave = async () => {
    try {
      await axios.patch(`/api/dropdown/${dropdownId}`, {
        options: options.map((opt) => opt.value), // ✅ only string
      });

      toast.success("Options updated successfully!");
      setEditableId(null);
      onClose();
    } catch (error) {
      console.error("Failed to save options", error);
      toast.error("Failed to save changes.");
    }
  };

  if (loading) {
    return (
      <div className="modal-blur-background">
        <div
          className="custom-option-modal d-flex justify-content-center align-items-center"
          style={{ height: "300px" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="modal-blur-background">
      <div className="custom-option-modal">
        <div className="modal-header">
          <span className="modal-title">
            Dropdown Options :{" "}
            <span className="course-category">Course Category</span>
          </span>
          <span className="add-option" onClick={handleAddOption}>
            + Add Option
          </span>
        </div>

        <div className="option-list">
          {options.map((option, index) => (
            <div className="option-item" key={option.id}>
              <span className="drag-icon">☰</span>

              <input
                type="text"
                className={`option-input ${
                  editableId === option.id ? "editing" : ""
                }`}
                value={option.value}
                disabled={editableId !== option.id}
                onChange={(e) => handleInputChange(option.id, e.target.value)}
              />

              <span
                className="edit-icon"
                onClick={() => setEditableId(option.id)}
              >
                <i
                  className="bi bi-pencil-square"
                  style={{ cursor: "pointer" }}
                ></i>
              </span>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={option.enabled}
                  onChange={() => handleToggle(option.id)}
                />
                <span className="slider round"></span>
              </label>

              <span
                className="delete-icon"
                onClick={() => {
                  setShowDeleteConfirm(true);
                  confirmDelete(index); // ✅ index now available
                }}
              >
                <i className="bi bi-trash" style={{ cursor: "pointer" }}></i>
              </span>
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <Button
            variant="outline-warning"
            onClick={onClose}
            className="btn-grey"
          >
            Cancel
          </Button>
          <Button className="btn-save" onClick={handleSave}>
            Save & Update
          </Button>
        </div>
      </div>

      {/* {showDeleteConfirm !== null && (
  <div className="delete-confirm-overlay">
    <div className="delete-confirm-box">
      <p className="mb-3">Are you sure you want to delete?</p>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmedDelete}>
          Delete
        </Button>
      </div>
    </div>
  </div>
)} */}

      <ModalWrapper
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <div className="px-1 py-4">
          <p className="mb-3">Are you sure you want to delete?</p>
          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmedDelete}>
              Delete
            </Button>
          </div>
        </div>
      </ModalWrapper>

      {/* {deleteSuccess && (
        <div className="delete-success-popup">Deleted successfully!</div>
      )} */}
    </div>
  );
};

export default OptionView;
