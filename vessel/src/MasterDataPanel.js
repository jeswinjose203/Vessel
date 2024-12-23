import React from 'react';
import './MasterDataPanel.css';

const MasterDataPanel = ({ open, onClose }) => {
  return (
    <div className={`master-data-panel ${open ? 'open' : ''}`}>
      <div className="panel-header">
        <h2>Master Data</h2>
        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </div>
      <div className="panel-content">
        {/* Add your Master Data content here */}
        <p>Master Data details go here...</p>
      </div>
    </div>
  );
};

export default MasterDataPanel;
