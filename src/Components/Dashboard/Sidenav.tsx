"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icon Props
interface IconProps {
  className?: string;
}

// SVG Icons
const DashboardIcon = ({ className }: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

const BookIcon = ({ className }: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
  </svg>
);

const GraduationIcon = ({ className }: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
  </svg>
);

const BuildingIcon = ({ className }: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 512 512" fill="currentColor" className={className}>
    <path d="M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9v57.1c0 70.7-57.3 128-128 128s-128-57.3-128-128v-57.1L48 93.3v65.1l15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9h-32c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4v-71.8C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6z" />
  </svg>
);

const UsersIcon = ({ className }: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4 4h16v16H4V4zm2 2v4h4V6H6zm0 6v4h4v-4H6zm6-6v4h4V6h-4zm0 6v4h4v-4h-4z" />
  </svg>
);

const SettingsIcon = ({ className }: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87c-0.12,0.21-0.07,0.47,0.13,0.61l2.03,1.58c-0.05,0.3-0.07,0.62-0.07,0.94s0.02,0.64,0.07,0.94L2.86,14.5c-0.2,0.14-0.25,0.4-0.13,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.04,0.24,0.24,0.41,0.47,0.41h3.84c0.24,0,0.44-0.17,0.48-0.41l0.36-2.54c0.59-0.24,1.12-0.56,1.62-0.94l2.39,0.96c0.22,0.07,0.47,0,0.59-0.22l1.92-3.32c0.12-0.21,0.07-0.47-0.13-0.61L19.14,12.94zM12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
  </svg>
);

const ChevronRightIcon = ({ className }: IconProps) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

const GraduationCapIcon = ({ className }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
  </svg>
);

// Props
interface SidenavProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const Sidenav = ({ activeItem = "dashboard", onItemClick }: SidenavProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>("program-management");
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
    { id: "program-management", label: "Program Management", icon: BookIcon, path: "/program-management", subItems: [] },
    { id: "course-catalog", label: "Course Catalog", icon: GraduationIcon, path: "/course-catalog" },
    { id: "colleges", label: "Placements", icon: BuildingIcon, path: "/colleges" },
    { id: "instructors", label: "Grade & Rubrics", icon: UsersIcon, path: "/instructors" },
    { id: "settings", label: "Settings", icon: SettingsIcon, path: "/master-pipeline" },
  ];

  const handleItemClick = (itemId: string, path: string) => {
    setCollapsed(true);
    if (onItemClick) onItemClick(itemId);
    setExpandedItem(itemId === expandedItem ? null : itemId);
    navigate(path);
  };

  return (
    <div
      style={{ ...sidebarStyles.sidebar, width: collapsed ? "70px" : "240px" }}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <div style={sidebarStyles.sidebarHeader}>
        <div style={sidebarStyles.sidebarLogo}>
          <div style={sidebarStyles.logoIcon}>
            <GraduationCapIcon />
          </div>
          {!collapsed && (
            <div style={sidebarStyles.logoText}>
              <div style={sidebarStyles.logoTitle}>Injex</div>
              <div style={sidebarStyles.logoSubtitle}>Admin Portal</div>
            </div>
          )}
        </div>
      </div>

      <nav style={sidebarStyles.sidebarNav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          const isExpanded = expandedItem === item.id;

          return (
            <div key={item.id} style={sidebarStyles.navItemContainer}>
              <div
                style={{
                  ...sidebarStyles.navItem,
                  ...(isActive ? sidebarStyles.navItemActive : {}),
                }}
                onClick={() => handleItemClick(item.id, item.path)}
              >
                <div style={sidebarStyles.navItemContent}>
                  <Icon className="nav-icon" />
                  {!collapsed && <span style={sidebarStyles.navLabel}>{item.label}</span>}
                </div>
                {!collapsed && item.subItems && (
                  <ChevronRightIcon className={`nav-chevron ${isExpanded ? "expanded" : ""}`} />
                )}
              </div>
            </div>
          );
        })}
      </nav>

      <div style={sidebarStyles.sidebarFooter}>
        <div style={sidebarStyles.logoutContainer}>
          <span style={sidebarStyles.logoutText}>Log Out</span>
        </div>
        {!collapsed && (
          <div style={sidebarStyles.footerBottomRow}>
            <div style={sidebarStyles.footerIconText}>
              <span style={sidebarStyles.icon}>©</span>
              <span style={sidebarStyles.footerLabel}>Copyrights</span>
            </div>
            <div style={sidebarStyles.footerIconText}>
              <span style={sidebarStyles.icon}>❓</span>
              <span style={sidebarStyles.footerLabel}>Help</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const sidebarStyles = {
  sidebar: {
    minHeight: "100vh",
    background: "#fff",
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column" as const,
    flexShrink: 0,
    gap: "30px",
    transition: "width 0.3s ease",
  },
  sidebarHeader: {
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
  },
  sidebarLogo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoIcon: {
    width: "32px",
    height: "32px",
    background: "#ffc000",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
  },
  logoText: {
    display: "flex",
    flexDirection: "column" as const,
  },
  logoTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
    lineHeight: "1.2",
  },
  logoSubtitle: {
    fontSize: "12px",
    color: "#6b7280",
    lineHeight: "1.2",
  },
  sidebarNav: {
    flex: 1,
    padding: "10px 0",
    overflowY: "auto" as const,
  },
  navItemContainer: {
    marginBottom: "10px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 14px",
    margin: "0 8px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: "#6b7280",
  },
  navItemActive: {
    background: "#ffc000",
    color: "#000",
    fontWeight: "600",
  },
  navItemContent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  navLabel: {
    fontSize: "13px",
    fontWeight: "500",
  },
  sidebarFooter: {
    padding: "10px 14px",
    borderTop: "1px solid #e5e7eb",
    marginTop: "auto",
  },
  logoutContainer: {
    textAlign: "center" as const,
    marginBottom: "10px",
  },
  logoutText: {
    fontWeight: "bold",
    fontSize: "13px",
    textDecoration: "underline",
    cursor: "pointer",
  },
  footerBottomRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  footerIconText: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    color: "#374151",
    cursor: "pointer",
  },
  icon: {
    fontSize: "14px",
  },
  footerLabel: {
    fontSize: "12px",
  },
};

export default Sidenav;
