import React, { useEffect, useState } from 'react';
import './EngineTypesAndPower.css'; // CSS for styling

const EngineMakes = () => {
  const [vesselData, setVesselData] = useState([]);
  const [engineTypes, setEngineTypes] = useState([]);
  const [selectedEngineType, setSelectedEngineType] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [selectedPowerRange, setSelectedPowerRange] = useState(null);
  const [editVessel, setEditVessel] = useState(null); // Track vessel being edited
  const [newEngineType, setNewEngineType] = useState(''); // For adding new Engine Types
  const [newPowerRange, setNewPowerRange] = useState(''); // For adding new Power Range

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

  const handleEditClick = (vessel) => {
    setEditVessel({ ...vessel }); // Clone the vessel data for editing
  };

  const handleEditChange = (field, value) => {
    setEditVessel((prevVessel) => ({
      ...prevVessel,
      [field]: value,
    }));
  };

  const saveVesselChanges = () => {
    setVesselData((prevData) => {
      const updatedData = prevData.map((vessel) =>
        vessel.id === editVessel.id ? editVessel : vessel
      );
      return updatedData;
    });

    // If the engine type was changed, update the engine types list
    if (!engineTypes.includes(editVessel.EngineType)) {
      setEngineTypes((prevTypes) => [...prevTypes, editVessel.EngineType]);
    }

    setEditVessel(null); // Exit editing mode
    handleEngineTypeClick(selectedEngineType); // Refresh the filtered vessels
  };

  const handleAddEngineType = () => {
    if (newEngineType && !engineTypes.includes(newEngineType)) {
      setEngineTypes((prevTypes) => [...prevTypes, newEngineType]);
      setNewEngineType(''); // Clear the input field
    }
  };

  const handleAddPowerRange = () => {
    if (newPowerRange && !['0-20000', '20001-40000', '40001-60000', '60001-80000', '80001-100000'].includes(newPowerRange)) {
      // Add to the static list if it's not already in the list
      setSelectedPowerRange(newPowerRange); // Select the newly added range
      setNewPowerRange(''); // Clear the input field
    }
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
          <div className="add-engine-type">
            <input
              type="text"
              value={newEngineType}
              placeholder="Add new Engine Type"
              onChange={(e) => setNewEngineType(e.target.value)}
            />
            <button onClick={handleAddEngineType}>Add Engine Type</button>
          </div>

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
          <div className="add-power-range">
            <input
              type="text"
              value={newPowerRange}
              placeholder="Add new Power Range"
              onChange={(e) => setNewPowerRange(e.target.value)}
            />
            <button onClick={handleAddPowerRange}>Add Power Range</button>
          </div>
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
                    {editVessel?.id === vessel.id ? (
                      <div>
                        {/* Editable Fields */}
                        <input
                          type="text"
                          value={editVessel.vessel_name}
                          onChange={(e) =>
                            handleEditChange('vessel_name', e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.imo_number}
                          onChange={(e) =>
                            handleEditChange('imo_number', e.target.value)
                          }
                        />
                        <select
                          value={editVessel.EngineType}
                          onChange={(e) =>
                            handleEditChange('EngineType', e.target.value)
                          }
                        >
                          {engineTypes.map((engineType, index) => (
                            <option key={index} value={engineType}>
                              {engineType}
                            </option>
                          ))}
                          <option value="">Other</option>
                        </select>
                        <input
                          type="number"
                          value={editVessel.EnginePower}
                          onChange={(e) =>
                            handleEditChange('EnginePower', e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.vessel_type}
                          onChange={(e) =>
                            handleEditChange('vessel_type', e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.status}
                          onChange={(e) =>
                            handleEditChange('status', e.target.value)
                          }
                        />
                        <button onClick={saveVesselChanges}>Save</button>
                      </div>
                    ) : (
                      <div>
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
                        <button onClick={() => handleEditClick(vessel)}>
                          Edit
                        </button>
                      </div>
                    )}
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
