import type { Criteria } from './RubricEditor';
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
    <>
      {show && <div className="custom-blur-overlay"></div>}

      <Modal
        show={show}
        onHide={onHide}
        centered
        backdrop="static"
        dialogClassName="responsive-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            New Criteria
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ fontSize: '14px', padding: '1rem' }}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: '14px' }}>Criteria Name</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter criteria name"
              style={{
                fontSize: '14px',
                padding: '8px',
              }}
            />
          </Form.Group>

          <h6
            style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '1rem',
            }}
          >
            Descriptions for Rubrics
          </h6>

          {categoryLevels.map(({ label, points }) => (
            <Form.Group className="mb-3" key={`${label}-${points}`}>
              <Form.Label style={{ fontSize: '14px' }}>
                Description for {label} ({points} pts)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={descriptions[label] || ''}
                onChange={(e) => handleDescriptionChange(label, e.target.value)}
                style={{
                  fontSize: '14px',
                  padding: '8px',
                  resize: 'vertical',
                }}
              />
            </Form.Group>
          ))}

          <div className="text-center mt-4">
            <Button
              onClick={handleSave}
              style={{
                backgroundColor: '#FFC107',
                borderColor: '#FFC107',
                padding: '8px 32px',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              Save
            </Button>
          </div>
        </Modal.Body>
      </Modal>

     
    </>
  );
};

export default NewCriteriaModal;
