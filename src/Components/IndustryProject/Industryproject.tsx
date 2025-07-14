import React from "react";
import "../StartUp/StartupSection.css";
import portImage from "../../assets/file14252.png";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import Footer from "../Common/Footer";

const Industryproject: React.FC = () => {
  return (
    <>
      <TopBar />
      <MainNav />
      <div className="startup-wrapper m-2">
        <div className="startup-image-container">
          <img src={portImage} alt="Port with containers" />
        </div>

        <div className="startup-content">
          <h2>
            “Gain the skills and exposure to become <br /> a problem solver!"
          </h2>
          <button className="yellow-btn bold-btn">Industry Project</button>
        </div>
      </div>

      {/* Buttons container below the image and content */}
      <div className="buttons-container">
        <button className="yellow-btn bold-btn">Start-Up</button>
        <button className="black-btn bold-btn">Own Venture</button>
        <button className="black-btn bold-btn">Industry Projects</button>
      </div>

      <div className="startup-info ms-5">
  <h2>“Fashion Industry Challenges & Student Opportunities”</h2>
  <p>
    The fashion industry faces challenges like sustainability, waste, ethical labor practices, and supply chain transparency. As global brands seek solutions, they are turning to top institutions and bright student minds. Students gain hands-on experience by tackling real-world problems through industry projects, preparing them to drive change and innovation in the sector.
  </p>
</div>
<Footer/>
    </>
  );
};

export default Industryproject;
