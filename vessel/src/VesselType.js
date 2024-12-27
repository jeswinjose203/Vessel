import React, { useEffect, useState } from 'react';
import './VesselType.css'; // External CSS file for styling

const VesselType = () => {
  const [vesselData, setVesselData] = useState([]);
  const [vesselTypes, setVesselTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);

  useEffect(() => {
    fetch('/static/vesselData.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);
        const types = [...new Set(data.map((vessel) => vessel.vessel_type))];
        setVesselTypes(types);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    const filtered = vesselData.filter((vessel) => vessel.vessel_type === type);
    setFilteredVessels(filtered);
  };

  return (
    <div className="vessel-container">
      <h1 className="header">Vessel Types</h1>
      <div className="vessel-content">
        {/* Sidebar */}
        <div className="vessel-sidebar">
          <h3>Vessel Types</h3>
          <ul className="vessel-type-list">
            {vesselTypes.map((type, index) => (
              <li
                key={index}
                className={`vessel-type-item ${
                  type === selectedType ? 'active' : ''
                }`}
                onClick={() => handleTypeClick(type)}
              >
                {type}
              </li>
            ))}
          </ul>
        </div>

        {/* Vessel Details Section */}
        <div className="vessel-details">
          {selectedType ? (
            <div>
              <h2>{selectedType} Vessels</h2>
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
                      <strong>Port of Registry:</strong> {vessel.port_of_registry}
                    </p>
                    <p>
                      <strong>Owner:</strong> {vessel.registered_owner_name}
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
              Select a vessel type from the sidebar to view its details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VesselType;
