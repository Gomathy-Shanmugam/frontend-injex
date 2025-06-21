import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Topbar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import GradeNavbar from "../Grade/GradeNavbar";
import NewCategoryModal from "./NewCategoryModal";
import EditCriteriaModal from "./EditCriteriaModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import NewCriteriaModal from "./NewCriteriaModal";
import { Toast, ToastContainer } from "react-bootstrap";
import EditPointsModal from "./EditPointsModal";

type PredefinedPoint = {
  label: string;
  points: number;
};

export type Level = {
  label: string;
  points: number;
  description: string;
};

export type Criteria = {
  id: number;
  title: string;
  levels: Level[];
};

const initialCriteria: Criteria[] = [
  {
    id: 1,
    title: "Content Quality",
    levels: [
      {
        label: "Excellent",
        points: 11,
        description: "Content is highly relevant, well-researched, and aligns perfectly with the assignment prompt.",
      },
      {
        label: "Good",
        points: 8,
        description: "Content is mostly relevant with minor gaps.",
      },
      {
        label: "Needs Improvement",
        points: 1,
        description: "Content is off-topic or lacks substantial research.",
      },
    ],
  },
  {
    id: 2,
    title: "Creativity",
    levels: [
      {
        label: "Excellent",
        points: 11,
        description: "Extremely creative and original ideas that stand out.",
      },
      {
        label: "Good",
        points: 8,
        description: "Some creative elements, but mostly common ideas.",
      },
      {
        label: "Needs Improvement",
        points: 1,
        description: "Content is off-topic or lacks substantial research.",
      },
    ],
  },
  {
    id: 3,
    title: "Presentation & Structure",
    levels: [
      {
        label: "Excellent",
        points: 11,
        description: "Well-organized and professionally structured.",
      },
      {
        label: "Good",
        points: 8,
        description: "Organized but with some layout issues.",
      },
      {
        label: "Needs Improvement",
        points: 1,
        description: "Disorganized and difficult to follow.",
      },
    ],
  },
];

