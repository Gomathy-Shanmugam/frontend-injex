import React from "react";
import "./TextileExperts.css";
import "./PanelofExperts.css"

// Importing all images
import expert1 from "../../assets/icon.jpg";
import expert2 from "../../assets/icon.jpg";
import expert3 from "../../assets/icon.jpg";
import expert5 from "../../assets/sam sir.jpg"
import expert6 from "../../assets/icon.jpg"
import expert7 from "../../assets/icon.jpg"
import expert8 from "../../assets/icon.jpg";
import expert9 from "../../assets/icon.jpg";
import expert10 from "../../assets/women.jpg";
import expert11 from "../../assets/women.jpg";
import expert12 from "../../assets/women.jpg";
import expert13 from "../../assets/women.jpg";
import expert14 from "../../assets/icon.jpg";
import expert15 from "../../assets/women.jpg";
import expert16 from "../../assets/visal.jpg";
import expert17 from "../../assets/shamini.jpg"
import expert18 from "../../assets/aishwarya.jpg"
import expert19 from "../../assets/icon.jpg"
import expert20 from "../../assets/icon.jpg";
import expert21 from "../../assets/balaji.jpg";
import expert22 from "../../assets/icon.jpg";
import expert23 from "../../assets/sudharsan.jpg"
import expert24 from "../../assets/icon.jpg"
import expert25 from "../../assets/icon.jpg"
import expert26 from "../../assets/venkat.jpg"







