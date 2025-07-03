import type { Criteria, Level } from './RubricEditor';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface NewCriteriaModalProps {
  show: boolean;
  onHide: () => void;
  onAddCriteria: (criteria: Criteria) => void;
  categoryLevels: { label: string; points: number }[]; // Accept dynamic categories
}

const NewCriteriaModal: React.FC<NewCriteriaModalProps> = ({
  show,
  onHide,
  onAddCriteria,
  categoryLevels,
}) => {
  const [title, setTitle] = useState('');
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});

  useEffect(() => {
    if (show) {
      setTitle('');
      setDescriptions({});
    }
  }, [show]);

  const handleDescriptionChange = (label: string, value: string) => {
    setDescriptions((prev) => ({ ...prev, [label]: value }));
  };

  const handleSave = () => {
    const newCriteria: Criteria = {
      id: Date.now(),
      title,
      levels: categoryLevels.map(({ label, points }) => ({
        label,
        points,
        description: descriptions[label] || '',
      })),
    };

    onAddCriteria(newCriteria);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '16px', fontWeight: 'bold' }}>New Criteria</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ fontSize: '14px' }}>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: '14px' }}>Criteria Name</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter criteria name"
            style={{ fontSize: '14px' }}
          />
        </Form.Group>

        <h6 style={{ fontSize: '16px', fontWeight: '600' }} className="mb-3">Descriptions for Rubrics</h6>

        {categoryLevels.map(({ label }) => (
          <Form.Group className="mb-3" key={label}>
            <Form.Label style={{ fontSize: '14px' }}>Description for {label}</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={descriptions[label] || ''}
              onChange={(e) => handleDescriptionChange(label, e.target.value)}
              style={{ fontSize: '14px' }}
            />
          </Form.Group>
        ))}

        <div className="text-center">
          <Button
            onClick={handleSave}
            style={{
              backgroundColor: '#FFC107',
              borderColor: '#FFC107',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewCriteriaModal;
