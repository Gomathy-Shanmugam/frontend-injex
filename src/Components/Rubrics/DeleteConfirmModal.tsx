import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";

interface DeleteConfirmModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  removeLinked: boolean;
  setRemoveLinked: (value: boolean) => void;
  deletedCriteriaTitle: string; // ✨ pass the title to show in toast
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  show,
  onHide,
  onConfirm,
  removeLinked,
  setRemoveLinked,
  deletedCriteriaTitle,
}) => {
  const [showToast, setShowToast] = useState(false);

  const handleConfirm = () => {
    setShowToast(true);    // show toast first
    onConfirm();           // trigger deletion logic
    onHide();              // hide modal afterward
  };

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop && !backdrop.classList.contains("blur")) {
          backdrop.classList.add("blur");
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [show]);

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
            >
              Yes, delete it
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <ToastContainer
        position="top-end"
        className="p-3"
        style={{
          zIndex: 1060,
          position: "fixed",
          top: "20px",
          right: "20px",
        }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
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
