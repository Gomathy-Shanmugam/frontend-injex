import React from 'react';
import facultyImage from "../../assets/group.jpg"; // Adjust the path based on your folder structure
import "./FacultyDevelopment.css";
import TopBar from '../Common/Topbar';
import MainNav from '../Common/MainNav';
import Footer from '../Common/Footer';

const FacultyDevelopment: React.FC = () => {
  return (
    <div>
      <TopBar />
      <MainNav />
      
      <div className="faculty-development-container">
        {/* Two-column layout with text on left and image on right */}
        <div className="content-container">
          {/* Overview Section */}
          <div className="overview-section">
            <h1>Injex Faculty Development Programme</h1>
            <h2>An Overview</h2>
            <p>
              In today’s rapidly changing world, the gap between industry
              practices and institutional teaching is widening at an alarming rate.
              If not addressed, this growing divide will undermine institutions &
              their ability to prepare students for successful careers in the future.
              This issue cannot be resolved through occasional guest lectures or
              industry workshops alone. Instead, it calls for a strategic approach—
              one that enables institutions to create a dedicated Industry Orientation
              Department. This department would provide faculty with real-world
              experience while keeping them current with industry trends through
              continuous Industry Connect.
            </p>
          </div>

          {/* Image Section */}
          <div className="image-section">
            <img
              src={facultyImage}
              alt="Faculty development session"
              className="faculty-image"
            />
          </div>
        </div>

        {/* Empowering Educators Section */}
        <div className="empowering-educators-section">
          <h3>A. Empowering Educators for Industry-Relevant Education</h3>
          <p>
            Welcome to the Faculty Development Programme (FDP), specifically
            designed to equip educators with the latest industry insights, best
            practices, and practical tools. The goal is to empower faculty members
            to bring real-world knowledge into the classroom. This programme is
            ideal for institutions aiming to enhance their reputation, improve
            employability outcomes, and deliver industry-driven learning experiences.
          </p>

          <h4>How does this work?</h4>
          <p>
            Through the FDP, faculty members will undergo comprehensive training
            on industry practices, access real-world case studies, use interactive
            simulation tools, and build valuable industry relationships. These
            resources will directly benefit both their teaching and student placements.
          </p>
          <p>
            Participants will not only gain new skills but will also be prepared
            to engage students with real-world challenges, ensuring that graduates
            are ready to face the professional world. Continuous support, updates,
            and partnership-driven incentives will position your institution as a
            leader in industry-oriented education.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FacultyDevelopment;
