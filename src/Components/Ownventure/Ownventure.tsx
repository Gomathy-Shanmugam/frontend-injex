import React from "react";
import "../StartUp/StartupSection.css";
import portImage from "../../assets/port-image.jpeg";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import Footer from "../Common/Footer";

const Ownventure: React.FC = () => {
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
            “Training you to become an <br /> experienced entrepreneur!"
          </h2>
          <button className="yellow-btn bold-btn">Entrepreneur programme</button>
        </div>
      </div>

      {/* Buttons container below the image and content */}
      <div className="buttons-container">
        <button className="yellow-btn bold-btn">Start-Up</button>
        <button className="black-btn bold-btn">Own Venture</button>
        <button className="black-btn bold-btn">Industry Projects</button>
      </div>

      <div className="startup-info ms-5">
  <h2>“Guiding You Through the Entrepreneurial Journey with Expertise and Support”</h2>
  <p>
    At INJEX, we don’t just teach entrepreneurship—we guide you through its riskiest phases. With the help of experienced mentors and a strong ecosystem, we help you navigate the challenges of starting a business, from avoiding common pitfalls to making informed decisions. Whether you’re setting up your own shop or launching a new venture, we provide the mentorship and support needed to turn your ideas into successful businesses.
  </p>
</div>
<Footer/>
    </>
  );
};

export default Ownventure;
