import React, { useEffect, useState } from 'react';
import './PortOfRegistries.css'; // CSS for styling

const PortOfRegistries = () => {
  const [vesselData, setVesselData] = useState([]);
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editVessel, setEditVessel] = useState(null); // State for editing a vessel

  useEffect(() => {
    // Fetch vessel data from the API
    fetch('http://localhost:5009/vesseldata/portofregistrys') // Replace with your API endpoint
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
    setEditVessel(null); // Exit edit mode
  };

  const handleEditClick = (vessel) => {
    setEditVessel(vessel); // Set the vessel to be edited
  };

  const handleEditChange = (field, value) => {
    setEditVessel({ ...editVessel, [field]: value });
  };

  const saveVesselChanges = () => {
    fetch(`http://localhost:5009/vesseldata/portofregistrys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editVessel),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to save vessel changes');
        return response.json();
      })
      .then((updatedVessel) => {
        // Update the local state with the updated vessel data
        setVesselData((prevData) =>
          prevData.map((vessel) =>
            vessel.id === updatedVessel.id ? updatedVessel : vessel
          )
        );

        setFilteredVessels((prevData) =>
          prevData.map((vessel) =>
            vessel.id === updatedVessel.id ? updatedVessel : vessel
          )
        );

        setEditVessel(null); // Exit edit mode
      })
      .catch((error) => console.error('Error saving vessel changes:', error));
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

        {/* Vessel Master Data Section */}
        <div className="por-details">
          {selectedPort ? (
            <div>
              <h2>Vessels Registered at {selectedPort}</h2>
              <div className="vessel-card-container">
                {filteredVessels.map((vessel) => (
                  <div key={vessel.id} className="vessel-card">
                    {editVessel?.id === vessel.id ? (
                      <div className="edit-form">
                        <div className="field">
                          <label>Owner:</label>
                          <input
                            type="text"
                            value={editVessel.owner || ''}
                            onChange={(e) =>
                              handleEditChange('owner', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Operator:</label>
                          <input
                            type="text"
                            value={editVessel.operator || ''}
                            onChange={(e) =>
                              handleEditChange('operator', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Classification Society:</label>
                          <input
                            type="text"
                            value={editVessel.classification_society || ''}
                            onChange={(e) =>
                              handleEditChange(
                                'classification_society',
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Gross Tonnage:</label>
                          <input
                            type="number"
                            value={editVessel.gross_tonnage || ''}
                            onChange={(e) =>
                              handleEditChange('gross_tonnage', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Net Tonnage:</label>
                          <input
                            type="number"
                            value={editVessel.net_tonnage || ''}
                            onChange={(e) =>
                              handleEditChange('net_tonnage', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Year Built:</label>
                          <input
                            type="number"
                            value={editVessel.year_built || ''}
                            onChange={(e) =>
                              handleEditChange('year_built', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Home Port:</label>
                          <input
                            type="text"
                            value={editVessel.home_port || ''}
                            onChange={(e) =>
                              handleEditChange('home_port', e.target.value)
                            }
                          />
                        </div>
                        <button onClick={saveVesselChanges}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <h3>{vessel.vessel_name}</h3>
                        <p>
                          <strong>Owner:</strong> {vessel.owner}
                        </p>
                        <p>
                          <strong>Operator:</strong> {vessel.operator}
                        </p>
                        <p>
                          <strong>Classification Society:</strong>{' '}
                          {vessel.classification_society}
                        </p>
                        <p>
                          <strong>Gross Tonnage:</strong> {vessel.gross_tonnage}
                        </p>
                        <p>
                          <strong>Net Tonnage:</strong> {vessel.net_tonnage}
                        </p>
                        <p>
                          <strong>Year Built:</strong> {vessel.year_built}
                        </p>
                        <p>
                          <strong>Home Port:</strong> {vessel.home_port}
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
              Select a port from the sidebar to view its vessels.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortOfRegistries;
