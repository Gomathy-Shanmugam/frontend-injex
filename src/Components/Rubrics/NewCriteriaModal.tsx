import type { Criteria, Level } from './RubricEditor';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

interface NewCriteriaModalProps {
  show: boolean;
  onHide: () => void;
  onAddCriteria: (criteria: Omit<Criteria, 'id'>) => void; // Changed to omit id generation
  categoryLevels: { label: string; points: number }[];
}

const NewCriteriaModal: React.FC<NewCriteriaModalProps> = ({
  show,
  onHide,
  onAddCriteria,
  categoryLevels = [], // Added default value
}) => {
  const [title, setTitle] = useState('');
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});
  const [error, setError] = useState('');

  // Initialize form when modal opens
  useEffect(() => {
    if (show) {
      setTitle('');
      setDescriptions({});
      setError('');
      
      // Initialize descriptions with empty strings for all levels
      const initialDescriptions = categoryLevels.reduce((acc, { label }) => {
        acc[label] = '';
        return acc;
      }, {} as Record<string, string>);
      
      setDescriptions(initialDescriptions);
    }
  }, [show, categoryLevels]);

  const handleDescriptionChange = (label: string, value: string) => {
    setDescriptions((prev) => ({ ...prev, [label]: value }));
  };

  const handleSave = () => {
    // Validation
    if (!title.trim()) {
      setError('Criteria name is required');
      return;
    }

    const newCriteria: Omit<Criteria, 'id'> = {
      title: title.trim(),
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
        <Modal.Title style={{ fontSize: '16px', fontWeight: 'bold' }}>
          New Criteria
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ fontSize: '14px' }}>
        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: '14px' }}>Criteria Name</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError(''); // Clear error when typing
            }}
            placeholder="Enter criteria name"
            style={{ fontSize: '14px' }}
            isInvalid={!!error}
          />
        </Form.Group>

        <h6 style={{ fontSize: '16px', fontWeight: '600' }} className="mb-3">
          Descriptions for Rubrics
        </h6>

        {categoryLevels.length > 0 ? (
          categoryLevels.map(({ label }) => (
            <Form.Group className="mb-3" key={`${label}-desc`}>
              <Form.Label style={{ fontSize: '14px' }}>
                Description for {label}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={descriptions[label] || ''}
                onChange={(e) => handleDescriptionChange(label, e.target.value)}
                style={{ fontSize: '14px' }}
              />
            </Form.Group>
          ))
        ) : (
          <Alert variant="warning" style={{ fontSize: '14px' }}>
            No rubric categories available. Please add categories first.
          </Alert>
        )}

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="outline-secondary"
            onClick={onHide}
            style={{ fontSize: '14px' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={categoryLevels.length === 0}
            style={{
              backgroundColor: '#FFC107',
              borderColor: '#FFC107',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            Save Criteria
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewCriteriaModal;