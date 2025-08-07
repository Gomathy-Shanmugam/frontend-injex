import React, { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import MasterNav from "./MasterNav";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import AppAdminDropdownOption from "./AppAdminDropdownOption"; // Import the modal component

interface DropdownData {
  id: number;
  name: string;
  createdOn: string;
  createdBy: string;
  status: string;
  path: string;
}

const AppAdminDropdown: React.FC = () => {
  const [dropdowns, setDropdowns] = useState<DropdownData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const navigate = useNavigate();

  const handleEditClick = (path: string, name: string) => {
    if (name === "Course Category") {
      setSelectedDropdown(name);
      setShowModal(true);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const dummyData: DropdownData[] = [
      {
        id: 1,
        name: "Course Category",
        createdOn: "12/07/2025",
        createdBy: "Admin",
        status: "Active",
        path: "/appadmindropdown-option",
      },
      {
        id: 2,
        name: "Course Category",
        createdOn: "12/07/2025",
        createdBy: "Admin",
        status: "Active",
        path: "/appadmindropdown",
      },
      
    ];

    setDropdowns(dummyData);
  }, []);

  return (
    <>
      <TopBar />
      <MainNav />
      <div className="d-flex">
        <MasterNav />
        <div className="container mt-4">
          <h5 className="fw-bold mb-3">Choose the Dropdown</h5>
          <Table hover responsive className="p-3">
            <thead
              className="text-white"
              style={{ backgroundColor: "#0066da" }}
            >
              <tr>
                <th>S.No</th>
                <th>Dropdown Name</th>
                <th>Created On</th>
                <th>Created by</th>
                <th>Status</th>
                <th>View & Edit</th>
              </tr>
            </thead>
            <tbody>
              {dropdowns.map((dropdown, index) => (
                <tr key={dropdown.id} className="align-middle">
                  <td style={{ padding: "12px 8px" }}>{index + 1}</td>
                  <td style={{ padding: "12px 8px" }}>{dropdown.name}</td>
                  <td style={{ padding: "12px 8px" }}>{dropdown.createdOn}</td>
                  <td style={{ padding: "12px 8px" }}>{dropdown.createdBy}</td>
                  <td>
                    <span className="status-badge">{dropdown.status}</span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <FaEye
                      style={{ cursor: "pointer", fontSize: "1.2rem" }}
                      onClick={() => handleEditClick(dropdown.path, dropdown.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Render the modal when showModal is true */}
      {showModal && (
        <div className="modal-blur-background">
          <AppAdminDropdownOption 
            showModal={showModal}
            onClose={() => setShowModal(false)}
            dropdownName={selectedDropdown}
          />
        </div>
      )}
    </>
  );
};

export default AppAdminDropdown;