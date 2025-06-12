import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import visual from "../../assets/file14252.png";
import fashion from "../../assets/fashion-designing.png";
import retail from "../../assets/7a8a5124-75b8-4b46-bebf-e70e8ad411b6.jpg";
import fashionproductmanagement from "../../assets/photo-1470309864661-68328b2cd0a5 (1).jpeg";

const allCourses = {
  masters: [
    {
      title: "FASHION MERCHANDISING",
      author: "Sampath Kasirajan",
      lessons: 22,
      students: 3,
      image: fashion,
    },
    {
      title: "FASHION PRODUCT MANAGEMENT",
      author: "Sampath Kasirajan",
      lessons: 12,
      students: 3,
      image: fashionproductmanagement,
    },
    {
      title: "VISUAL MERCHANDISING",
      author: "Sampath Kasirajan",
      lessons: 17,
      students: 3,
      image: visual,
    },
    {
      title: "RETAIL MANAGEMENT",
      author: "Sampath Kasirajan",
      lessons: 48,
      students: 3,
      image: retail,
    },
  ],
  graduate: [
    {
      title: "FASHION PRODUCT MANAGEMENT",
      author: "Sampath Kasirajan",
      lessons: 12,
      students: 3,
      image: fashionproductmanagement,
    },
    {
      title: "RETAIL MANAGEMENT",
      author: "Sampath Kasirajan",
      lessons: 48,
      students: 3,
      image: retail,
    },
    {
      title: "FASHION MERCHANDISING",
      author: "Sampath Kasirajan",
      lessons: 22,
      students: 3,
      image: fashion,
    },
    {
      title: "VISUAL MERCHANDISING",
      author: "Sampath Kasirajan",
      lessons: 17,
      students: 3,
      image: visual,
    },
  ],
  diploma: [
    {
      title: "RETAIL MANAGEMENT",
      author: "Sampath Kasirajan",
      lessons: 48,
      students: 3,
      image: retail,
    },
    {
      title: "VISUAL MERCHANDISING",
      author: "Sampath Kasirajan",
      lessons: 17,
      students: 3,
      image: visual,
    },
    {
      title: "FASHION PRODUCT MANAGEMENT",
      author: "Sampath Kasirajan",
      lessons: 12,
      students: 3,
      image: fashionproductmanagement,
    },
    {
      title: "FASHION MERCHANDISING",
      author: "Sampath Kasirajan",
      lessons: 22,
      students: 3,
      image: fashion,
    },
  ],
  specialist: [
    {
      title: "VISUAL MERCHANDISING",
      author: "Sampath Kasirajan",
      lessons: 17,
      students: 3,
      image: visual,
    },
    {
      title: "FASHION PRODUCT MANAGEMENT",
      author: "Sampath Kasirajan",
      lessons: 12,
      students: 3,
      image: fashionproductmanagement,
    },
    {
      title: "FASHION MERCHANDISING",
      author: "Sampath Kasirajan",
      lessons: 22,
      students: 3,
      image: fashion,
    },
    {
      title: "RETAIL MANAGEMENT",
      author: "Sampath Kasirajan",
      lessons: 48,
      students: 3,
      image: retail,
    },
  ],
  micro: [
    {
      title: "FASHION MERCHANDISING",
      author: "Sampath Kasirajan",
      lessons: 22,
      students: 3,
      image: fashion,
    },
    {
      title: "FASHION PRODUCT MANAGEMENT",
      author: "Sampath Kasirajan",
      lessons: 12,
      students: 3,
      image: fashionproductmanagement,
    },
    {
      title: "VISUAL MERCHANDISING",
      author: "Sampath Kasirajan",
      lessons: 17,
      students: 3,
      image: visual,
    },
    {
      title: "RETAIL MANAGEMENT",
      author: "Sampath Kasirajan",
      lessons: 48,
      students: 3,
      image: retail,
    },
  ],
};

const CoursePage: React.FC = () => {
  const [category, setCategory] = useState<
    "masters" | "graduate" | "diploma" | "specialist" | "micro"
  >("micro");
  const [ratings, setRatings] = useState<number[]>(Array(4).fill(0));
  const courses = allCourses[category];

  const handleRating = (index: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  return (
    <div className="container-fluid py-5 px-5"style={{ backgroundColor: "#F7F5F2" }}>
      <div className="text-center mb-4">
        <p className="text-muted">Experiential Learning like never before</p>
        <h2 className="fw-bold">
          Orientation courses leading to exciting placements
        </h2>
      </div>

      <div className="d-flex justify-content-center mb-5 flex-wrap gap-3">
        {["masters", "graduate", "diploma", "specialist", "micro"].map(
          (type) => (
            <button
              key={type}
              className={`btn fw-bold px-2 py-2 btn-custom-yellow ${
                category === type ? "selected-btn" : ""
              }`}
              style={{ fontSize: "1.05rem", minWidth: "200px", height: "65px" }}
              onClick={() => setCategory(type as typeof category)}
            >
              {type === "masters" && "Masters Programme"}
              {type === "graduate" && "Graduate Programme"}
              {type === "diploma" && "Diploma Programme"}
              {type === "specialist" && "Specialist Programme"}
              {type === "micro" && "Micro Learning"}
            </button>
          )
        )}
      </div>

      <div className="row justify-content-center">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center "
          >
            <div
              className="card shadow-sm"
              style={{
                width: "270px",
                height: "490px",
                border: "1px solid #eee",
                backgroundColor:"#F7F5F2",
               
              }}
            >
              <img
                src={course.image}
                className="card-img-top"
                alt={course.title}
                style={{ height: "160px", objectFit: "cover" }}
              />

              {/* ⭐ Star Rating Centered */}
              <div className="text-center mt-3 mb-2">
                {[...Array(5)].map((_, starIdx) => (
                  <i
                    key={starIdx}
                    className={`bi ${
                      starIdx < ratings[idx] ? "bi-star-fill" : "bi-star"
                    } text-warning`}
                    style={{
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      margin: "0 2px",
                    }}
                    onClick={() => handleRating(idx, starIdx + 1)}
                  ></i>
                ))}
              </div>

              <div
                className="card-body text-start px-3 pt-2"
                style={{ fontSize: "0.92rem", lineHeight: "1.9" }}
              >
                <h5
                  className="fw-bold text-uppercase text-dark mb-2"
                  style={{ fontSize: "1.1rem" }}
                >
                  {course.title}
                </h5>
                <p className="text-dark mb-2">
                  by <strong>{course.author}</strong>
                </p>
                <p className="text-dark mb-2">
                  <i className="bi bi-file-earmark-text text-warning me-2"></i>{" "}
                  {course.lessons} Lessons
                </p>
                <p className="text-dark mb-3">
                  <i className="bi bi-people text-warning me-2"></i>{" "}
                  {course.students} Students
                </p>
                <p
                  className="fw-bold text-dark mb-3"
                  style={{ fontSize: "1.25rem" }}
                >
                  ₹ 2,035.00
                </p>
                <button
                  className="btn btn-outline-dark w-100"
                  style={{
                    fontSize: "0.9rem",
                    borderRadius: "6px",
                    paddingTop: "7px",
                    paddingBottom: "7px",
                  }}
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
