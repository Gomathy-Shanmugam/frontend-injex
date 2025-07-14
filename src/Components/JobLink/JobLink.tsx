import React from 'react';
import './JobLink.css';  // Importing the CSS file
import factoryImage from "../../assets/factory.png"; // Import the image
import TopBar from '../Common/Topbar';
import MainNav from '../Common/MainNav';
import Footer from '../Common/Footer';

const JobLinkPage: React.FC = () => {
  return (
    <div>
  <TopBar />
      <MainNav />
   

    <div className="job-link-page-container">
      
      <div className="job-link-container">
        <div className="job-link-image-container">
          <img
            src={factoryImage} // Using imported image
            alt="Job Opportunities"
            className="job-link-image"
          />
        </div>

        <div className="job-link-text-container">
          <h2>Single course with multiple Job Opportunities!</h2>
          <a href="https://www.example.com/job" className="job-link-button">
            Go to the job link
          </a>
        </div>
      </div>

      <div className="job-description-container">
        <h1>Welcome to the INJEX Job Exchange!</h1>
        <p>
          The INJEX Job Exchange is your gateway to exclusive career opportunities with leading global brands, retail chains, national manufacturers, design houses, and top shipping and freight companies. By successfully completing your INJEX certification, you gain access to job positions published on a periodical basis, specifically tailored for our graduates. This is more than just a job placement platform—it’s your chance to work for companies renowned for their outstanding corporate culture, global presence, and exceptional growth potential. You’ll have the opportunity to work in metros across the country, and possibly in overseas locations as well, if you excel in your interviews and studies. With INJEX, you not only get a competitive start in your career but also lifelong access to the Job Exchange, ensuring continuous career advancement and opportunities. Don’t miss the chance to build your career with the world’s best—your future with INJEX begins now!
        </p>
      </div>
    </div>
    <Footer/>
     </div>
  );
};

export default JobLinkPage;
