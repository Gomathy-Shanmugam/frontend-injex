"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import TopBar from "../Common/Topbar"
import MainNav from "../Common/MainNav"
import "./BasicsCreateCourse.css"
import CurriculumCourse from "./CurriculumCourse"

const CreateCourse: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Basics")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [prerequisites, setPrerequisites] = useState("None")
  const [whatYouLearn, setWhatYouLearn] = useState("")
  const [costType, setCostType] = useState("Select")
  const [price, setPrice] = useState("")
  const [regularPrice, setRegularPrice] = useState("")
  const [jobOpportunities, setJobOpportunities] = useState("Select")
  const [adminComments, setAdminComments] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState([{ name: "Case File : 1", price: "₹ 160", url: "#" }])
  const navigate = useNavigate()

  // Add this after the existing state declarations
  const [showSummary, setShowSummary] = useState(false)

  // Image Handling
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setSelectedImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => setSelectedImage(null)

  // File Handling
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])
    }
  }

  const handleSaveFiles = () => {
    const newUploads = files.map((file) => ({
      name: file.name,
      price: price ? `₹ ${price}` : "Free",
      url: URL.createObjectURL(file),
    }))
    setUploadedFiles([...uploadedFiles, ...newUploads])
    setFiles([])
  }

  const handleViewFile = (url: string) => {
    if (url === "#") {
      alert("This is a sample file. No actual file to view.")
    } else {
      window.open(url, "_blank")
    }
  }

  const handleDeleteFile = (index: number) => {
    const updatedFiles = [...uploadedFiles]
    updatedFiles.splice(index, 1)
    setUploadedFiles(updatedFiles)
  }

  // Add this function after the existing functions
  const toggleSummary = () => {
    setShowSummary(!showSummary)
  }

  return (
    <>
      <TopBar />
      <MainNav />
      <div className="create-course-container">
        <div className="sidebar">
          <div className="back-button" onClick={() => navigate(-1)}>
            ← My Courses
          </div>
          <h2 className="create-title">Create Course</h2>
          <ul className="tab-list">
            {["Course Details", "Module", "Grades", "Rubrics"].map((tab) => (
              <li
                key={tab}
                className={`tab-item ${activeTab === tab ? "active-tab" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        <div className="form-section">
          <div className="action-header">
            <span className="last-updated">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <div className="action-buttons">
              {activeTab === "Module" && (
                <button className="action-btn view-btn" onClick={toggleSummary}>
                  {showSummary ? "Back to Module" : "Summary & Edit"}
                </button>
              )}
              <button className="action-btn draft-btn">Save as Draft</button>
              <button className="action-btn" style={{ border: "1px solid #333", background: "white", color: "#333" }}>
                Publish Course
              </button>
            </div>
          </div>

          {activeTab === "Course Details" && (
            <div className="basic-form">
              <h3 className="section-title">Course Details</h3>

              {/* Thumbnail Section */}
              <div className="thumbnail-section">
                <h4 className="subsection-title">Thumbnail</h4>
                <div className="thumbnail-content">
                  <div className="image-upload-box" onClick={() => document.getElementById("file-input")?.click()}>
                    {selectedImage ? (
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Course Thumbnail"
                        className="thumbnail-image"
                      />
                    ) : (
                      <p>Click or Drag the Image (jpg, jpeg, png, webp)</p>
                    )}
                  </div>
                  <div className="thumbnail-actions">
                    <button className="change-btn" onClick={() => document.getElementById("file-input")?.click()}>
                      Change
                    </button>
                    <button className="remove-btn" onClick={handleRemoveImage}>
                      Remove
                    </button>
                  </div>
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </div>

              <div className="course-details">
                {/* Course Title & Category */}
                <div className="form-row">
                  <div className="form-group">
                    <h4 className="subsection-title">Course Title</h4>
                    <input type="text" className="form-input" />
                  </div>
                  <div className="form-group">
                    <h4 className="subsection-title">Category</h4>
                    <select className="form-select">
                      <option>Select</option>
                      <option>Fashion</option>
                      <option>Design</option>
                    </select>
                  </div>
                </div>

                {/* Learning Level, Prices, Dates */}
                <div className="form-row expanded-row">
                  <div className="form-group">
                    <h4 className="subsection-title">Learning Level</h4>
                    <select className="form-select">
                      <option>Select</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <h4 className="subsection-title">Regular Price</h4>
                    <input
                      type="text"
                      className="form-input"
                      value={regularPrice}
                      onChange={(e) => setRegularPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <h4 className="subsection-title">Sales Price</h4>
                    <input type="text" className="form-input" />
                  </div>
                  <div className="form-group date-group">
                    <h4 className="subsection-title">Start Date</h4>
                    <input type="date" className="form-date" />
                  </div>
                  <div className="form-group date-group">
                    <h4 className="subsection-title">End Date</h4>
                    <input type="date" className="form-date" />
                  </div>
                </div>

                {/* Description Split Section */}
                <div className="form-row description-split-row">
                  {/* Left Section */}
                  <div className="left-section">
                    <div className="form-group description-input-group">
                      <h4 className="subsection-title">Description</h4>
                      <textarea className="description-input" rows={5} />
                    </div>

                    <div className="form-row cost-price-upload-row">
                      <div className="form-group cost-type-group">
                        <h4 className="subsection-title">Cost Type</h4>
                        <select
                          className="form-select cost-type-select"
                          value={costType}
                          onChange={(e) => setCostType(e.target.value)}
                        >
                          <option>Select</option>
                          <option>Online</option>
                          <option>Cash in Hand</option>
                        </select>
                      </div>
                      <div className="form-group price-group">
                        <h4 className="subsection-title">Price</h4>
                        <input
                          type="text"
                          className="form-input price-input"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="form-group upload-group">
                        <h4 className="subsection-title">Downloadable Materials</h4>
                        <label className="file-upload-label">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            multiple
                            style={{ display: "none" }}
                          />
                          Upload File (maximum upload size 10MB)
                        </label>
                      </div>
                    </div>

                    <div className="save-button-row">
                      <button className="save-btn" onClick={handleSaveFiles}>
                        Save
                      </button>
                    </div>

                    {/* Uploaded Files Table */}
                    {uploadedFiles.length > 0 && (
                      <div className="uploaded-files-section">
                        <h4 className="subsection-title">Uploaded Files</h4>
                        <div className="files-table-container">
                          <table className="files-table">
                            <thead>
                              <tr>
                                <th className="center-header">File Name</th>
                                <th className="center-header">Actions</th>
                                <th className="center-header">Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {uploadedFiles.map((file, index) => (
                                <tr key={index}>
                                  <td className="file-name">{file.name}</td>
                                  <td className="file-actions">
                                    <button className="view-file-btn" onClick={() => handleViewFile(file.url)}>
                                      View
                                    </button>
                                    <button className="delete-file-btn" onClick={() => handleDeleteFile(index)}>
                                      Delete
                                    </button>
                                  </td>
                                  <td className="file-price">{file.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Section */}
                  <div className="right-section">
                    <div className="form-group">
                      <h4 className="subsection-title">Pre-Requisite Course</h4>
                      <select
                        className="form-select"
                        value={prerequisites}
                        onChange={(e) => setPrerequisites(e.target.value)}
                      >
                        <option value="None">None</option>
                        <option value="Retail Basics">Retail Basics</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <h4 className="subsection-title">What You Learn</h4>
                      <select
                        className="form-select"
                        value={whatYouLearn}
                        onChange={(e) => setWhatYouLearn(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Retail Experience">Retail Experience</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <h4 className="subsection-title">Job Opportunities</h4>
                      <select
                        className="form-select"
                        value={jobOpportunities}
                        onChange={(e) => setJobOpportunities(e.target.value)}
                      >
                        <option>Select</option>
                        <option>Frontend Developer</option>
                        <option>UX Designer</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <h4 className="subsection-title">Author & Administrator Comments</h4>
                      <input
                        type="text"
                        className="form-input"
                        value={adminComments}
                        onChange={(e) => setAdminComments(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Module" && <CurriculumCourse showSummary={showSummary} />}
        </div>
      </div>
    </>
  )
}

export default CreateCourse