import React, { useEffect, useState } from 'react';
import './PortOfRegistries.css'; // CSS for styling

const PortOfRegistries = () => {
  const [vesselData, setVesselData] = useState([]);
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState(null);
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
        const uniquePorts = [...new Set(data.map((vessel) => vessel.port_of_registry))];
        setPorts(uniquePorts);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handlePortClick = (port) => {
    setSelectedPort(port);
    const filtered = vesselData.filter((vessel) => vessel.port_of_registry === port);
    setFilteredVessels(filtered);
  };

  return (
    <div className="por-container">
      <h1 className="header">Ports of Registry</h1>
      <div className="por-content">
        {/* Sidebar */}
        <div className="por-sidebar">
          <h3>Available Ports</h3>
          <ul className="por-list">
            {ports.map((port, index) => (
              <li
                key={index}
                className={`por-item ${port === selectedPort ? 'active' : ''}`}
                onClick={() => handlePortClick(port)}
              >
                {port}
              </li>
            ))}
          </ul>
        </div>

        {/* Vessel Details Section */}
        <div className="por-details">
          {selectedPort ? (
            <div>
              <h2>Vessels Registered at {selectedPort}</h2>
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
                      <strong>Flag:</strong> {vessel.flag}
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
              Select a port from the sidebar to view its vessels.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortOfRegistries;
