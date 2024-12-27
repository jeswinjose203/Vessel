import React, { useState } from 'react';
import VesselType from './VesselType'; // Import the corresponding components
import VesselSubtypes from './vesselSubtypes';
import Flags from './Flags';
import PortOfRegistries from './PortOfRegistries'; // Example: New component imports
import RegisteredOwners from './RegisteredOwners';
import GroupOwners from './GroupOwners';
import ShipBuilders from './ShipBuilders';
import EngineMakes from './EngineMakes';
import './MasterDataPanel.css';

const MasterDataPanel = ({ open, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null); // State to track selected sidebar option

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  return (
    <div className={`master-data-panel ${open ? 'open' : ''}`}>
      {/* Header Section */}
      <div className="panel-header">
        <h2>Master Data</h2>
        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </div>

      <div className="panel-body">
        {/* Sidebar Section */}
        <div className="sidebar">
          <ul>
            <li onClick={() => handleOptionClick('vesselType')}>Vessel Type</li>
            <li onClick={() => handleOptionClick('vesselSubtypes')}>Vessel Subtypes</li>
            <li onClick={() => handleOptionClick('flags')}>Flags</li>
            <li onClick={() => handleOptionClick('portOfRegistries')}>Port of Registries (POR)</li>
            <li onClick={() => handleOptionClick('registeredOwners')}>Registered Owners</li>
            <li onClick={() => handleOptionClick('groupOwners')}>Group Owners</li>
            <li onClick={() => handleOptionClick('shipBuilders')}>Ship Builders</li>
            <li onClick={() => handleOptionClick('engineMakes')}>Engine Makes</li>
          </ul>
        </div>

        {/* Main Content Section */}
        <div className="content">
          {selectedOption === 'vesselType' && <VesselType />}
          {selectedOption === 'vesselSubtypes' && <VesselSubtypes />}
          {selectedOption === 'flags' && <Flags />}
          {selectedOption === 'portOfRegistries' && <PortOfRegistries />}
          {selectedOption === 'registeredOwners' && <RegisteredOwners />}
          {selectedOption === 'groupOwners' && <GroupOwners />}
          {selectedOption === 'shipBuilders' && <ShipBuilders />}
          {selectedOption === 'engineMakes' && <EngineMakes />}
          {!selectedOption && (
            <p>Select an option from the sidebar to view or manage its details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterDataPanel;