const RubricEditor: React.FC = () => {
  const [criteriaList, setCriteriaList] = useState<Criteria[]>(initialCriteria);
  const [modalShow, setModalShow] = useState(false);
  const [criteriaModalShow, setCriteriaModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [criteriaToDeleteId, setCriteriaToDeleteId] = useState<number | null>(null);
  const [deletedCriteriaTitle, setDeletedCriteriaTitle] = useState("");
  const [removeLinked, setRemoveLinked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState<Criteria | null>(null);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [editPointsModalShow, setEditPointsModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [toastVisibleAfterDelete, setToastVisibleAfterDelete] = useState(false);
  const [reopenAfterPointsUpdate, setReopenAfterPointsUpdate] = useState(false);
  const [predefinedPoints, setPredefinedPoints] = useState<PredefinedPoint[]>([
    { label: "Excellent", points: 11 },
    { label: "Good", points: 8 },
    { label: "Needs Improvement", points: 1 },
  ]);

  const syncCriteriaWithPredefinedPoints = (newPoints: PredefinedPoint[]) => {
    setCriteriaList(prevList =>
      prevList.map(criterion => ({
        ...criterion,
        levels: newPoints.map(point => {
          const existingLevel = criterion.levels.find(l => l.label === point.label);
          return existingLevel 
            ? { ...existingLevel, points: point.points }
            : { label: point.label, points: point.points, description: "" };
        })
      }))
    );
  };

  const handleAddCategory = (
    newLabel: string,
    newPoint: number,
    descriptions: string[]
  ) => {
    const newPredefinedPoint = { label: newLabel, points: newPoint };
    const updatedPoints = [...predefinedPoints, newPredefinedPoint];
    
    setPredefinedPoints(updatedPoints);
    console.log("NEW CATEGORY ADDED:", updatedPoints);

    setCriteriaList(prevList =>
      prevList.map((criterion, idx) => ({
        ...criterion,
        levels: [
          ...criterion.levels,
          {
            label: newLabel,
            points: newPoint,
            description: descriptions[idx] || "",
          },
        ],
      }))
    );
  };

  const handleSaveEditedPoints = (updatedPoints: PredefinedPoint[]) => {
    setPredefinedPoints(updatedPoints);
    syncCriteriaWithPredefinedPoints(updatedPoints);
  };

  const handleEditPredefinedPoint = (
    oldLabel: string,
    newLabel: string,
    newPoints: number
  ) => {
    const updatedPoints = predefinedPoints.map((p) =>
      p.label === oldLabel ? { label: newLabel, points: newPoints } : p
    );
    
    setPredefinedPoints(updatedPoints);
    syncCriteriaWithPredefinedPoints(updatedPoints);
  };

  const handleUpdateCriteria = (updated: Criteria) => {
    setCriteriaList(criteriaList.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleDeleteCriteria = (id: number) => {
    const toDelete = criteriaList.find((c) => c.id === id);
    if (toDelete) {
      setDeletedCriteriaTitle(toDelete.title);
      setCriteriaToDeleteId(id);
      setDeleteModalShow(true);
    }
  };

  const confirmDelete = () => {
    if (criteriaToDeleteId !== null) {
      setCriteriaList((prev) => prev.filter((c) => c.id !== criteriaToDeleteId));
      setShowToast(true);
      setDeleteModalShow(false);
      setCriteriaToDeleteId(null);
    }
  };

  const handleAddNewCriteria = (newCriteria: Omit<Criteria, 'id'>) => {
    const levels = predefinedPoints.map(point => {
      const existingLevel = newCriteria.levels?.find(l => l.label === point.label);
      return existingLevel || {
        label: point.label,
        points: point.points,
        description: ""
      };
    });
    
    const newId = criteriaList.length > 0 
      ? Math.max(...criteriaList.map(c => c.id)) + 1 
      : 1;
    
    setCriteriaList((prev) => [...prev, { 
      ...newCriteria, 
      id: newId,
      levels 
    }]);
    setCriteriaModalShow(false);
  };

  const resolvedColumns = useMemo(() => {
    return [...predefinedPoints].sort((a, b) => b.points - a.points);
  }, [predefinedPoints]);

  return (
    <>
      <Topbar />
      <MainNav />
      <div className="d-flex justify-content-end pe-4 pt-2 text-secondary" style={{ fontSize: "14px" }}>
        <span className="me-2">
          <span style={{ color: "#fa6400", fontSize: "1rem" }}>🕒</span>{" "}
          <strong>Last Updated:</strong>{" "}
          {new Date().toLocaleTimeString("en-GB")} |{" "}
          {new Date().toLocaleDateString("en-US")}
        </span>
      </div>

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <div style={{ width: "280px", backgroundColor: "#F7F9FA", borderRight: "1px solid #ddd" }}>
          <GradeNavbar />
        </div>

        <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f5f6fa" }}>
          <div className="container shadow p-4 rounded bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0" style={{ fontSize: "16px" }}>
                Rubric Criteria Table
              </h6>
              <div style={{ position: "sticky", right: 0, top: 0, zIndex: 999 }}>
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={() => setShowNewCategoryModal(true)}
                  style={{ fontSize: "14px", marginLeft: "auto" }}
                >
                  + New Category
                </Button>
              </div>
            </div>

            <div style={{ overflowX: "auto", width: "100%", paddingRight: "180px" }}>
              <div style={{ minWidth: `${resolvedColumns.length * 200 + 360}px` }}>
                <Table bordered hover style={{ fontSize: "14px", marginBottom: 0 }}>
                  <thead className="table-light">
                    <tr>
                      <th style={{ fontSize: "16px" }}>Criteria</th>
                      {resolvedColumns.map((point) => (
                        <th
                          key={`header-${point.label}-${point.points}`}
                          className="text-center"
                          style={{ minWidth: "200px", maxWidth: "200px", width: "200px" }}
                        >
                          <div className="fw-bold d-flex justify-content-center align-items-center gap-2" style={{ fontSize: "16px" }}>
                            {point.label}
                          </div>
                          <div>{point.points} pts</div>
                        </th>
                      ))}
                      <th style={{ minWidth: "160px", maxWidth: "160px", width: "160px", textAlign: "center" }}>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <span className="fw-bold">Actions</span>
                          <FaEdit
                            style={{ cursor: "pointer", fontSize: "16px", color: "#0d6efd" }}
                            onClick={() => setEditPointsModalShow(true)}
                            title="Edit Predefined Points"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {criteriaList.map((criterion) => (
                      <tr key={criterion.id}>
                        <td className="fw-semibold" style={{ fontSize: "14px", minWidth: "160px" }}>
                          {criterion.title}
                        </td>
                        {resolvedColumns.map((pt) => {
                          const level = criterion.levels.find((l) => l.label === pt.label);
                          return (
                            <td
                              key={`cell-${criterion.id}-${pt.label}-${pt.points}`}
                              style={{ minWidth: "200px", maxWidth: "200px", fontSize: "14px" }}
                            >
                              {level?.description || <span className="text-muted">—</span>}
                            </td>
                          );
                        })}
                        <td className="text-center" style={{ width: "160px" }}>
                          <FaEdit
                            className="me-2 text-primary"
                            style={{ cursor: "pointer", fontSize: "16px" }}
                            onClick={() => {
                              setSelectedCriteria(criterion);
                              setEditModalShow(true);
                            }}
                          />
                          <FaTrash
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "16px" }}
                            onClick={() => handleDeleteCriteria(criterion.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setCriteriaModalShow(true)}
              style={{ fontSize: "14px" }}
            >
              + Add Criteria
            </Button>
          </div>
        </div>
      </div>

      <NewCategoryModal
        key={`category-modal-${showNewCategoryModal}-${predefinedPoints.length}`}
        show={showNewCategoryModal}
        onHide={() => setShowNewCategoryModal(false)}
        onAddCategory={handleAddCategory}
        criteriaCount={criteriaList.length}
        predefinedPoints={predefinedPoints}
        setPredefinedPoints={setPredefinedPoints}
        existingPoints={predefinedPoints.map((p) => p.points)}
      />

      <EditCriteriaModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        criteria={selectedCriteria}
        onUpdate={handleUpdateCriteria}
        predefinedPoints={predefinedPoints}
      />

      <DeleteConfirmModal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        onConfirm={confirmDelete}
        removeLinked={removeLinked}
        setRemoveLinked={setRemoveLinked}
        deletedCriteriaTitle={deletedCriteriaTitle}
        toastVisible={toastVisibleAfterDelete}
        setToastVisible={setToastVisibleAfterDelete}
      />

      <NewCriteriaModal
        show={criteriaModalShow}
        onHide={() => setCriteriaModalShow(false)}
        onAddCriteria={handleAddNewCriteria}
        predefinedPoints={predefinedPoints}
      />

      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="danger">
          <Toast.Body className="text-white">
            Deleted "{deletedCriteriaTitle}" successfully.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <EditPointsModal
        key={`edit-modal-${predefinedPoints.length}-${Date.now()}`}
        show={editPointsModalShow}
        onHide={() => setEditPointsModalShow(false)}
        predefinedPoints={predefinedPoints}
        onSave={handleSaveEditedPoints}
      />
    </>
  );
};

export default RubricEditor;