import React from "react";
import "./ConceptofInjex.css";
import bgImage from "../../assets/concept1.png";
import injectionImage from "../../assets/injecion.jpg";
import finalFlowImage from "../../assets/Industry.png"
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import Footer from "../Common/Footer";

const ConceptofInjex: React.FC = () => {
  return (
    <div>
      <TopBar />
      <MainNav />

      {/* Top Section */}
      <div
        className="conceptofinjex-container"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="conceptofinjex-overlay">
          <div className="conceptofinjex-content">
            <h2>
              <strong>STRUCTURED</strong> <br />
              <strong>KNOWLEDGE MODULES</strong>
            </h2>
            <p>
              Raw Industry Knowledge transformed into structured knowledge
              modules that are aligned to established academic frameworks and
              pedagogy.
            </p>
            <button className="cta-btn">Getting Started</button>
          </div>
        </div>
      </div>

      {/* Gather / Transform / Transfer Section */}
      <div className="gather-transform-container">
        <div className="gather-transform-left">
          <div className="step-card">
            <h4><strong>GATHER</strong></h4>
            <p>
              The INJEX concept employs a dynamic method to collect real-world
              experiential knowledge from across the entire Textile Value Chain
            </p>
          </div>
          <div className="step-card">
            <h4><strong>TRANSFORM</strong></h4>
            <p>
              The experiential knowledge gathered is converted into “Easily
              Teachable Knowledge Modules” that are designed to help students
              grasp the concepts with ease.
            </p>
          </div>
          <div className="step-card">
            <h4><strong>TRANSFER</strong></h4>
            <p>
              The Knowledge Modules are thoughtfully scheduled, balancing time
              and practical intensity, to provide students with ample opportunity
              to absorb and personally experience the transformation. They are
              administered according to the level of expertise sought by the
              learner.
            </p>
          </div>
          <div className="step-card">
            <h4><strong>CONTINUE</strong></h4>
            <p>
              The process of capturing emerging industrial practices and benchmarks ensures that the knowledge base is consistently updated with the latest techniques and practices adopted by the Industry for driving productivity and enhancing customer service.
            </p>
          </div>
        </div>
        <div className="gather-transform-right">
          <img src={injectionImage} alt="Injection Flow Diagram" />
        </div>
      </div>

      {/* Full-width Final Flow Image */}
      <div className="full-width-flow">
        <img src={finalFlowImage} alt="Final Process Flow" />
      </div>
      <Footer />
    </div>
    
  );
};

export default ConceptofInjex;
