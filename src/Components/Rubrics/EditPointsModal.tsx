import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

interface EditPointsModalProps {
  show: boolean;
  onHide: () => void;
  uniquePoints: number[];
  setCriteriaList: (updated: any[]) => void;
  criteriaList: any[];
}

const EditPointsModal: React.FC<EditPointsModalProps> = ({
  show,
  onHide,
  uniquePoints,
  setCriteriaList,
  criteriaList,
}) => {
  const [pointsMap, setPointsMap] = useState<{ [label: string]: number }>({});

  useEffect(() => {
    const map: { [label: string]: number } = {};
    criteriaList[0]?.levels.forEach((level: { label: string | number; points: number; }) => {
      map[level.label] = level.points;
    });
    setPointsMap(map);
  }, [criteriaList]);

  const handleUpdate = () => {
    const updated = criteriaList.map((criteria) => ({
      ...criteria,
      levels: criteria.levels.map((level: { label: string | number; points: any; }) => ({
        ...level,
        points: pointsMap[level.label] ?? level.points,
      })),
    }));
    setCriteriaList(updated);
    onHide();
  };

  const handleChange = (label: string, value: number) => {
    setPointsMap((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <h5 className="fw-bold mb-4">Pre-Defined Points</h5>
        <Row>
          {Object.entries(pointsMap).map(([label, points]) => (
            <Col md={6} key={label} className="mb-3">
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type="number"
                value={points}
                onChange={(e) => handleChange(label, Number(e.target.value))}
              />
            </Col>
          ))}
        </Row>
        <div className="text-center">
          <Button
            onClick={handleUpdate}
            className="px-5"
            style={{ backgroundColor: '#ffcc00', color: '#000', border: 'none' }}
          >
            Update
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditPointsModal;
