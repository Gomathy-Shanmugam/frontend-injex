import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import type { Criteria, Level } from "./RubricEditor";

interface Props {
  show: boolean;
  onHide: () => void;
  criteria: Criteria | null;
  onUpdate: (updated: Criteria) => void;
}

const EditCriteriaModal: React.FC<Props> = ({
  show,
  onHide,
  criteria,
  onUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(() => {
    if (criteria) {
      setTitle(criteria.title);
      setLevels([...criteria.levels]);
    }
  }, [criteria]);

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedLevels = [...levels];
    updatedLevels[index].description = value;
    setLevels(updatedLevels);
  };

  const handleSubmit = () => {
    if (criteria) {
      const updated: Criteria = {
        ...criteria,
        title,
        levels,
      };
      onUpdate(updated);
      onHide();
    }
  };

  return (
    <>
      {show && <div className="custom-blur-overlay"></div>}
      <Modal
        show={show}
        onHide={onHide}
        centered
        size="lg"
        contentClassName="rounded-4 shadow-sm"
        backdropClassName="custom-modal-backdrop" // ✅ Key part
        backdrop={true}
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold" style={{ fontSize: "16px" }}>
            Edit Criteria
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ fontSize: "14px" }}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold" style={{ fontSize: "16px" }}>
              Criteria Name
            </Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-3"
              style={{ fontSize: "14px" }}
            />
          </Form.Group>

          <h6 className="fw-bold mb-3" style={{ fontSize: "16px" }}>
            Descriptions for Rubrics
          </h6>

          <Row>
            {levels.map((level, index) => (
              <Col md={6} className="mb-4" key={index}>
                <Form.Group>
                  <Form.Label
                    className="fw-semibold"
                    style={{ fontSize: "14px" }}
                  >
                    Description for {level.label}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={level.description}
                    onChange={(e) =>
                      handleDescriptionChange(index, e.target.value)
                    }
                    className="border border-primary-subtle rounded-3 shadow-sm"
                    style={{ fontSize: "14px" }}
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-3">
            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#ffc107",
                borderColor: "#ffc107",
                color: "black",
                padding: "8px 32px",
                fontWeight: "bold",
                borderRadius: "10px",
                minWidth: "160px",
                fontSize: "14px",
              }}
            >
              Update
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditCriteriaModal;
