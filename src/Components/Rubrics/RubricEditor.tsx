import React, { useState } from "react";
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
  levels: {
    label: string;
    points: number;
    description: string;
  }[];
};

const initialCriteria: Criteria[] = [
  {
    id: 1,
    title: "Content Quality",
    levels: [
      {
        label: "Excellent",
        points: 11,
        description:
          "Content is highly relevant, well-researched, and aligns perfectly with the assignment prompt.",
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
  const [criteriaToDeleteId, setCriteriaToDeleteId] = useState<number | null>(
    null
  );
  const [deletedCriteriaTitle, setDeletedCriteriaTitle] = useState("");
  const [removeLinked, setRemoveLinked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState<Criteria | null>(
    null
  );
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const handleShowNewCategory = () => setShowNewCategoryModal(true);
  const handleHideNewCategory = () => setShowNewCategoryModal(false);

  const [editPointsModalShow, setEditPointsModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [toastVisibleAfterDelete, setToastVisibleAfterDelete] = useState(false);



  const [predefinedPoints, setPredefinedPoints] = useState([
    { label: "Excellent", points: 11 },
    { label: "Good", points: 8 },
    { label: "Needs Improvement", points: 1 },
  ]);
  const usedPoints = predefinedPoints.map((p) => p.points);

  const handleAddCategory = (
    newLabel: string,
    newPoint: number,
    descriptions: string[]
  ) => {
    // 1. Add new point to predefinedPoints
    setPredefinedPoints((prev) => [
      ...prev,
      { label: newLabel, points: newPoint },
    ]);

    // 2. Add level to each criteria
    setCriteriaList((prevList) =>
      prevList.map((criterion, idx) => {
        const alreadyExists = criterion.levels.some(
          (level) => level.label === newLabel && level.points === newPoint
        );
        if (alreadyExists) return criterion;

        return {
          ...criterion,
          levels: [
            ...criterion.levels,
            {
              label: newLabel,
              points: newPoint,
              description: descriptions[idx] || "",
            },
          ],
        };
      })
    );
  };

  const handleSaveEditedPoints = (
    updatedPoints: { label: string; points: number }[]
  ) => {
    setPredefinedPoints(updatedPoints);

    // Update points inside criteriaList
    setCriteriaList((prevList) =>
      prevList.map((criterion) => ({
        ...criterion,
        levels: criterion.levels.map((level) => {
          const updated = updatedPoints.find((p) => p.label === level.label);
          return updated ? { ...level, points: updated.points } : level;
        }),
      }))
    );
  };

  const handleEditPredefinedPoint = (
    oldLabel: string,
    newLabel: string,
    newPoints: number
  ) => {
    // 1. Update predefined points
    setPredefinedPoints((prev) =>
      prev.map((p) =>
        p.label === oldLabel ? { label: newLabel, points: newPoints } : p
      )
    );

    // 2. Update criteriaList
    setCriteriaList((prevList) =>
      prevList.map((criterion) => {
        const updatedLevels = criterion.levels.map((level) => {
          if (level.label === oldLabel) {
            return {
              ...level,
              label: newLabel,
              points: newPoints,
            };
          }
          return level;
        });

        const alreadyHasNewCombo = updatedLevels.some(
          (l) => l.label === newLabel && l.points === newPoints
        );

        // OPTIONAL: fallback description (can be blank or reuse from old)
        const fallbackDesc =
          criterion.levels.find((l) => l.label === oldLabel)?.description || "";

        return {
          ...criterion,
          levels: alreadyHasNewCombo
            ? updatedLevels
            : [
                ...updatedLevels,
                {
                  label: newLabel,
                  points: newPoints,
                  description: fallbackDesc, // or ""
                },
              ],
        };
      })
    );
  };

  const handleUpdateCriteria = (updated: Criteria) => {
    const updatedList = criteriaList.map((c) =>
      c.id === updated.id ? updated : c
    );
    setCriteriaList(updatedList);
  };

  const handleDeleteCriteria = (id: number) => {
    const toDelete = criteriaList.find((c) => c.id === id);
    if (toDelete) {
      setDeletedCriteriaTitle(toDelete.title); // ✅ set title here
      setCriteriaToDeleteId(id);
      setDeleteModalShow(true); // ✅ only show modal after setting title
    }
  };

  const confirmDelete = () => {
    if (criteriaToDeleteId !== null) {
      setCriteriaList((prev) =>
        prev.filter((c) => c.id !== criteriaToDeleteId)
      );
      setShowToast(true);
      setDeleteModalShow(false);
      setCriteriaToDeleteId(null);
      setRemoveLinked(false);
    }
  };

  const handleAddNewCriteria = (newCriteria: Criteria) => {
    console.log("New criteria before adding:", newCriteria);
    setCriteriaList((prev) => [...prev, newCriteria]);
    setCriteriaModalShow(false);
  };

  const uniquePoints = Array.from(
    new Set(predefinedPoints.map((p) => p.points))
  ).sort((a, b) => b - a);

  const resolvedColumns = uniquePoints.map((pt) => {
    const match = predefinedPoints.find((p) => p.points === pt);
    return {
      points: pt,
      label: match?.label || `Custom (${pt})`,
    };
  });

  function handleHide(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Topbar />
      <MainNav />
      <div
        className="d-flex justify-content-end pe-4 pt-2 text-secondary"
        style={{ fontSize: "14px" }}
      >
        <span className="me-2">
          <span style={{ color: "#fa6400", fontSize: "1rem" }}>🕒</span>{" "}
          <strong>Last Updated:</strong>{" "}
          {new Date().toLocaleTimeString("en-GB")} |{" "}
          {new Date().toLocaleDateString("en-US")}
        </span>
      </div>

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <div
          style={{
            width: "280px",
            backgroundColor: "#F7F9FA",
            borderRight: "1px solid #ddd",
          }}
        >
          <GradeNavbar />
        </div>

        <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f5f6fa" }}>
          <div className="container shadow p-4 rounded bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0" style={{ fontSize: "16px" }}>
                Rubric Criteria Table
              </h6>
              <div
                style={{ position: "sticky", right: 0, top: 0, zIndex: 999 }}
              >
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={handleShowNewCategory}
                  style={{
                    fontSize: "14px",
                    marginLeft: "auto",
                  }}
                >
                  + New Category
                </Button>
              </div>
            </div>

            <div
              style={{
                overflowX: "auto",
                width: "100%",
                paddingRight: "180px",
              }}
            >
              <div
                style={{
                  minWidth: `${resolvedColumns.length * 200 + 360}px`,

                  // Force table wider
                }}
              >
                <Table
                  bordered
                  hover
                  style={{ fontSize: "14px", marginBottom: 0 }}
                >
                  {/* <thead className="table-light">
                    <tr>
                      <th style={{ fontSize: "16px" }}>Criteria</th>

                      {resolvedColumns.map((point) => (
                        <th
                          key={point.points}
                          className="text-center"
                          style={{
                            minWidth: "200px",
                            maxWidth: "200px",
                            width: "200px",
                            whiteSpace: "normal",
                            fontSize: "14px",
                          }}
                        >
                          <div
                            className="fw-bold d-flex justify-content-center align-items-center gap-2"
                            style={{ fontSize: "16px" }}
                          >
                            {point.label}
                          </div>
                          <div>{point.points} pts</div>
                        </th>
                      ))}

                      <th
  style={{
    minWidth: "160px",
    maxWidth: "160px",
    width: "160px",
    textAlign: "center",
    fontSize: "14px",
     // optional, for subtle effect
  }}
>

                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <span className="fw-bold">Actions</span>
                          <FaEdit
                            style={{
                              cursor: "pointer",
                              fontSize: "16px",
                              color: "#0d6efd",
                            }}
                            onClick={() => setEditPointsModalShow(true)}
                            title="Edit Predefined Points"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead> */}
                  <thead className="table-light">
                    <tr>
                      {/* First Column: Criteria Title */}
                      <th style={{ fontSize: "16px" }}>Criteria</th>

                      {/* Dynamic Columns for Each Predefined Point */}
                      {resolvedColumns.map((point) => (
                        <th
                          key={point.points}
                          className="text-center"
                          style={{
                            minWidth: "200px",
                            maxWidth: "200px",
                            width: "200px",
                            whiteSpace: "normal",
                            fontSize: "14px",
                          }}
                        >
                          <div
                            className="fw-bold d-flex justify-content-center align-items-center gap-2"
                            style={{ fontSize: "16px" }}
                          >
                            {point.label}
                          </div>
                          <div>{point.points} pts</div>
                        </th>
                      ))}

                      {/* Final Column: Actions with Edit Icon */}
                      <th
                        style={{
                          minWidth: "160px",
                          maxWidth: "160px",
                          width: "160px",
                          textAlign: "center",
                          fontSize: "14px",
                        }}
                      >
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <span className="fw-bold">Actions</span>
                          <FaEdit
                            style={{
                              cursor: "pointer",
                              fontSize: "16px",
                              color: "#0d6efd",
                            }}
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
                        <td
                          className="fw-semibold"
                          style={{
                            fontSize: "14px",
                            minWidth: "160px",
                            maxWidth: "160px",
                            width: "160px",
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          {criterion.title}
                        </td>

                        {resolvedColumns.map((pt) => {
                          //                           const level = criterion.levels.find(
                          //   (l) => l.points === pt.points && l.label === pt.label
                          // );
                          const level = criterion.levels.find(
                            (l) => l.label === pt.label
                          );

                          return (
                            <td
                              key={pt.points}
                              style={{
                                minWidth: "200px",
                                maxWidth: "200px",
                                width: "200px",
                                whiteSpace: "normal",
                                fontSize: "14px",
                                verticalAlign: "top", // helps visually align content
                              }}
                            >
                              {level?.description ? (
                                level.description
                              ) : (
                                <span className="text-muted">—</span>
                              )}
                            </td>
                          );
                        })}

                        <td
                          className="text-center"
                          style={{
                            width: "160px",
                            minWidth: "160px",
                            maxWidth: "160px",
                          }}
                        >
                          <FaEdit
                            className="me-2 text-primary"
                            style={{ cursor: "pointer", fontSize: "16px" }}
                            onClick={() => {
                              setSelectedCriteria(criterion); // set the current criterion
                              setEditModalShow(true); // then open the modal
                            }}

                            // onClick={() => setEditPointsModalShow(true)}
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
        show={showNewCategoryModal}
        onHide={handleHideNewCategory}
        onAddCategory={handleAddCategory}
        existingPoints={usedPoints}
        criteriaCount={criteriaList.length}
        predefinedPoints={[
          { label: "Excellent", points: 11 },
          { label: "Good", points: 8 },
          { label: "Need Improvement", points: 1 },
        ]}
        setPredefinedPoints={setPredefinedPoints}
      />

{editModalShow && <div className="custom-blur-overlay"></div>}
      <EditCriteriaModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        criteria={selectedCriteria}
        onUpdate={handleUpdateCriteria}
      />

    
{(deleteModalShow || toastVisibleAfterDelete) && <div className="custom-blur-overlay"></div>}
      <DeleteConfirmModal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        onConfirm={confirmDelete}
        removeLinked={removeLinked}
        setRemoveLinked={setRemoveLinked}
        deletedCriteriaTitle={deletedCriteriaTitle} 
        toastVisible={toastVisibleAfterDelete} // ✅ Pass this
  setToastVisible={setToastVisibleAfterDelete}// ✅ Fix applied here
      />

      <NewCriteriaModal
        show={criteriaModalShow}
        onHide={() => setCriteriaModalShow(false)}
        onAddCriteria={handleAddNewCriteria}
        categoryLevels={
          criteriaList[0]?.levels.map((l) => ({
            label: l.label,
            points: l.points,
          })) || []
        }
      />

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="danger"
        >
          <Toast.Body className="text-white">
            Deleted "{deletedCriteriaTitle}" successfully.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <EditPointsModal
        show={editPointsModalShow}
        onHide={() => setEditPointsModalShow(false)}
        predefinedPoints={predefinedPoints}
        onSave={handleSaveEditedPoints}
      />
    </>
  );
};

export default RubricEditor;
