import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Topbar from "./Topbar";
import MainNav from "./MainNav";
import GradeNavbar from "./GradeNavbar";
import NewCategoryModal from "./NewCategoryModal";
import EditCriteriaModal from "./EditCriteriaModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import NewCriteriaModal from "./NewCriteriaModal";
import { Toast, ToastContainer } from "react-bootstrap";
import EditPointsModal from "./EditPointsModal";

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
  const [editPointsModalShow, setEditPointsModalShow] = useState(false);

  const handleAddCategory = (
    label: string,
    points: number,
    descriptions: string[]
  ) => {
    const existingPoints = new Set(
      criteriaList.flatMap((c) => c.levels.map((l) => l.points))
    );
    if (existingPoints.has(points)) {
      alert(
        "This point value is already used. Please choose a different value."
      );
      return;
    }

    const updated = criteriaList.map((c, index) => {
      const description = descriptions[index] || "";
      return {
        ...c,
        levels: [...c.levels, { label, points, description }],
      };
    });

    setCriteriaList([...updated]);
  };

  const uniquePoints = Array.from(
    new Set(criteriaList.flatMap((c) => c.levels.map((l) => l.points)))
  ).sort((a, b) => b - a);

  const handleEditCriteria = (id: number) => {
    const toEdit = criteriaList.find((c) => c.id === id);
    if (toEdit) {
      setSelectedCriteria(toEdit);
      setEditModalShow(true);
    }
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
                  onClick={() => setModalShow(true)}
                  style={{
                    fontSize: "14px",
                    marginLeft: "auto",
                  }}
                >
                  + New Category
                </Button>
              </div>
            </div>

            <div style={{ overflowX: "auto", maxWidth: "100%" }}>
              <div
                style={{
                  minWidth: `${uniquePoints.length * 220 + 160}px`,
                }}
              >
                <Table bordered hover style={{ fontSize: "14px" }}>
                  <thead className="table-light">
                    <tr>
                      <th style={{ fontSize: "16px" }}>Criteria</th>

                      {uniquePoints.map((pt) => {
                        const label =
                          criteriaList[0].levels.find((l) => l.points === pt)
                            ?.label || "";
                        return (
                          <th
                            key={pt}
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
                              {label}
                            </div>
                            <div>{pt} pts</div>
                          </th>
                        );
                      })}

                      <th
                        style={{
                          width: "100px",
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
                          style={{ fontSize: "14px" }}
                        >
                          {criterion.title}
                        </td>
                        {uniquePoints.map((pt) => {
                          const level = criterion.levels.find(
                            (l) => l.points === pt
                          );
                          return (
                            <td
                              key={pt}
                              style={{
                                minWidth: "200px",
                                maxWidth: "200px",
                                width: "200px",
                                whiteSpace: "normal",
                                fontSize: "14px",
                              }}
                            >
                              {level ? (
                                level.description
                              ) : (
                                <span className="text-muted">—</span>
                              )}
                            </td>
                          );
                        })}
                        <td
                          className="text-center"
                          style={{ width: "180px", whiteSpace: "normal" }}
                        >
                          <FaEdit
                            className="me-2 text-primary"
                            style={{ cursor: "pointer", fontSize: "16px" }}
                            onClick={() => handleEditCriteria(criterion.id)}
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
        show={modalShow}
        onHide={() => setModalShow(false)}
        onAddCategory={handleAddCategory}
        existingPoints={criteriaList.flatMap((c) =>
          c.levels.map((l) => l.points)
        )}
        criteriaCount={criteriaList.length}
      />
      <EditCriteriaModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        criteria={selectedCriteria}
        onUpdate={handleUpdateCriteria}
      />
      <DeleteConfirmModal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        onConfirm={confirmDelete}
        removeLinked={removeLinked}
        setRemoveLinked={setRemoveLinked}
        deletedCriteriaTitle={deletedCriteriaTitle} // ✅ Fix applied here
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
        uniquePoints={uniquePoints}
        setCriteriaList={setCriteriaList}
        criteriaList={criteriaList}
      />
    </>
  );
};

export default RubricEditor;