const TextileExperts: React.FC = () => {
 


  const sections = [
  {
    heading: "Textile Academicians",
    members: [
      // 5 cards
      { name: "Dr. K. Ramesh Babu", expertise: "Textile Chemistry and Processing", affiliation: "PSG College of Technology, Coimbatore.", image: expert1 },
      { name: "Dr. M. Ramachandran", expertise: "Fashion Technology &Textile Design", affiliation: "Kumaraguru College of Technology, Coimbatore.", image: expert2 },
      { name: "Dr. N. Gokilamani", expertise: "Apparel Manufacturing & Quality Management", affiliation: "Bannari Amman Institute of Technology, Erode", image: expert3 },
      { name: "Dr. R. Anandan", expertise: "Knitting Technology & Smart Textiles", affiliation: "Bannari Amman Institute of Technology, Erode", image: expert1 },
      { name: "Sampath Kasirajan", expertise: "Industry 4.0 standards, Industrial Engineering, Business Process Engineering , 44 years experience", affiliation: "Bannari Amman Institute of Technology, Erode", image: expert5 },
    ],
  },
  {
    heading: "Industry Leaders",
    members: [
      // 4 cards
      { name: "Mr. B. Arumugam", expertise: "Director, Loyal Textile Mills Ltd.", affiliation: "Textile Manufacturing and Export.", image: expert6 },
      { name: "Mr. T. Ramasami", expertise: "Former Director, Central Leather Research Institute (CLRI)", affiliation: "Textile and Leather Innovation", image: expert7 },
      { name: "Mr. R. Rajkumar", expertise: "CEO, Shahi Exports Pvt. Ltd.", affiliation: "Garment Manufacturing and Sustainable Practices", image: expert8 },
      { name: "Mr. Raja Shanmugam", expertise: "Ex President, Tiruppur Exporters’ Association", affiliation: "Apparel Exports and Cluster Development", image: expert9 },
    ],
  },
  {
    heading: "Fashion Designers and Entrepreneurs",
    members: [
        { name: "Ms. Vijayalakshmi", expertise: "Ethicus Pollachi", affiliation: "Fashion Brand", image: expert10 },
      { name: "Ms.Rehana Basheer", expertise: "Founder, Rehana’s Boutique", affiliation: "Garment Manufacturing and Sustainable Practices", image: expert11 },
      { name: "Ms. Sandhya Raman", expertise: "Traditional and Contemporary Textile Design", affiliation: "Traditional and Contemporary Textile Design", image: expert12},
      { name: "Ms. Srimathi Shivashankar", expertise: "Founder, Ethniq Weaves", affiliation: "Handloom and Organic Textiles.", image: expert13 },
      { name: "Mr. Sethupathy", expertise: "CEO, Master Linen", affiliation: "Home Textiles and International Markets", image: expert14 },
      { name: "Ms. Anita Pandian", expertise: "Co-founder, WearYouDeserve", affiliation: "E-commerce and Sustainable Fashion", image: expert15 },
      { name: "Ms.Visalakshi Kasinathan", expertise: "Founder, VisaAtelier,10 years experience", affiliation: "Creative & Sustainable design, Trend spotting, International marketing", image: expert16 },
      { name: "Shamini Radhamani", expertise: "Founder, Niram Design Studio,9 years experience", affiliation: "Fashion / Apparel", image: expert17 },
      { name: "Aishwarya Manivannan", expertise: "Founder, Maisha Studio,14 years experience", affiliation: "Design Education + Creative Entrepreneurship", image: expert18 },
    ],
  },
  {
    heading: "Sustainability",
    members: [
      { name: "Dr. Subramanian Senthilkannan Muthu", expertise: "Textile Sustainability and Lifecycle Assessment", affiliation: "Researcher and Author, Alumnus of Anna University, Chennai", image: expert19 },
    ],
  },
  {
    heading: "CLUSTER DEVELOPMENT",
    members: [
       { name: "R.Jeyamohan", expertise: " Cluster Development", affiliation: "Project Management Consultant, Ministry of Textiles, Government of India", image: expert20 },
      { name: "Sampath Kasirajan", expertise: "Cluster Development, Industry 4.0 standards, Centres of Excellence, Design Centres,44 years experience", affiliation: "Textile and Leather Innovation", image: expert5 },
    ],
  },
  {
    heading: "TRAINING",
    members: [
      { name: "Balaji Rajagopalan", expertise: " Setting up Apparel Training & Design centres, Placements, Export Promotions,44 years experience", affiliation: "Regional Secretary, Clothing Manufacturer’s Association of India, Member, Board of Studies, Dept of Handloom , Karnataka, Vision Group, Govt of Karnataka, Member Cochin Export Promotion zone", image: expert21 },
      { name: "Sampath Kasirajan", expertise: "Cluster Development, Industry 4.0 standards, Centres of Excellence, Design Centres,44 years experience", affiliation: "Textile and Leather Innovation", image: expert5 },
    ],
  },
  {
    heading: "TECHNOLOGY",
    members: [
       { name: "Firosh", expertise: " Bubble Developer, Content Creation, Digital Media, Gaming,6 years experience", affiliation: "Hydra,Injex", image: expert22 },
      { name: "Sampath Kasirajan", expertise: "Industry 4.0 standards, IT and Business Process Engineering,44 years experience", affiliation: "Hydra, Textile Industry", image: expert5 },
    ],
  },
   {
    heading: "FINANCE",
    members: [
     { name: "Sudarshan Kasturi", expertise: " NON BANKING FINANCIAL COMPANY,35 years experience", affiliation: "EASYACCESS FINANCIAL SERVICES LTD", image: expert23 },
    ],
  },
   {
    heading: "ESG",
    members: [
     { name: "Dr. Subramanian Senthilkannan Muthu", expertise: " Textile Sustainability and Lifecycle Assessment", affiliation: "Researcher and Author, Alumnus of Anna University", image: expert24 },
      { name: "Sampath Kasirajan", expertise: "ESG Green Corridor,44 years experience", affiliation: "EU-Nordic Council, ITC- Geneva", image: expert5 },
    ],
  },
  {
    heading: "PACKAGING",
    members: [
       { name: "Venkatesh Iyer", expertise: " Product packaging for global brands, international sales and marketing", affiliation: "Consultant", image: expert25 },
      { name: "Venkat Hariharan", expertise: "Own Company:   FUDPAK,26 years experience", affiliation: "Sustainable Packaging", image: expert26},
    ],
  },
];

  return (
  <div className="textile-experts-section">
    {sections.map((section, sectionIndex) => (
      <div key={sectionIndex} className="section-wrapper">
        <h2 className="section-heading">{section.heading}</h2>
        <div className="experts-card-container">
          {section.members.map((expert, index) => (
            <div key={index} className="expert-card">
              <img src={expert.image} alt={expert.name} className="expert-image" />
              <div className="expert-info">
                <h4><strong>{expert.name}</strong></h4>
                <p className="expertise">{expert.expertise}</p>
                <p><strong>Affiliation:</strong></p>
                <p className="affiliation">{expert.affiliation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

};

export default TextileExperts;
