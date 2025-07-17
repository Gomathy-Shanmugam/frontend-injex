import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/injex-bglogo.png";

const MainNav = () => {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <img src={logo} alt="Injex Logo" className="nav-logo" />
        <div className="nav-links">
          <div className="nav-item">
            <Link to="/">Home</Link>
          </div>

          <div className="nav-item dropdown">
            <Link to="/about">About Us</Link>
            <div className="dropdown-menu">
              <Link to="/about/why-injex">Why Injex</Link>
              <Link to="/injex-concept">Concept of Injex</Link>
              <Link to="/panel-experts">Panel of Experts</Link>
            </div>
          </div>

          <div className="nav-item dropdown">
            <Link to="/courses">All Courses</Link>
            <div className="dropdown-menu">
              <Link to="/courses/master">Master Programme</Link>
              <Link to="/courses/diploma">Diploma Programme</Link>
              <Link to="/courses/specialist">Specialist Programme</Link>
              <Link to="/courses/graduate">Graduate Programme</Link>
              <Link to="/courses/fasttrack">Fasttrack Programme</Link>
              <Link to="/courses/micro">Micro Learning Programme</Link>
              <Link to="/courses/certification">Certification Course</Link>
            </div>
          </div>

          <div className="nav-item dropdown">
            <Link to="/authors">Authors & Instructors</Link>
            <div className="dropdown-menu">
              <Link to="/authors/mentors">Mentors</Link>
              <Link to="/faculty-development">Faculty Training</Link>
            </div>
          </div>

          <div className="nav-item dropdown">
            <Link to="/industry">Industry Link</Link>
            <div className="dropdown-menu">
              <Link to="/job-link">Job</Link>
              <Link to="/industry/internship">Internship</Link>
              <Link to="/industry/placement">Placement</Link>
            </div>
          </div>

          <div className="nav-item dropdown">
            <Link to="/venture">Venture Hub</Link>
            <div className="dropdown-menu">
              <Link to="/start-up">Startup</Link>
              <Link to="/industry-project">Industry Project</Link>
              <Link to="/own-venture">Own Ventures</Link>
            </div>
          </div>

          <div className="nav-item dropdown">
            <Link to="/learning">Learning Formats</Link>
            <div className="dropdown-menu">
              <Link to="/learning/adaptive">Adaptive Learning Path</Link>
            </div>
          </div>
        </div>

        <Link to="/faculty" className="faculty-btn">
          Faculty Development
          <br />
          Programme
        </Link>
      </div>
    </nav>
  );
};

export default MainNav;
