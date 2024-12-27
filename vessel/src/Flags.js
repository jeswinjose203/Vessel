import React, { useEffect, useState } from 'react';
import './Flags.css'; // CSS file for styling

const Flags = () => {
  const [vesselData, setVesselData] = useState([]);
  const [flags, setFlags] = useState([]);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);

  useEffect(() => {
    // Fetch vessel data from the JSON file
    fetch('/static/vesselData.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);
        const uniqueFlags = [...new Set(data.map((vessel) => vessel.flag))];
        setFlags(uniqueFlags);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleFlagClick = (flag) => {
    setSelectedFlag(flag);
    const filtered = vesselData.filter((vessel) => vessel.flag === flag);
    setFilteredVessels(filtered);
  };

  return (
    <div className="flags-container">
      <h1 className="header">Flags</h1>
      <div className="flags-content">
        {/* Sidebar */}
        <div className="flags-sidebar">
          <h3>Available Flags</h3>
          <ul className="flag-list">
            {flags.map((flag, index) => (
              <li
                key={index}
                className={`flag-item ${flag === selectedFlag ? 'active' : ''}`}
                onClick={() => handleFlagClick(flag)}
              >
                {flag}
              </li>
            ))}
          </ul>
        </div>

        {/* Vessel Details Section */}
        <div className="flag-details">
          {selectedFlag ? (
            <div>
              <h2>Vessels under {selectedFlag} Flag</h2>
              <div className="vessel-card-container">
                {filteredVessels.map((vessel) => (
                  <div key={vessel.id} className="vessel-card">
                    <h3>{vessel.vessel_name}</h3>
                    <p>
                      <strong>IMO Number:</strong> {vessel.imo_number}
                    </p>
                    <p>
                      <strong>Vessel Type:</strong> {vessel.vessel_type}
                    </p>
                    <p>
                      <strong>Vessel Subtype:</strong> {vessel.vessel_subtype}
                    </p>
                    <p>
                      <strong>Port of Registry:</strong> {vessel.port_of_registry}
                    </p>
                    <p>
                      <strong>Status:</strong> {vessel.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="placeholder-text">
              Select a flag from the sidebar to view its vessels.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flags;
