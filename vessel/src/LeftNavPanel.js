import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faDatabase, faWrench } from '@fortawesome/free-solid-svg-icons';
import './LeftNavPanel.css';
import shipLogo from './ship_logo.jpg';

const LeftNavPanel = () => {
  const [activeItem, setActiveItem] = useState('vessel'); // Default active item

  const handleItemClick = (item) => {
    setActiveItem(item); // Set the clicked item as active
  };

  return (
    <div className="left-nav-panel">
      <div className="logo">
        <img src={shipLogo} alt="Logo" className="logo-img" />
      </div>
      <ul className="nav-list">
        <li
          className={activeItem === 'vessel' ? 'active' : ''}
          onClick={() => handleItemClick('vessel')}
        >
          <a href="vessel">
            <div className="icon-container">
              <FontAwesomeIcon icon={faShip} className="icon" />
              <span className="nav-text">Vessel</span>
            </div>
          </a>
        </li>
        <li
          className={activeItem === 'master-data' ? 'active' : ''}
          onClick={() => handleItemClick('master-data')}
        >
          <a href="master-data">
            <div className="icon-container">
              <FontAwesomeIcon icon={faDatabase} className="icon" />
              <span className="nav-text">Master Data</span>
            </div>
          </a>
        </li>
        <li
          className={activeItem === 'fleet-management' ? 'active' : ''}
          onClick={() => handleItemClick('fleet-management')}
        >
          <a href="fleet-management">
            <div className="icon-container">
              <FontAwesomeIcon icon={faWrench} className="icon" />
              <span className="nav-text">Fleet Management</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LeftNavPanel;
