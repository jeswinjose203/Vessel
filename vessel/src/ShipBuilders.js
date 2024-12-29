import React, { useEffect, useState } from 'react';
import './Shipyards.css'; // CSS for styling

const ShipBuilders = () => {
  const [vesselData, setVesselData] = useState([]);
  const [shipyards, setShipyards] = useState([]);
  const [selectedShipyard, setSelectedShipyard] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editVessel, setEditVessel] = useState(null); // State for editing a vessel
  const [newShipyard, setNewShipyard] = useState(''); // State for adding a new shipyard

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

  const handleEditClick = (vessel) => {
    setEditVessel(vessel); // Set the vessel to be edited
  };

  const handleEditChange = (field, value) => {
    setEditVessel({ ...editVessel, [field]: value });
  };

  const saveVesselChanges = () => {
    const updatedShipyard = editVessel.Shipyard;

    setVesselData((prevData) => {
      const updatedData = prevData.map((vessel) =>
        vessel.id === editVessel.id ? editVessel : vessel
      );

      // Add the new shipyard to the list if it doesn't already exist
      if (!shipyards.includes(updatedShipyard)) {
        setShipyards([...shipyards, updatedShipyard]);
      }

      return updatedData;
    });

    // Re-filter vessels for the selected shipyard
    if (selectedShipyard === updatedShipyard) {
      setFilteredVessels((prevData) =>
        prevData.map((vessel) =>
          vessel.id === editVessel.id ? editVessel : vessel
        )
      );
    } else {
      handleShipyardClick(selectedShipyard); // Refresh the filtered list
    }

    setEditVessel(null); // Exit edit mode
  };

  const handleAddShipyard = () => {
    if (newShipyard && !shipyards.includes(newShipyard)) {
      setShipyards([...shipyards, newShipyard]);
      setNewShipyard('');
    }
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
          <div className="add-shipyard">
            <input
              type="text"
              placeholder="Add New Shipyard"
              value={newShipyard}
              onChange={(e) => setNewShipyard(e.target.value)}
            />
            <button onClick={handleAddShipyard}>Add</button>
          </div>
        </div>

        {/* Vessel Details Section */}
        <div className="shipyard-details">
          {selectedShipyard ? (
            <div>
              <h2>Vessels Built at {selectedShipyard}</h2>
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
                        <input
                          type="text"
                          value={editVessel.vessel_type}
                          onChange={(e) =>
                            handleEditChange('vessel_type', e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.BuildYear}
                          onChange={(e) =>
                            handleEditChange('BuildYear', e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.port_of_registry}
                          onChange={(e) =>
                            handleEditChange('port_of_registry', e.target.value)
                          }
                        />
                        <select
                          value={editVessel.Shipyard}
                          onChange={(e) =>
                            handleEditChange('Shipyard', e.target.value)
                          }
                        >
                          {shipyards.map((shipyard, index) => (
                            <option key={index} value={shipyard}>
                              {shipyard}
                            </option>
                          ))}
                          <option value="">Other</option>
                        </select>
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
                          <strong>Vessel Type:</strong> {vessel.vessel_type}
                        </p>
                        <p>
                          <strong>Build Year:</strong> {vessel.BuildYear}
                        </p>
                        <p>
                          <strong>Port of Registry:</strong>{' '}
                          {vessel.port_of_registry}
                        </p>
                        <p>
                          <strong>Shipyard:</strong> {vessel.Shipyard}
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
              Select a shipyard from the sidebar to view vessels built there.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipBuilders;
