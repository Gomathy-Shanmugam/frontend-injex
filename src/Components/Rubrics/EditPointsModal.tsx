import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
// Be sure to import the CSS

interface EditPointsModalProps {
  show: boolean;
  onHide: () => void;
  predefinedPoints: { label: string; points: number }[];
  onSave: (updatedPoints: { label: string; points: number }[]) => void;
}

const EditPointsModal: React.FC<EditPointsModalProps> = ({
  show,
  onHide,
  predefinedPoints,
  onSave,
}) => {
  const [pointsMap, setPointsMap] = useState<{ [label: string]: number }>({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const map: { [label: string]: number } = {};
    predefinedPoints.forEach(({ label, points }) => {
      map[label] = points;
    });
    setPointsMap(map);
  }, [predefinedPoints]);

  const handleUpdate = () => {
    const updated = Object.entries(pointsMap).map(([label, points]) => ({
      label,
      points,
    }));
    onSave(updated);
    onHide();

    // Show toast with blur effect
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleChange = (label: string, value: number) => {
    setPointsMap((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <>
      <div className={`modal-blur ${show ? 'active' : ''}`}>
        <Modal
          show={show}
          onHide={onHide}
          centered
          contentClassName="custom-modal"
          backdropClassName="custom-backdrop"
        >
          <div className="position-relative p-3">
            <button
              className="position-absolute top-0 end-0 border-0 bg-transparent fs-4"
              style={{ padding: '8px', cursor: 'pointer' }}
              onClick={onHide}
            >
              <IoClose />
            </button>

            <h5 className="fw-bold mb-4" style={{ fontSize: '16px' }}>
              Pre-Defined Points
            </h5>

            <div className="points-grid">
              {Object.entries(pointsMap).map(([label, points]) => (
                <div className="point-field" key={label}>
                  <Form.Label className="fw-semibold" style={{ fontSize: '14px' }}>
                    {label}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={points}
                    onChange={(e) => handleChange(label, Number(e.target.value))}
                    className="custom-input-box"
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <Button
                onClick={handleUpdate}
                className="px-5"
                style={{
                  backgroundColor: '#ffcc00',
                  color: '#000',
                  border: 'none',
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </Modal>
      </div>

      {/* Toast + Blur Overlay */}
      {showToast && (
        <>
          <div className="toast-blur-overlay"></div>
          <div className="custom-toast top-right">
            Successfully Updated Criteria Points...
          </div>
        </>
      )}
    </>
  );
};

export default EditPointsModal;
