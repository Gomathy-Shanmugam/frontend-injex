import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
  onAddCategory: (label: string, points: number, descriptions: string[]) => void;
  existingPoints: number[];
  criteriaCount: number;
}

const NewCategoryModal: React.FC<Props> = ({ show, onHide, onAddCategory, existingPoints, criteriaCount }) => {
  const [label, setLabel] = useState("");
  const [points, setPoints] = useState<number>(0);
  const [descriptions, setDescriptions] = useState<string[]>(Array(criteriaCount).fill(""));
  const [error, setError] = useState<string | null>(null);

  const [predefined, setPredefined] = useState([
    { label: "Excellent", points: 11 },
    { label: "Good", points: 8 },
    { label: "Needs Improvement", points: 1 },
    { label: "Fair", points: 2 },
  ]);

  const criteriaLabels = ["Content Quality", "Creativity", "Presentation & Structure"];

  const handlePredefinedChange = (index: number, newValue: number) => {
    const updated = [...predefined];
    updated[index].points = newValue;
    setPredefined(updated);
  };

  const handleSubmit = () => {
    if (error) return;

    if (existingPoints.includes(points)) {
      setError("This point value is already used. Please choose a different value.");
      return;
    }

    onAddCategory(label, points, descriptions);
    setLabel("");
    setPoints(0);
    setDescriptions(Array(criteriaCount).fill(""));
    setError(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "16px" }}>New Category</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ fontSize: "14px" }}>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "16px" }}>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            style={{ fontSize: "14px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "16px" }}>Points</Form.Label>
          <Form.Select
            value={points}
            onChange={(e) => {
              const val = Number(e.target.value);
              setPoints(val);
              if (existingPoints.includes(val)) {
                setError("This point value is already used. Please choose a different value.");
              } else {
                setError(null);
              }
            }}
            style={{ fontSize: "14px" }}
          >
            <option value={0}>Select points</option>
            {[...Array(11)].map((_, i) => {
              const val = 11 - i;
              return (
                <option key={val} value={val} disabled={existingPoints.includes(val)}>
                  {val}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <div className="mb-3">
          <strong className="d-block mb-2" style={{ fontSize: "16px" }}>Pre-Defined Points</strong>
          <div className="row">
            {predefined.map((item, index) => (
              <div className="col-6 mb-3" key={item.label}>
                <Form.Label className="fw-semibold" style={{ fontSize: "14px" }}>{item.label}</Form.Label>
                <Form.Control
                  type="number"
                  value={item.points}
                  onChange={(e) => handlePredefinedChange(index, Number(e.target.value))}
                  style={{ fontSize: "14px" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <strong style={{ fontSize: "16px" }}>Descriptions for Criteria</strong>
          {descriptions.map((desc, idx) => (
            <Form.Group className="mb-2" key={idx}>
              <Form.Label style={{ fontSize: "14px" }}>
                {criteriaLabels[idx] || `Criteria ${idx + 1}`}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={desc}
                onChange={(e) => {
                  const updated = [...descriptions];
                  updated[idx] = e.target.value;
                  setDescriptions(updated);
                }}
                style={{ fontSize: "14px" }}
              />
            </Form.Group>
          ))}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="text-danger me-auto">{error}</div>
        <Button variant="secondary" onClick={onHide} style={{ fontSize: "14px" }}>
          Cancel
        </Button>
        <Button variant="warning" onClick={handleSubmit} style={{ fontSize: "14px" }}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewCategoryModal;