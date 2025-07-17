

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CollegeRegister.css"
import TopBar from "../Common/Topbar"
import MainNav from "../Common/MainNav"
import Sidenav from "./Sidenav"

interface CollegeData {
  firstName: string
  lastName: string
  emailId: string
  phoneNumber: string
  legalName: string
  universityName: string
  universityType: string
  courseAccess: string
  buildingAddress: string
  streetRoad: string
  locationPrecinct: string
  city: string
  stateProvince: string
  pinCode: string
  country: string
}

interface ValidationErrors {
  [key: string]: boolean
}

const CollegeRegister = () => {
  const navigate = useNavigate()
  const [showSuccessModal, setShowSuccessModal] = useState<{
    show: boolean
    collegeName: string
  } | null>(null)

  const [showErrorModal, setShowErrorModal] = useState<{
    show: boolean
    message: string
  } | null>(null)

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const [collegeData, setCollegeData] = useState<CollegeData>({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    legalName: "",
    universityName: "",
    universityType: "",
    courseAccess: "",
    buildingAddress: "",
    streetRoad: "",
    locationPrecinct: "",
    city: "",
    stateProvince: "",
    pinCode: "",
    country: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCollegeData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: false,
      }))
    }
  }

  const validateForm = () => {
    const errors: ValidationErrors = {}
    const requiredFields = ["firstName", "lastName", "emailId", "phoneNumber", "legalName"]

    requiredFields.forEach((field) => {
      if (!collegeData[field as keyof CollegeData].trim()) {
        errors[field] = true
      }
    })

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const checkDuplicates = () => {
    const existingColleges = JSON.parse(localStorage.getItem("colleges") || "[]")

    // Check for duplicate email
    const emailExists = existingColleges.some(
      (college: any) => college.emailId.toLowerCase() === collegeData.emailId.toLowerCase(),
    )

    // Check for duplicate phone number
    const phoneExists = existingColleges.some((college: any) => college.contactNumber === collegeData.phoneNumber)

    // Check for duplicate college name
    const nameExists = existingColleges.some(
      (college: any) => college.collegeName.toLowerCase() === collegeData.legalName.toLowerCase(),
    )

    if (emailExists) {
      setShowErrorModal({
        show: true,
        message: "A college with this email address already exists!",
      })
      return false
    }

    if (phoneExists) {
      setShowErrorModal({
        show: true,
        message: "A college with this phone number already exists!",
      })
      return false
    }

    if (nameExists) {
      setShowErrorModal({
        show: true,
        message: "A college with this name already exists!",
      })
      return false
    }

    return true
  }

  const handleCreate = () => {
    // Validate required fields
    if (!validateForm()) {
      setShowErrorModal({
        show: true,
        message: "Please fill in all required fields marked with *",
      })
      return
    }

    // Check for duplicates
    if (!checkDuplicates()) {
      return
    }

    // Get existing colleges from localStorage
    const existingColleges = JSON.parse(localStorage.getItem("colleges") || "[]")

    // Create new college object
    const newCollege = {
      id: Date.now(), // Simple ID generation
      collegeName: collegeData.legalName,
      location:
        collegeData.city && collegeData.stateProvince
          ? `${collegeData.city}, ${collegeData.stateProvince}`
          : collegeData.city || collegeData.stateProvince || "Not specified",
      universityType: collegeData.universityType || "Not specified",
      contactPerson: `${collegeData.firstName} ${collegeData.lastName}`,
      contactNumber: collegeData.phoneNumber,
      emailId: collegeData.emailId,
      courseAccess: collegeData.courseAccess,
    }

    // Add new college to the list
    const updatedColleges = [...existingColleges, newCollege]

    // Save to localStorage
    localStorage.setItem("colleges", JSON.stringify(updatedColleges))

    // Show success modal
    setShowSuccessModal({
      show: true,
      collegeName: collegeData.legalName,
    })
  }

  const closeSuccessModal = () => {
    setShowSuccessModal(null)
    // Navigate back to college list
    navigate("/colleges")
  }

  const closeErrorModal = () => {
    setShowErrorModal(null)
  }

  return (
    <>
    <TopBar/>
    <MainNav/>
    <div className="d-flex">
    <Sidenav />
  
    <div className="college-register-main-content">

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content success-modal">
            <h3>College Successfully Created</h3>
            <div className="success-details">
              <strong>{showSuccessModal.collegeName}</strong> has been successfully registered!
            </div>
            <button className="success-btn" onClick={closeSuccessModal}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal-content error-modal">
            <h3>Validation Error</h3>
            <div className="error-details">{showErrorModal.message}</div>
            <button className="error-btn" onClick={closeErrorModal}>
              OK
            </button>
          </div>
        </div>
      )}

      <div className="college-register-container">
        <div className="form-section">
          <h3 className="section-title">Administrator Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={collegeData.firstName}
                onChange={handleInputChange}
                className={validationErrors.firstName ? "error" : ""}
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={collegeData.lastName}
                onChange={handleInputChange}
                className={validationErrors.lastName ? "error" : ""}
              />
            </div>
            <div className="form-group">
              <label>Email Id *</label>
              <input
                type="email"
                name="emailId"
                placeholder="Enter email address"
                value={collegeData.emailId}
                onChange={handleInputChange}
                className={validationErrors.emailId ? "error" : ""}
              />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={collegeData.phoneNumber}
                onChange={handleInputChange}
                className={validationErrors.phoneNumber ? "error" : ""}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">College Details</h3>
          <div className="form-row college-details-row">
            <div className="form-group">
              <label>Legal Name of the College or Trust *</label>
              <input
                type="text"
                name="legalName"
                placeholder="Enter college legal name"
                value={collegeData.legalName}
                onChange={handleInputChange}
                className={validationErrors.legalName ? "error" : ""}
              />
            </div>
            <div className="form-group">
              <label>University Name</label>
              <input
                type="text"
                name="universityName"
                placeholder="Enter university name"
                value={collegeData.universityName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>University Type</label>
              <select name="universityType" value={collegeData.universityType} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Private">Private</option>
                <option value="Government">Government</option>
                <option value="Central">Central</option>
                <option value="Deemed">Deemed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Course Access</label>
              <select name="courseAccess" value={collegeData.courseAccess} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Edit">Customise</option>
                <option value="Default">Default</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Address</h3>
          <div className="address-container">
            <div className="address-row-1">
              <div className="form-group">
                <label>Building-Block-Phase-Forum</label>
                <input
                  type="text"
                  name="buildingAddress"
                  placeholder="Enter building details"
                  value={collegeData.buildingAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Street Road</label>
                <input
                  type="text"
                  name="streetRoad"
                  placeholder="Enter street/road"
                  value={collegeData.streetRoad}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Location-Precinct</label>
                <input
                  type="text"
                  name="locationPrecinct"
                  placeholder="Enter location"
                  value={collegeData.locationPrecinct}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={collegeData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="address-row-2">
              <div className="form-group">
                <label>State-Province</label>
                <input
                  type="text"
                  name="stateProvince"
                  placeholder="Enter state/province"
                  value={collegeData.stateProvince}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Pin Code</label>
                <input
                  type="text"
                  name="pinCode"
                  placeholder="Enter pin code"
                  value={collegeData.pinCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <select name="country" value={collegeData.country} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="save-button-container">
          <button className="create-btn" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
    </div>
      </>
  )
}

export default CollegeRegister