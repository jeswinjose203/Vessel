import React, { useEffect, useState } from 'react';
import './EngineTypesAndPower.css'; // CSS for styling

const EngineMakes = () => {
  const [vesselData, setVesselData] = useState([]);
  const [engineTypes, setEngineTypes] = useState([]);
  const [selectedEngineType, setSelectedEngineType] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [selectedPowerRange, setSelectedPowerRange] = useState(null);

  useEffect(() => {
    // Fetch vessel data from the JSON file
    fetch('/static/vesselData.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);

        const uniqueEngineTypes = [...new Set(data.map((vessel) => vessel.EngineType))];
        setEngineTypes(uniqueEngineTypes);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleEngineTypeClick = (engineType) => {
    setSelectedEngineType(engineType);
    const filteredByType = vesselData.filter((vessel) => vessel.EngineType === engineType);
    setFilteredVessels(filteredByType);
    setSelectedPowerRange(null); // Reset power range selection
  };

  const handlePowerRangeClick = (range) => {
    setSelectedPowerRange(range);
    const [min, max] = range.split('-').map(Number);
    const filteredByPower = vesselData.filter(
      (vessel) => vessel.EnginePower >= min && vessel.EnginePower <= max
    );
    setFilteredVessels(filteredByPower);
  };

  return (
    <div className="engine-container">
      <h1 className="header">Engine Types and Power</h1>
      <div className="engine-content">
        {/* Sidebar */}
        <div className="engine-sidebar">
          <h3>Engine Types</h3>
          <ul className="engine-list">
            {engineTypes.map((engineType, index) => (
              <li
                key={index}
                className={`engine-item ${engineType === selectedEngineType ? 'active' : ''}`}
                onClick={() => handleEngineTypeClick(engineType)}
              >
                {engineType}
              </li>
            ))}
          </ul>

          <h3>Engine Power Range</h3>
          <ul className="power-list">
            {['0-20000', '20001-40000', '40001-60000', '60001-80000', '80001-100000'].map(
              (range, index) => (
                <li
                  key={index}
                  className={`power-item ${range === selectedPowerRange ? 'active' : ''}`}
                  onClick={() => handlePowerRangeClick(range)}
                >
                  {range} HP
                </li>
              )
            )}
          </ul>
        </div>

        {/* Vessel Details Section */}
        <div className="engine-details">
          {(selectedEngineType || selectedPowerRange) ? (
            <div>
              <h2>
                Vessels with {selectedEngineType && `Engine Type: ${selectedEngineType}`}{" "}
                {selectedPowerRange && `Engine Power Range: ${selectedPowerRange}`}
              </h2>
              <div className="vessel-card-container">
                {filteredVessels.map((vessel) => (
                  <div key={vessel.id} className="vessel-card">
                    <h3>{vessel.vessel_name}</h3>
                    <p>
                      <strong>IMO Number:</strong> {vessel.imo_number}
                    </p>
                    <p>
                      <strong>Engine Type:</strong> {vessel.EngineType}
                    </p>
                    <p>
                      <strong>Engine Power:</strong> {vessel.EnginePower} HP
                    </p>
                    <p>
                      <strong>Vessel Type:</strong> {vessel.vessel_type}
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
              Select an engine type or power range from the sidebar to view vessels.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EngineMakes;
