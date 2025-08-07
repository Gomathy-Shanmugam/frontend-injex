import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../Common/Topbar";
import MainNav from "../Common/MainNav";
import MasterNav from "./MasterNav";
import { FaChevronRight, FaEye } from "react-icons/fa";
import OptionView from "./OptionView"; // Adjust path if needed

interface DropdownData {
  id: string;
  name: string;
  options: number;
  createdOn: string;
  createdBy: string;
  status: string;
}

const today = new Date().toLocaleDateString("en-GB");
const dummyDropdowns: Record<string, DropdownData[]> = {
  1: [
    {
      id: "role",
      name: "Role Type",
      options: 3,
      createdOn: today,
      createdBy: "Admin",
      status: "Active",
    },
    {
      id: "college",
      name: "College List",
      options: 5,
      createdOn: today,
      createdBy: "Admin",
      status: "Active",
    },
    {
      id: "college",
      name: "College List",
      options: 5,
      createdOn: today,
      createdBy: "Admin",
      status: "Active",
    },
    {
      id: "college",
      name: "College List",
      options: 5,
      createdOn: today,
      createdBy: "Admin",
      status: "Active",
    },
    {
      id: "college",
      name: "College List",
      options: 5,
      createdOn: today,
      createdBy: "Admin",
      status: "Active",
    },
  ],
};

const DropdownView = () => {
  const { moduleId, pipelineId } = useParams();
  const [dropdowns, setDropdowns] = useState<DropdownData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDropdownId, setSelectedDropdownId] = useState<string | null>(
    null
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (moduleId && dummyDropdowns[moduleId]) {
      setDropdowns(dummyDropdowns[moduleId]);
    }
  }, [moduleId]);

  const handleViewClick = (dropdownId: string) => {
    setSelectedDropdownId(dropdownId);
    setShowModal(true);
  };

  return (
    <>
      <TopBar />
      <MainNav />
      <div className="layout-wrapper d-flex flex-nowrap">
        <MasterNav />
        <div className="p-4 w-100">
          {/* <h5 className="mb-5 fw-bold">
            <FaChevronRight className="me-3" />
            Choose the Module
          </h5> */}

          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="fw-bold m-0">
              <FaChevronRight className="me-2" />
              Choose the Dropdown
            </h5>

            <Button variant="secondary" onClick={() => navigate(-1)}>
              ← Back
            </Button>
          </div>

<div className="table-wrapper">
          <Table hover className="dropdown-view">
            <thead>
              <tr className="table-header-row">
                <th>S.No</th>
                <th>Dropdown Name</th>
                <th>CreatedOn</th>
                <th>CreatedBy</th>
                <th>Status</th>
                <th>View & Edit</th>
              </tr>
            </thead>
          <tbody>
  {dropdowns.map((drop, idx) => (
    <tr key={`${drop.id}-${idx}`}>
      <td data-label="S.No">{idx + 1}</td>
      <td data-label="Dropdown Name">{drop.name}</td>
      <td data-label="Created On">{drop.createdOn}</td>
      <td data-label="Created By">{drop.createdBy}</td>
      <td data-label="Status">
        <span className="status-badge">{drop.status}</span>
      </td>
      <td data-label="View & Edit">
        <FaEye
          style={{ cursor: "pointer", fontSize: "1.2rem" }}
          onClick={() => handleViewClick(drop.id)}
        />
      </td>
    </tr>
  ))}
</tbody>

          </Table>
        </div>
        </div>
      </div>

      {/* ✅ Modal Popup for OptionView */}
      {showModal && selectedDropdownId && (
        <OptionView
          dropdownId={selectedDropdownId}
          moduleId={moduleId!}
          pipelineId={pipelineId!}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default DropdownView;
