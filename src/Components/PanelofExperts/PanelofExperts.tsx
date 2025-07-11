import React from "react";
import "./PanelofExperts.css";
import bgImage from "../../assets/panel.jpg";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import Footer from "../Common/Footer";
import TextileExperts from "./TextileExperts"

const PanelofExperts: React.FC = () => {
  return (
    <div>
           <TopBar />
      <MainNav />
   
    <div
      className="panel-experts-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="panel-experts-overlay">
        <h1 className="panel-experts-heading">Panel of Experts</h1>
      </div>
    </div>

    {/* Section Heading */}
      {/* <div className="experts-section-heading">
        <h2>Apparel and Textile Technology</h2>
      </div> */}

        <TextileExperts />
    <Footer/>
     </div>
  );
};

export default PanelofExperts;
