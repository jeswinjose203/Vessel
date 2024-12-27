import React, { useEffect, useState } from 'react';
import './Shipyards.css'; // CSS for styling

const ShipBuilders = () => {
  const [vesselData, setVesselData] = useState([]);
  const [shipyards, setShipyards] = useState([]);
  const [selectedShipyard, setSelectedShipyard] = useState(null);
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
        const uniqueShipyards = [...new Set(data.map((vessel) => vessel.Shipyard))];
        setShipyards(uniqueShipyards);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleShipyardClick = (shipyard) => {
    setSelectedShipyard(shipyard);
    const filtered = vesselData.filter((vessel) => vessel.Shipyard === shipyard);
    setFilteredVessels(filtered);
  };

  return (
    <div className="shipyard-container">
      <h1 className="header">Shipyards</h1>
      <div className="shipyard-content">
        {/* Sidebar */}
        <div className="shipyard-sidebar">
          <h3>Available Shipyards</h3>
          <ul className="shipyard-list">
            {shipyards.map((shipyard, index) => (
              <li
                key={index}
                className={`shipyard-item ${shipyard === selectedShipyard ? 'active' : ''}`}
                onClick={() => handleShipyardClick(shipyard)}
              >
                {shipyard}
              </li>
            ))}
          </ul>
        </div>

        {/* Vessel Details Section */}
        <div className="shipyard-details">
          {selectedShipyard ? (
            <div>
              <h2>Vessels Built at {selectedShipyard}</h2>
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
                      <strong>Build Year:</strong> {vessel.BuildYear}
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
              Select a shipyard from the sidebar to view vessels built there.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipBuilders;
