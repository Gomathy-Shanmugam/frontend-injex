import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MasterNavbar.css';
import MasterPipeline from './MaterPipeline';

const MasterNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const menuItems = [
    { label: 'Analytics', path: '/settings/analytics' },
    { label: 'Course Settings', path: '/settings/course-settings' },
    { label: 'Masters', path: '/master-pipeline' }, // stays on same page
  ];

  const handleClick = (item: { label: string; path: string }) => {
    if (item.path !== '#') {
      navigate(item.path);
      setActivePath(item.path);
    } else {
      setActivePath('masters'); // custom for staying on same page
    }
  };

  return (
    <div className="master-navbar p-3">
      <div
        className="mb-3 cursor-pointer text-muted"
        onClick={() => navigate('/dashboard')}
      >
        ← Dashboard
      </div>
      <h5 className="fw-bold mb-4">Settings</h5>

      <ul className="list-unstyled">
        {menuItems.map((item) => {
          const isActive =
            activePath === item.path || (item.label === 'Masters' && activePath === 'masters');

          return (
            <li
              key={item.label}
              className={`sidebar-link py-2 px-3 ${isActive ? 'active' : ''}`}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MasterNavbar;
