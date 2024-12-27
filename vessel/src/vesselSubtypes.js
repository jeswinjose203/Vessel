import React, { useEffect, useState } from 'react';
import './VesselSubtypes.css'; // CSS file for styling

const VesselSubtypes = () => {
  const [vesselData, setVesselData] = useState([]);
  const [vesselSubtypes, setVesselSubtypes] = useState([]);
  const [selectedSubtype, setSelectedSubtype] = useState(null);
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
        const subtypes = [...new Set(data.map((vessel) => vessel.vessel_subtype))];
        setVesselSubtypes(subtypes);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleSubtypeClick = (subtype) => {
    setSelectedSubtype(subtype);
    const filtered = vesselData.filter((vessel) => vessel.vessel_subtype === subtype);
    setFilteredVessels(filtered);
  };

  return (
    <div className="vessel-subtype-container">
      <h1 className="header">Vessel Subtypes</h1>
      <div className="vessel-content">
        {/* Sidebar */}
        <div className="vessel-sidebar">
          <h3>Vessel Subtypes</h3>
          <ul className="vessel-subtype-list">
            {vesselSubtypes.map((subtype, index) => (
              <li
                key={index}
                className={`vessel-subtype-item ${
                  subtype === selectedSubtype ? 'active' : ''
                }`}
                onClick={() => handleSubtypeClick(subtype)}
              >
                {subtype}
              </li>
            ))}
          </ul>
        </div>

        {/* Vessel Details Section */}
        <div className="vessel-details">
          {selectedSubtype ? (
            <div>
              <h2>{selectedSubtype} Vessels</h2>
              <div className="vessel-card-container">
                {filteredVessels.map((vessel) => (
                  <div key={vessel.id} className="vessel-card">
                    <h3>{vessel.vessel_name}</h3>
                    <p>
                      <strong>IMO Number:</strong> {vessel.imo_number}
                    </p>
                    <p>
                      <strong>Flag:</strong> {vessel.flag}
                    </p>
                    <p>
                      <strong>Vessel Type:</strong> {vessel.vessel_type}
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
              Select a vessel subtype from the sidebar to view its details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VesselSubtypes;
