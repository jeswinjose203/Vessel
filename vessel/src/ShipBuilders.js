import React, { useState, useEffect } from 'react';
import './Shipyards.css'; // CSS for styling

const ShipBuilders = () => {
  const [vesselData, setVesselData] = useState([]);
  const [shipyards, setShipyards] = useState([]);
  const [selectedShipyard, setSelectedShipyard] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editVessel, setEditVessel] = useState(null); // State for editing a vessel
  const [newShipyard, setNewShipyard] = useState(''); // State for adding a new shipyard

  const [editShipyard, setEditShipyard] = useState(null); // For editing shipyard data

  // Fetch shipyard master data
  useEffect(() => {
    fetch("/static/shipbuilder.json")
      .then((response) => response.json())
      .then((data) => {
        setShipyards(data);
      })
      .catch((error) => console.error("Error fetching master data:", error));
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

  // Edit Shipyard details
  const handleEditShipyardChange = (field, value) => {
    setEditShipyard({ ...editShipyard, [field]: value });
  };

  const saveShipyardChanges = () => {
    const updatedShipyards = shipyards.map((shipyard) =>
      shipyard.ShipyardId === editShipyard.ShipyardId ? editShipyard : shipyard
    );
    setShipyards(updatedShipyards);
    setSelectedShipyard(editShipyard);
    setEditShipyard(null);
  };

  return (
    <div className="shipyard-container">
      <h1 className="header">Shipyards</h1>
      <div className="shipyard-content">
        {/* Sidebar */}
        <div className="shipyard-sidebar">
          <h3>Available Shipyards</h3>
          <ul className="shipyard-list">
            {shipyards.map((shipyard) => (
              <li
                key={shipyard.ShipyardId}
                className={`shipyard-item ${shipyard === selectedShipyard ? 'active' : ''}`}
                onClick={() => handleShipyardClick(shipyard)}
              >
                {shipyard.ShipyardName}
              </li>
            ))}
          </ul>
          
        </div>

        {/* Vessel Details Section */}
        <div className="shipyard-details">
          {selectedShipyard ? (
            <div>
              <h2>Shipyard Details: {selectedShipyard.ShipyardName}</h2>
              <div className="vessel-card-container">
                {/* Shipyard editable fields */}
                {editShipyard?.ShipyardId === selectedShipyard.ShipyardId ? (
                  <div className="edit-shipyard-details">
                    <input
                      type="text"
                      value={editShipyard.ShipyardName}
                      onChange={(e) =>
                        handleEditShipyardChange('ShipyardName', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={editShipyard.ShipyardAddress}
                      onChange={(e) =>
                        handleEditShipyardChange('ShipyardAddress', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={editShipyard.Country}
                      onChange={(e) => handleEditShipyardChange('Country', e.target.value)}
                    />
                    <input
                      type="text"
                      value={editShipyard.Region}
                      onChange={(e) => handleEditShipyardChange('Region', e.target.value)}
                    />
                    <input
                      type="text"
                      value={editShipyard.PhoneNumber}
                      onChange={(e) => handleEditShipyardChange('PhoneNumber', e.target.value)}
                    />
                    <input
                      type="email"
                      value={editShipyard.Email}
                      onChange={(e) => handleEditShipyardChange('Email', e.target.value)}
                    />
                    <input
                      type="text"
                      value={editShipyard.Website}
                      onChange={(e) => handleEditShipyardChange('Website', e.target.value)}
                    />
                    <button onClick={saveShipyardChanges}>Save</button>
                  </div>
                ) : (
                  <div className="shipyard-info">
                    <p>
                      <strong>Address:</strong> {selectedShipyard.ShipyardAddress}
                    </p>
                    <p>
                      <strong>Country:</strong> {selectedShipyard.Country}
                    </p>
                    <p>
                      <strong>Region:</strong> {selectedShipyard.Region}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {selectedShipyard.PhoneNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedShipyard.Email}
                    </p>
                    <p>
                      <strong>Website:</strong> {selectedShipyard.Website}
                    </p>
                    <button onClick={() => setEditShipyard(selectedShipyard)}>Edit Shipyard</button>
                  </div>
                )}

                {/* Vessel details (unchanged) */}
                {filteredVessels.map((vessel) => (
                  <div key={vessel.id} className="vessel-card">
                    {editVessel?.id === vessel.id ? (
                      <div>
                        {/* Editable Fields for Vessel */}
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
                        {/* More fields */}
                        <button onClick={saveVesselChanges}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <h3>{vessel.vessel_name}</h3>
                        {/* Other vessel details */}
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
