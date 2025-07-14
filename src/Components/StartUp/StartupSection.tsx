import React from "react";
import "./StartupSection.css";
import portImage from "../../assets/port-image.jpeg";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import Footer from "../Common/Footer";

const StartUpSection: React.FC = () => {
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
            “Sharpening your readiness to join the <br /> fast lanes of start-ups!"
          </h2>
          <button className="yellow-btn bold-btn">Startup Initiatives</button>
        </div>
      </div>

      {/* Buttons container below the image and content */}
      <div className="buttons-container">
        <button className="yellow-btn bold-btn">Start-Up</button>
        <button className="black-btn bold-btn">Own Venture</button>
        <button className="black-btn bold-btn">Industry Projects</button>
      </div>

      <div className="startup-info ms-5">
  <h2>“Learn the basics of Start-Ups”</h2>
  <p>
    We empower you to dream big. Through our unique Start-Up Program, students gain access to a supportive ecosystem, professional networks, access to seed funds, and mentorship to prepare them for the challenges ahead.
  </p>
</div>
<Footer/>
    </>
  );
};

export default StartUpSection;
