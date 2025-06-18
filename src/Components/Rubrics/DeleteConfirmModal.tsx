import React from "react";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";

interface DeleteConfirmModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  removeLinked: boolean;
  setRemoveLinked: (value: boolean) => void;
  deletedCriteriaTitle: string;
  toastVisible: boolean;
  setToastVisible: (value: boolean) => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  show,
  onHide,
  onConfirm,
  removeLinked,
  setRemoveLinked,
  deletedCriteriaTitle,
  toastVisible,
  setToastVisible,
}) => {
  const handleConfirm = () => {
    onConfirm();
    setToastVisible(true); // Show toast
    onHide();              // Close modal

    // Hide toast after 2 seconds
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="text-center py-4">
          <h6 className="fw-semibold mb-3">
            Are you sure you want to Delete this Criteria?
          </h6>

          <Form.Check
            type="checkbox"
            checked={removeLinked}
            onChange={(e) => setRemoveLinked(e.target.checked)}
            label={
              <span style={{ color: "red", fontSize: "14px" }}>
                Selecting this option will remove all linked Category & Points permanently
              </span>
            }
            className="mb-4 d-flex justify-content-center"
          />

          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="outline-dark"
              onClick={onHide}
              style={{ minWidth: "120px" }}
            >
              No, Remain It
            </Button>
            <Button
              variant="warning"
              onClick={handleConfirm}
              style={{ minWidth: "120px", color: "#000" }}
              disabled={!removeLinked}
            >
              Yes, delete it
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* ✅ Show Toast & Blur when visible */}
      {toastVisible && <div className="custom-blur-overlay"></div>}

      <ToastContainer
        className="p-3"
        style={{
          zIndex: 1061,
          position: "fixed",
          top: "20px",
          right: "20px",
        }}
      >
        <Toast
          onClose={() => setToastVisible(false)}
          show={toastVisible}
          delay={2000}
          autohide
          bg="light"
        >
          <Toast.Body>
            <strong>Criteria deleted Successfully:</strong>{" "}
            <span style={{ color: "blue" }}>{deletedCriteriaTitle}</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default DeleteConfirmModal;
