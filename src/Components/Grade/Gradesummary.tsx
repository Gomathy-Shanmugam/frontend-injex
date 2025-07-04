import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

const GradeSummary: React.FC = () => {
  return (
    <Container className="py-4" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      
      {/* Header Banner */}
      <Row className="align-items-center mb-4 border-bottom pb-2" style={{ fontSize: "14px" }}>
        <Col xs={12} md={6} className="d-flex align-items-center">
          <div style={{
            borderLeft: "4px solid #fbc02d",
            paddingLeft: "10px",
            fontWeight: 600,
            fontSize: "16px"
          }}>
            Grades & Rubrics
          </div>
        </Col>
        <Col xs={12} md={6} className="text-md-end text-danger mt-2 mt-md-0" style={{ fontSize: "13px" }}>
          These pages are only for summary purposes. Grading and rubrics will be determined based on the Injex grading method.
        </Col>
      </Row>

      {/* Grading Method and Points */}
      <Row className="mb-4">
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <h6 style={{ fontSize: "16px", fontWeight: "600" }}>Grading Method</h6>
          <p style={{ fontSize: "14px", marginBottom: "0" }}>Points</p>
        </Col>
        <Col xs={12} md={6}>
          <h6 style={{ fontSize: "16px", fontWeight: "600" }}>Total Course Points</h6>
          <p style={{ fontSize: "14px", marginBottom: "0" }}>
            100% Auto-calculated based on Lessons, assignments, quizzes
          </p>
        </Col>
      </Row>

      {/* Grade Distribution */}
      <Row className="mb-2">
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <h6 style={{ fontSize: "16px", fontWeight: "600" }}>Grade Distribution</h6>
          <p style={{ fontSize: "14px", marginBottom: "0" }}>Minimum Passing Grade</p>
          <p style={{ fontSize: "14px", fontWeight: "bold" }}>80%</p>
        </Col>
        <Col xs={12} md={6}>
          <p style={{ fontSize: "14px", marginTop: "32px", marginBottom: "0" }}>
            Late Submission Penalty
          </p>
          <p style={{ fontSize: "14px", fontWeight: "bold" }}>10%</p>
        </Col>
      </Row>

      {/* Grade Distribution Table */}
      <div className="table-responsive mb-5">
        <Table bordered style={{ fontSize: "14px" }}>
          <thead style={{ backgroundColor: "#f1f1f1" }}>
            <tr>
              <th>Category</th>
              <th>Weight (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Module, Chapters, Lessons</td>
              <td>50%</td>
            </tr>
            <tr>
              <td>
                Quiz, Assignment, Simulation,
                <br className="d-md-none" />
                Group Discussion, Case Studies, Mock Sections
              </td>
              <td>30%</td>
            </tr>
            <tr>
              <td>Simulation</td>
              <td>5%</td>
            </tr>
            <tr>
              <td>Internship</td>
              <td>15%</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Grading Scale Table */}
      <h6 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Grading Scale</h6>
      <div className="table-responsive">
        <Table bordered style={{ fontSize: "14px" }}>
          <thead style={{ backgroundColor: "#f1f1f1" }}>
            <tr>
              <th>Letter Grade</th>
              <th>Percentage Range</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>A+</td><td>95 to 100 %</td></tr>
            <tr><td>A</td><td>90 to 94 %</td></tr>
            <tr><td>B+</td><td>85 to 89 %</td></tr>
            <tr><td>B</td><td>75 to 84 %</td></tr>
            <tr><td>C</td><td>65 to 74 %</td></tr>
            <tr><td>R</td><td>50 to 64 %</td></tr>
            <tr><td>F</td><td>Below 50%</td></tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default GradeSummary;
