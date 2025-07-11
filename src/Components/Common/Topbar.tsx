

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-container">
        <div className="all-items-row">
          <span className="partner-text">Partner Program</span>

          <span className="phone-item">
            <BlackPhoneIcon /> +91 96005 22154
          </span>

          <span className="mail-item">
            <BlackMailIcon /> support@injex.org
          </span>

          <div className="right-group">
            <button className="dashboard-btn faculty">
              <FacultyIcon /> Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// SVG Icons with forced black color (same as your original)
const BlackPhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#000">
    <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-1.622.845-2.298 2.627-2.214 4.155.33 5.74 9.013 17.361 15.226 16.712 1.058-.113 2.047-.691 2.733-1.523z" />
  </svg>
)

const BlackMailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#000">
    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
  </svg>
)

const FacultyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
)

export default TopBar