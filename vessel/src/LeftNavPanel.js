import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faDatabase, faWrench, faBars } from '@fortawesome/free-solid-svg-icons';
import './LeftNavPanel.css';
import shipLogo from './ship_logo.jpg';

const LeftNavPanel = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // For toggle menu

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`left-nav-panel ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="logo">
        <img src={shipLogo} alt="Logo" className="logo-img" />
        <h1>VMS</h1>
      </div>
      <ul className="nav-list">
        <li>
          <NavLink
            to="/vessel"
            className={({ isActive }) => (isActive ? 'active' : '')} // Adds `active` class based on route
          >
            <div className="icon-container">
              <FontAwesomeIcon icon={faShip} className="icon" />
              <span className="nav-text">Vessel</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/master-data"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <div className="icon-container">
              <FontAwesomeIcon icon={faDatabase} className="icon" />
              <span className="nav-text">Master Data</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/fleet-management"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <div className="icon-container">
              <FontAwesomeIcon icon={faWrench} className="icon" />
              <span className="nav-text">Fleet Management</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LeftNavPanel;
