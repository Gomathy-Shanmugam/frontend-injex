
import React from "react";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-container">
        <div className="left-section">
          <span className="partner-text">Partner Program</span>
          <div className="contact-info">
            <span className="phone-item">
              <BlackPhoneIcon /> +91 96005 22154
            </span>
            <span className="mail-item">
              <BlackMailIcon /> support@injex.org
            </span>
            <span className="cart-icon">
              <BlackCartIcon />
            </span>
          </div>
        </div>
        <div className="right-section">
          <button className="dashboard-btn student">
            <StudentIcon /> Student Dashboard
          </button>
          <button className="dashboard-btn faculty">
            <FacultyIcon /> Faculty Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

// SVG Icons with forced black color
const BlackPhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#000">
    <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-1.622.845-2.298 2.627-2.214 4.155.33 5.74 9.013 17.361 15.226 16.712 1.058-.113 2.047-.691 2.733-1.523z" />
  </svg>
);

const BlackMailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#000">
    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
  </svg>
);

const BlackCartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-1.45-5c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48h-14.8l-.94-2h-3.27v2h2l3.6 7.59-1.35 2.44c-.73 1.34.23 2.97 1.75 2.97h12v-2h-12l1.1-2h7.45z" />
  </svg>
);

const StudentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
  </svg>
);

const FacultyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

export default TopBar;
