import React from 'react';
import facultyImage from "../../assets/group.jpg"; // Adjust the path based on your folder structure
import "./FacultyDevelopment.css";
import TopBar from '../Common/Topbar';
import MainNav from '../Common/MainNav';
import Footer from '../Common/Footer';
import universityImage from "../../assets/universityImage.jpg"
import facultyTeamImage from "../../assets/facultyTeamImage.jpg"; 
import studentImage from "../../assets/industryImage.jpg"; 
import industryImage from "../../assets/industryImage.jpg"; 

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
        <div className="empowering-educators-section py-5">
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

      <div className="stakeholder-section container py-1">
  <div className="row align-items-center">
    <div className="col-md-7">
      <h5 className="fw-bold mb-3">
        B. What Changes Drastically for All Stakeholders?
      </h5>
      <h6 className="fw-bold mb-4">For Institutions:</h6>

      {/* Bullet Point 1 */}
      <div className="mb-3 d-flex align-items-start">
        <span className="me-2 mt-1" style={{ fontSize: "18px", lineHeight: "1" }}>●</span>
        <p className="mb-0">
          <strong>Stand Out for Industry Orientation:</strong> Establish a dedicated Industry Orientation Cell, capable of shaping students' career paths, supporting entrepreneurship, and even fostering innovation.
        </p>
      </div>

      {/* Bullet Point 2 */}
      <div className="d-flex align-items-start">
        <span className="me-2 mt-1" style={{ fontSize: "18px", lineHeight: "1" }}>●</span>
        <p className="mb-0">
          <strong>Enhance Reputation and Outcomes:</strong> Elevate your institution’s prestige by aligning with industry needs and driving employability.
        </p>
      </div>
    </div>

    <div className="col-md-5 text-center mt-4 mt-md-0">
      <img
        src={universityImage}
        alt="University Illustration"
        className="img-fluid"
        style={{ maxHeight: "300px" }}
      />
    </div>
  </div>
</div>




<div className="stakeholder-section container py-5">
  <div className="row align-items-center">
    {/* Image Left */}
    <div className="col-md-6 text-center mb-4 mb-md-0">
      <img
        src={facultyTeamImage}
        alt="Faculty team discussion"
        className="img-fluid"
        style={{ maxHeight: "350px" }}
      />
    </div>

    {/* Text Right */}
    <div className="col-md-6">
      <h5 className="fw-bold mb-4">For Faculty:</h5>

      <div className="bullet-point">
        <span>●</span>
        <div>
          <p className="mb-1 fw-semibold">Certification Opportunities :</p>
          <p className="mb-0">
            Gain Master’s, Graduate, Diploma, or subject-specific certifications in both theoretical and experiential knowledge.
          </p>
        </div>
      </div>

      <div className="bullet-point">
        <span>●</span>
        <div>
          <p className="mb-1 fw-semibold">Distinguish Yourself as an Educator :</p>
          <p className="mb-0">
            Exposure to industry practices in your field, empowering you to teach using real-world examples, case studies, and assignments.
          </p>
        </div>
      </div>

      <div className="bullet-point">
        <span>●</span>
        <div>
          <p className="mb-1 fw-semibold">Become an Author :</p>
          <p className="mb-0">
            Develop teachable modules that combine theory and practice, enabling you to contribute original content.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>



<div className="stakeholder-section container py-5">
  <div className="row align-items-center">
    {/* Left Side - Text */}
    <div className="col-md-6">
      <h5 className="fw-bold mb-4">For Students:</h5>

      <div className="bullet-point">
        <span>●</span>
        <div>
          <p className="mb-1 fw-semibold">Industry–Ready Certification :</p>
          <p className="mb-0">
            Receive Master’s, Graduate, or subject-specific certifications, signifying preparedness for the workforce.
          </p>
        </div>
      </div>

      <div className="bullet-point">
        <span>●</span>
        <div>
          <p className="mb-1 fw-semibold">Boost Employability :</p>
          <p className="mb-0">
            Graduate as an “industry-ready” professional, prepared to contribute from day one.
          </p>
        </div>
      </div>

      <div className="bullet-point">
        <span>●</span>
        <div>
          <p className="mb-1 fw-semibold">Access to Broader Job Opportunities :</p>
          <p className="mb-0">
            Gain exposure to more than seven core business functions, increasing career flexibility and choice.
          </p>
        </div>
      </div>
    </div>

    {/* Right Side - Image */}
    <div className="col-md-6 text-center mt-4 mt-md-0">
      <img
        src={studentImage}
        alt="Industry Ready Students"
        className="img-fluid"
        style={{ maxHeight: "350px" }}
      />
    </div>
  </div>
</div>




