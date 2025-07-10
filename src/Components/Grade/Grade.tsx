import React, { useState } from "react";
import { Row, Col, Form, Table, Button, Alert } from "react-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import GradeNavbar from "./GradeNavbar";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import { useDispatch } from "react-redux";
import {
  setCategories as setCategoriesAction,
  setGradingScales as setGradingScalesAction,
} from "../Store/GradeSlice";

type Category = {
  name: string;
  weight: number;
};
type GradeScale = {
  letter: string;
  min: number;
  max: number;
};

const Grade: React.FC = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState<Category[]>([
    { name: "Module,Chapters,Lessons", weight: 50 },
    {
      name: "Quiz,Assignment,Simulation,Group Discussion,Case Studies,Mock Sections",
      weight: 30,
    },
    { name: "Simulation", weight: 5 },
    { name: "Internship", weight: 15 },
  ]);

  const now = new Date();
  const formattedDate = now.toLocaleString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState<Category>({
    name: "",
    weight: 0,
  });
  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    weight: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleAddCategory = () => {
    const total =
      categories.reduce((sum, cat) => sum + cat.weight, 0) + newCategory.weight;

    if (!newCategory.name || newCategory.weight <= 0) {
      setError("Please enter a valid name and weight.");
      return;
    }

    if (total > 100) {
      setError("Total weight cannot exceed 100%.");
      return;
    }

    // setCategories([...categories, newCategory]);

    const updated = [...categories, newCategory];
    setCategories(updated);
    dispatch(setCategoriesAction(updated)); // ✅ use the correct alias

    setNewCategory({ name: "", weight: 0 });
    setError(null);
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setEditCategory(categories[idx]);
    setError(null);
  };

  const handleSave = () => {
    if (!editCategory.name || editCategory.weight <= 0) {
      setError("Please enter a valid name and weight.");
      return;
    }

    const newTotal =
      categories.reduce(
        (sum, cat, idx) => (idx === editIndex ? sum : sum + cat.weight),
        0
      ) + editCategory.weight;

    if (newTotal > 100) {
      setError("Total weight cannot exceed 100%.");
      return;
    }

    const updated = categories.map((cat, idx) =>
      idx === editIndex ? editCategory : cat
    );

    setCategories(updated);
    dispatch(setCategoriesAction(updated));

    setEditIndex(null);
    setEditCategory({ name: "", weight: 0 });
    setError(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditCategory({ name: "", weight: 0 });
    setError(null);
  };

  const handleDelete = (idx: number) => {
    const filtered = categories.filter((_, i) => i !== idx);
    setCategories(filtered);
    dispatch(setCategoriesAction(filtered));

    setError(null);
  };

  const [gradingScales, setGradingScales] = useState<GradeScale[]>([
    { letter: "A+", min: 95, max: 100 },
    { letter: "A", min: 90, max: 94 },
    { letter: "B+", min: 85, max: 89 },
    { letter: "B", min: 75, max: 84 },
    { letter: "C", min: 65, max: 74 },
    { letter: "D", min: 50, max: 64 },
    { letter: "F", min: 0, max: 49 },
  ]);

  const [editingGradeIndex, setEditingGradeIndex] = useState<number | null>(
    null
  );
  const [editGrade, setEditGrade] = useState<GradeScale>({
    letter: "",
    min: 0,
    max: 0,
  });
  const [newGradeVisible, setNewGradeVisible] = useState(false);
  const [newGrade, setNewGrade] = useState<GradeScale>({
    letter: "",
    min: 0,
    max: 0,
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <TopBar />
      <MainNav />
      <div className="d-flex">
        <div
          style={{
            width: "250px",
            minHeight: "100vh",
            backgroundColor: "#d3d3d3",
          }}
        >
          <GradeNavbar />
        </div>

        <div className="grade-wrapper" style={{ flex: 1, padding: "30px" }}>
          <Row className="mb-4 align-items-center">
            <Col>
              <h5 className="fw-bold border-start ps-2 border-warning border-4">
                Injex Grading
              </h5>
            </Col>
            <Col className="text-end text-muted" style={{ fontSize: "12px" }}>
              ⏺ Last Updated: {formattedDate}
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Grading Method</Form.Label>
                <Form.Select>
                  <option>Select</option>
                  <option>Percentage</option>
                  <option>Letter Grade</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Label>Total Course Points</Form.Label>
              <p className="border rounded p-2 bg-light">
                <strong>100%</strong> Auto-calculated based on Lessons,
                assignments, quizzes
              </p>
            </Col>
          </Row>

          {/* Grade Distribution (Minimum Passing Grade & Late Submission Penalty) */}
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold">Grade Distribution</Form.Label>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Minimum Passing Grade</Form.Label>
                <Form.Control type="text" placeholder="Type here" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Late Submission Penalty</Form.Label>
                <Form.Control type="text" placeholder="Type here" />
              </Form.Group>
            </Col>
          </Row>

          {error && <Alert variant="danger">{error}</Alert>}

          <Table bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Category</th>
                <th>Weight (%)</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={idx}>
                  <td>
                    {editIndex === idx ? (
                      <Form.Control
                        type="text"
                        value={editCategory.name}
                        onChange={(e) =>
                          setEditCategory({
                            ...editCategory,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      cat.name
                    )}
                  </td>
                  <td>
                    {editIndex === idx ? (
                      <Form.Control
                        type="number"
                        value={editCategory.weight}
                        onChange={(e) =>
                          setEditCategory({
                            ...editCategory,
                            weight: parseFloat(e.target.value),
                          })
                        }
                      />
                    ) : (
                      `(
                      ${cat.weight} %
                    )`
                    )}
                  </td>
                  <td>
                    {editIndex === idx ? (
                      <>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-success"
                          onClick={handleSave}
                        >
                          <FaCheck />
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-danger"
                          onClick={handleCancel}
                        >
                          <FaTimes />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleEdit(idx)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-danger"
                          onClick={() => handleDelete(idx)}
                        >
                          <FaTrash />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row className="mb-3">
            <Col xs={12} md={5}>
              <Form.Group>
                <Form.Label>New Category Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group>
                <Form.Label>Weight (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={newCategory.weight}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      weight: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2} className="d-flex align-items-end">
              <Button variant="outline-secondary" onClick={handleAddCategory}>
                + Add Category
              </Button>
            </Col>
          </Row>

          <hr className="mt-4" />
          <h6 className="fw-bold">Grading Scale</h6>
          <Table bordered hover responsive className="mt-3">
            <thead className="table-light">
              <tr>
                <th>Letter Grade</th>
                <th>Percentage Range</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gradingScales.map((grade, idx) => (
                <tr key={idx}>
                  <td>
                    {editingGradeIndex === idx ? (
                      <Form.Control
                        type="text"
                        value={editGrade.letter}
                        onChange={(e) =>
                          setEditGrade({ ...editGrade, letter: e.target.value })
                        }
                      />
                    ) : (
                      grade.letter
                    )}
                  </td>
                  {/* <td>
                    {editingGradeIndex === idx ? (
                      <Form.Control
                        type="text"
                        value={editGrade.range}
                        onChange={(e) =>
                          setEditGrade({ ...editGrade, range: e.target.value })
                        }
                      />
                    ) : (
                      grade.range
                    )}
                  </td> */}

                  <td>
                    {editingGradeIndex === idx ? (
                      <div className="d-flex gap-2">
                        <Form.Control
                          type="number"
                          value={editGrade.min}
                          onChange={(e) =>
                            setEditGrade({
                              ...editGrade,
                              min: parseInt(e.target.value),
                            })
                          }
                          placeholder="Min"
                        />
                        <Form.Control
                          type="number"
                          value={editGrade.max}
                          onChange={(e) =>
                            setEditGrade({
                              ...editGrade,
                              max: parseInt(e.target.value),
                            })
                          }
                          placeholder="Max"
                        />
                      </div>
                    ) : (
                      `(
                      ${grade.min} – ${grade.max} %
                    )`
                    )}
                  </td>

                  <td>
                    {editingGradeIndex === idx ? (
                      <>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-success"
                          onClick={() => {
                            const updated = gradingScales.map((g, i) =>
                              i === idx ? editGrade : g
                            );
                            setGradingScales(updated);
                            dispatch(setGradingScalesAction(updated));

                            setEditingGradeIndex(null);
                            setEditGrade({ letter: "", min: 0, max: 0 });
                          }}
                        >
                          <FaCheck />
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-danger"
                          onClick={() => setEditingGradeIndex(null)}
                        >
                          <FaTimes />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => {
                            setEditingGradeIndex(idx);
                            setEditGrade(grade);
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-danger"
                          onClick={() => {
                            const updated = gradingScales.filter(
                              (_, i) => i !== idx
                            );
                            setGradingScales(updated);
                            dispatch(setGradingScalesAction(updated));
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {newGradeVisible && (
                <tr>
                  <td>
                    <Form.Control
                      type="text"
                      value={newGrade.letter}
                      onChange={(e) =>
                        setNewGrade({ ...newGrade, letter: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="number"
                        placeholder="Min"
                        value={newGrade.min}
                        onChange={(e) =>
                          setNewGrade({
                            ...newGrade,
                            min: parseInt(e.target.value),
                          })
                        }
                      />
                      <Form.Control
                        type="number"
                        placeholder="Max"
                        value={newGrade.max}
                        onChange={(e) =>
                          setNewGrade({
                            ...newGrade,
                            max: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </td>

                  <td>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-success"
                      onClick={() => {
                        if (!newGrade.letter || newGrade.min > newGrade.max) {
                          alert(
                            "Please enter a valid letter grade and ensure min is less than or equal to max."
                          );
                          return;
                        }

                        const updated = [...gradingScales, newGrade];
                        setGradingScales(updated);
                        dispatch(setGradingScalesAction(updated));

                        setNewGrade({ letter: "", min: 0, max: 0 });
                        setNewGradeVisible(false);
                      }}
                    >
                      <FaCheck />
                    </Button>

                    <Button
                      variant="link"
                      size="sm"
                      className="text-danger"
                      onClick={() => setNewGradeVisible(false)}
                    >
                      <FaTimes />
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <Button
            variant="outline-secondary"
            className="mt-2"
            onClick={() => setNewGradeVisible(true)}
          >
            + Add New Grade
          </Button>
          <Button
            variant="secondary"
            className="mt-2 ms-3"
            onClick={() => {
              dispatch(setCategoriesAction(categories));
              dispatch(setGradingScalesAction(gradingScales));
              alert("✅ All grading data updated successfully!");
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Grade;
