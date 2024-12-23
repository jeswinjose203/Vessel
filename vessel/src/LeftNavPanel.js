import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faDatabase, faWrench, faBars } from '@fortawesome/free-solid-svg-icons';
import MasterDataPanel from './MasterDataPanel.js'; // Import the new sliding component
import './LeftNavPanel.css';
import shipLogo from './ship_logo.jpg';

const LeftNavPanel = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // For toggle menu
  const [isMasterDataOpen, setIsMasterDataOpen] = useState(false); // For sliding panel

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle the sliding panel
  const toggleMasterDataPanel = () => {
    setIsMasterDataOpen(!isMasterDataOpen);
  };

  return (
    <>
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
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <div className="icon-container">
                <FontAwesomeIcon icon={faShip} className="icon" />
                <span className="nav-text">Vessel</span>
              </div>
            </NavLink>
          </li>
          <li>
            {/* Open sliding panel on click */}
            <div
              className="nav-item"
              onClick={toggleMasterDataPanel}
              style={{ cursor: 'pointer' }}
            >
              <div className="icon-container">
                <FontAwesomeIcon icon={faDatabase} className="icon" />
                <span className="nav-text">Master Data</span>
              </div>
            </div>
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

      {/* Render the sliding panel */}
      <MasterDataPanel open={isMasterDataOpen} onClose={toggleMasterDataPanel} />
    </>
  );
};

export default LeftNavPanel;
