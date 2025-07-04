import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface PointItem {
  label: string;
  points: number;
}

interface EditPointsModalProps {
  show: boolean;
  onHide: () => void;
  predefinedPoints: PointItem[];
  onSave: (updatedPoints: PointItem[]) => void;
}

const EditPointsModal: React.FC<EditPointsModalProps> = ({
  show,
  onHide,
  predefinedPoints,
  onSave,
}) => {
  const [points, setPoints] = useState<PointItem[]>([]);

  // Reset points when modal opens
  useEffect(() => {
    if (show) {
      console.log("Modal received points:", predefinedPoints);
      setPoints([...predefinedPoints]);
    }
  }, [show, predefinedPoints]);

  const handleChange = (index: number, value: number) => {
    const newPoints = [...points];
    newPoints[index].points = value;
    setPoints(newPoints);
  };

  const handleSave = () => {
    onSave(points);
    onHide();
  };

  return (
    <>
    {show && <div className="custom-blur-overlay"></div>}
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Update Points</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {points.map((point, index) => (
          <Form.Group key={`${point.label}-${index}`} className="mb-3">
            <Form.Label>{point.label}</Form.Label>
            <Form.Control
              type="number"
              value={point.points}
              onChange={(e) => handleChange(index, Number(e.target.value))}
              className="custom-input-box"
            />
          </Form.Group>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default EditPointsModal;