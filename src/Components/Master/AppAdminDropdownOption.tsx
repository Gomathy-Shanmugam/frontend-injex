import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import "./AppAdminDropdownOption.css";

interface Option {
  id: number;
  name: string;
  enabled: boolean;
}

interface AppAdminDropdownOptionProps {
  showModal: boolean;
  onClose: () => void;
  dropdownName: string;
}

const initialOptions = [
  { id: 1, name: "Fashion FundamentalsApparel", enabled: true },
  { id: 2, name: "Construction Costume Design & Styling", enabled: true },
  { id: 3, name: "Fashion Illustration & CAD Surface", enabled: true },
  { id: 4, name: "Ornamentation Fashion Business", enabled: false },
];

const AppAdminDropdownOption: React.FC<AppAdminDropdownOptionProps> = ({
  showModal,
  onClose,
  dropdownName,
}) => {
  const [options, setOptions] = useState<Option[]>(initialOptions);

  const handleToggle = (id: number) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
      )
    );
  };

  const handleChange = (id: number, value: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, name: value } : opt))
    );
  };

  const handleAddOption = () => {
    setOptions([...options, { id: Date.now(), name: "", enabled: true }]);
  };

  const handleDelete = (id: number) => {
    setOptions(options.filter((opt) => opt.id !== id));
  };

  const handleSave = () => {
    console.log("Saved:", options);
    onClose();
  };

  return (
    <Modal
      show={showModal}
      centered
      dialogClassName="custom-modal"
      onHide={onClose}
    >
      <Modal.Body className="rounded shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong>
            Dropdown Options :{" "}
            <span className="text-primary">{dropdownName}</span>
          </strong>
          <Button variant="link" onClick={handleAddOption}>
            + Add Option
          </Button>
        </div>

        {options.map((option) => (
          <div
            key={option.id}
            className="d-flex align-items-center justify-content-between mb-2 bg-white p-2 rounded border"
          >
            <div className="d-flex align-items-center flex-grow-1">
              <div
                className="me-2"
                style={{ cursor: "grab", fontSize: "20px", color: "#ccc" }}
              >
                ☰
              </div>
              <Form.Control
                type="text"
                value={option.name}
                onChange={(e) => handleChange(option.id, e.target.value)}
                className="me-3"
              />
            </div>

            <div className="d-flex align-items-center">
              <FaEdit
                className="me-3 text-secondary"
                style={{ cursor: "pointer" }}
              />
              <span
                onClick={() => handleToggle(option.id)}
                style={{ cursor: "pointer" }}
                className="me-3"
              >
                {option.enabled ? (
                  <FaToggleOn size={20} color="green" />
                ) : (
                  <FaToggleOff size={20} color="gray" />
                )}
              </span>
              <FaTrash
                className="text-danger"
                onClick={() => handleDelete(option.id)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-end mt-4">
          <Button
            variant="outline-secondary"
            className="me-3 px-4 py-2 rounded btn-cancel"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="px-4 py-2 rounded btn-save" onClick={handleSave}>
            Save & Update
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AppAdminDropdownOption;