<div className="stakeholder-section container py-5">
  <div className="row align-items-center flex-column-reverse flex-md-row">
    
    {/* Left Side - Image */}
    <div className="col-md-6 text-center mt-4 mt-md-0">
      <img
        src={industryImage}
        alt="Industry Collaboration"
        className="img-fluid"
        style={{ maxHeight: "340px" }}
      />
    </div>

    {/* Right Side - Text */}
    <div className="col-md-6">
      <h5 className="fw-bold mb-4">For Industry :</h5>

      <div className="bullet-point">
        <span>●</span>
        <div>
          <p className="mb-1 fw-semibold">Time and Cost Savings :</p>
          <p className="mb-0">
            “Industry-ready” students can hit the ground running, requiring less onboarding and training.
          </p>
        </div>
      </div>

      <div className="bullet-point">
        <span>●</span>
        <div>
          <p className="mb-1 fw-semibold">Optimize Processes :</p>
          <p className="mb-0">
            Contribute to the optimization of the three P’s (People, Processes, Practices) of industry operations by training students to identify areas for improvement.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>



<div className="why-injex-section container py-5">
  <h4 className="fw-bold mb-4">C. Why INJEX FDP is Different</h4>

  {/* Section 1 */}
  <h5 className="fw-bold">1. Industry Insights &amp; Best Practices</h5>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Understanding Market Trends :</strong> Faculty gain exposure to the latest industry trends, ensuring their teaching remains relevant.
    </p>
  </div>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Access to Industry Case Studies :</strong> A library of real-world case studies allows faculty to integrate practical examples into their curriculum.
    </p>
  </div>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Modern Teaching Methodologies :</strong> Faculty will be introduced to new pedagogical tools and methodologies that are becoming commonplace in global education systems.
    </p>
  </div>

  {/* Section 2 */}
  <h5 className="fw-bold mt-5">2. Gaining Experiential Knowledge</h5>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Structured Lessons :</strong> Comprehensive modules provide faculty with experiential knowledge in each core area, with specific chapters covering relevant topics. Faculty will also participate in Injex-led classroom sessions.
    </p>
  </div>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Simulation Software and Tools :</strong> Faculty can leverage Injex’s simulation software to embed industry-driven experiential knowledge into their teaching.
    </p>
  </div>

{/* section-3 */}
  <h5 className="fw-bold mt-5">3. Enhancing Problem-Solving Skills</h5>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Designing Real-World Assignments  :</strong>  Faculty will learn how to create assignments and projects that mirror industry challenges, helping students combine theoretical and practical knowledge to strengthen their analytical and problem-solving abilities.
    </p>
  </div>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Industry Projects & Solutions :</strong> Faculty will guide students in industry projects focused on solving real-world problems.
    </p>
  </div>



{/* section-4 */}
   <h5 className="fw-bold mt-5">4. Aligning the Syllabus, Curriculum, and Skill Quotient</h5>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Injex Syllabus and Curriculum Guide  :</strong>  Faculty will gain insights from Injex’s annual syllabus and curriculum guide, aligned with emerging industry needs.
    </p>
  </div>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Skill & Knowledge Matrix  :</strong> Faculty will learn to use the Injex Skill & Knowledge Matrix to help students identify the right skill set for increased employability and successful career placement..
    </p>
  </div>


  {/* section-5 */}
   <h5 className="fw-bold mt-5">5. Building a Network for Placement Linkages</h5>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Industry Connections   :</strong>  Faculty will learn how to establish and leverage industry relationships, enriching their teaching with insights and opening doors for student placements.
    </p>
  </div>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>HR Exchange & Placement Facilitation :</strong> Faculty will be equipped with the tools to assist in student placement, helping them navigate career paths and connect with potential employers.
    </p>
  </div>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Ongoing Faculty Support :</strong> Faculty will receive support in engaging with industry professionals, attending conferences, and organizing workshops, ensuring continuous professional growth.
    </p>
  </div>



{/* section-6 */}
   <h5 className="fw-bold mt-5">6. Continuous Engagement and Support</h5>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Ongoing Access to Resources  :</strong>  Faculty will retain access to study materials, industry case studies, and simulation tools after the program ends, ensuring they remain up-to-date with industry developments.
    </p>
  </div>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Regular Updates and Refresher Courses  :</strong> A system will be in place for reskilling, upskilling, and cross-skilling faculty to enhance their teaching capabilities.
    </p>
  </div>


  {/* section-7 */}
   <h5 className="fw-bold mt-5">7. Global Community of Tutors</h5>

  <div className="bullet-point">
    <span>●</span>
    <p>
      <strong>Alumni Network & Peer Learning   :</strong>  Upon completion, faculty will join an exclusive community of educators, sharing experiences, discussing industry trends, and collaborating on research and teaching strategies.
    </p>
  </div>

  <h5 className="fw-bold mt-5">D. How Much Does This Cost?</h5>

  <div className="bullet-point">
    <span>●</span>
    <p>
      The cost is practically negligible.
    </p>
    
  </div>
  <div className="bullet-point">
    <span>●</span>
    <p>
      The FDP is available exclusively to faculty members of institutions enrolled in the student
    </p>
    
  </div>
  <div className="bullet-point">
    <span>●</span>
    <p>
      Industry Orientation courses.
    </p>
    
  </div>
  
</div>

      </div>
      
      <Footer />
    </div>
  );
};

export default FacultyDevelopment;
