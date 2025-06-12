import React from 'react';

import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const FooterSection: React.FC = () => {
  return (
    <>
      {/* Social Impact Section */}
      <div className="social-impact-container">
        <div className="social-impact-section">
          <div className="social-impact-headers">
            <div className="impact-header">Social Impact</div>
            <div className="impact-header">Partners & Affiliates</div>
            <div className="impact-header">Training Centres</div>
            <div className="impact-header">Student Services</div>
            <div className="impact-header">Help & Support</div>
          </div>
          <div className="social-impact-content">
            <div className="impact-column">
              <ul>
                <li>Social Programmes</li>
                <li>CSR</li>
                <li>Entrepreneurship Development</li>
              </ul>
            </div>
            <div className="impact-column">
              <ul>
                <li>Invest In Injex</li>
                <li>Become A Partner</li>
                <li>Become An Affiliate</li>
                <li>Industry Participation</li>
                <li>Become A Contributor</li>
              </ul>
            </div>
            <div className="impact-column">
              <ul>
                <li>India</li>
                <li>Overseas</li>
              </ul>
            </div>
            <div className="impact-column">
              <ul>
                <li>Career Counselling</li>
                <li>Placement Policy</li>
              </ul>
            </div>
            <div className="impact-column">
              <ul>
                <li>Contact</li>
                <li>FAQ</li>
                <li>Terms And Conditions</li>
                <li>Privacy Policy</li>
                <li>Return & Refund Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="events-container">
        <div className="events-section">
          <div className="events-columns-container">
            <div className="events-left-columns">
              <div className="events-column">
                <div className="events-heading">Events</div>
                <ul className="events-list">
                  <li>Webinars</li>
                </ul>
              </div>
              <div className="events-column">
                <div className="events-heading">Publications</div>
                <ul className="events-list">
                  <li>Blogs & Articles</li>
                  <li>Latest News</li>
                  <li>Library</li>
                </ul>
              </div>
              <div className="events-column">
                <div className="events-heading">Community</div>
                <ul className="events-list">
                  <li>Alumni</li>
                  <li>Community</li>
                  <li>Gallery</li>
                </ul>
              </div>
            </div>

            <div className="job-links-column text-center">
              <button className="job-links-button">Job Links</button>
              <div className="social-icons">
                <span className="social-icon twitter-icon"><FaTwitter /></span>
                <span className="social-icon linkedin-icon"><FaLinkedin /></span>
                <span className="social-icon instagram-icon"><FaInstagram /></span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Links */}
        <div className="events-footer">
          <span>@Injex 2024</span>
          <span>Terms</span>
          <span>Privacy</span>
          <span>Cookie Settings</span>
          <span>Site Map</span>
        </div>
      </div>
    </>
  );
};

export default FooterSection;
