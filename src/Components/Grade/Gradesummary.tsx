import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/Store";
import { Container, Row, Col, Table, Nav } from "react-bootstrap";
import { resetGradeState } from "../Store/GradeSlice";

const GradeSummary: React.FC = () => {
  const categories = useSelector((state: RootState) => state.grade.categories);
  const gradingScales = useSelector((state: RootState) => state.grade.gradingScales);

  return (
    <Container className="py-4" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <Row className="align-items-center mb-3 border-bottom pb-2" style={{ fontSize: "14px" }}>
        <Col xs={12} md={6}>
          <div style={{ borderLeft: "4px solid #fbc02d", paddingLeft: "10px", fontWeight: 600, fontSize: "16px" }}>
            Grades & Rubrics
          </div>
        </Col>
        <Col xs={12} md={6} className="text-md-end text-danger" style={{ fontSize: "13px" }}>
          These pages are only for summary purposes. Grading and rubrics will be determined based on the Injex grading method.
        </Col>
      </Row>

      {/* Nav Tabs */}
      {/* <Nav variant="tabs" defaultActiveKey="injex" className="mb-4">
        <Nav.Item>
          <Nav.Link eventKey="injex" active>Injex Grading</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="rubrics" disabled>Rubrics</Nav.Link>
        </Nav.Item>
      </Nav> */}

      {/* Grading Method + Total Points + Extra Details */}
      <Row className="mb-4">
        <Col md={4}>
          <h6 style={{ fontWeight: 600 }}>Grading Method</h6>
          <p>Points</p>
        </Col>
        <Col md={5}>
          <h6 style={{ fontWeight: 600 }}>Total Course Points</h6>
          <p>100% Auto-calculated based on Lessons, assignments, quizzes</p>
        </Col>
        <Col md={3}>
          <h6 style={{ fontWeight: 600 }}>Late Submission Penalty</h6>
          <p>10%</p>
          <div><strong>Minimum Passing Grade:</strong> 80%</div>
        </Col>
      </Row>

      {/* Grade Distribution */}
      <h6 className="fw-bold mb-2">Grade Distribution</h6>
      <Table bordered>
        <thead className="table-light text-center">
          <tr>
            <th>Category</th>
            <th>Weight (%)</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, idx) => (
            <tr
              key={idx}
              className="text-center"
              style={{
                border: idx === 1 ? "2px solid #007bff" : undefined,
                borderRadius: idx === 1 ? "6px" : undefined,
              }}
            >
              <td>{cat.name}</td>
              <td>{cat.weight} %</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Grading Scale */}
      <h6 className="fw-bold mt-4 mb-2">Grading Scale</h6>
      <Table bordered>
        <thead className="table-light text-center">
          <tr>
            <th>Letter Grade</th>
            <th>Percentage Range</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {gradingScales.map((scale, idx) => (
            <tr key={idx}>
              <td>{scale.letter}</td>
              <td>{scale.min} – {scale.max} %</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GradeSummary;