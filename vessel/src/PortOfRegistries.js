import React, { useEffect, useState } from 'react';
import './PortOfRegistries.css'; // CSS for styling

const PortOfRegistries = () => {
  const [vesselData, setVesselData] = useState([]);
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editVessel, setEditVessel] = useState(null); // State for editing a vessel
  const [newPort, setNewPort] = useState(''); // State for adding a new port

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

  const handleEditClick = (vessel) => {
    setEditVessel(vessel); // Set the vessel to be edited
  };

  const handleEditChange = (field, value) => {
    setEditVessel({ ...editVessel, [field]: value });
  };

  const saveVesselChanges = () => {
    const updatedPort = editVessel.port_of_registry;

    setVesselData((prevData) => {
      const updatedData = prevData.map((vessel) =>
        vessel.id === editVessel.id ? editVessel : vessel
      );

      // Add the new port to the list of ports if it doesn't already exist
      if (!ports.includes(updatedPort)) {
        setPorts([...ports, updatedPort]);
      }

      return updatedData;
    });

    // Re-filter vessels for the selected port
    if (selectedPort === updatedPort) {
      setFilteredVessels((prevData) =>
        prevData.map((vessel) =>
          vessel.id === editVessel.id ? editVessel : vessel
        )
      );
    } else {
      handlePortClick(selectedPort); // Refresh the filtered list
    }

    setEditVessel(null); // Exit edit mode
  };

  const handleAddPort = () => {
    if (newPort && !ports.includes(newPort)) {
      setPorts([...ports, newPort]);
      setNewPort('');
    }
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
          <div className="add-port">
            <input
              type="text"
              placeholder="Add New Port"
              value={newPort}
              onChange={(e) => setNewPort(e.target.value)}
            />
            <button onClick={handleAddPort}>Add</button>
          </div>
        </div>

        {/* Vessel Details Section */}
        <div className="por-details">
          {selectedPort ? (
            <div>
              <h2>Vessels Registered at {selectedPort}</h2>
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
                          value={editVessel.vessel_subtype}
                          onChange={(e) =>
                            handleEditChange('vessel_subtype', e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.flag}
                          onChange={(e) => handleEditChange('flag', e.target.value)}
                        />
                        <select
                          value={editVessel.port_of_registry}
                          onChange={(e) =>
                            handleEditChange('port_of_registry', e.target.value)
                          }
                        >
                          {ports.map((port, index) => (
                            <option key={index} value={port}>
                              {port}
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
                          <strong>Vessel Subtype:</strong> {vessel.vessel_subtype}
                        </p>
                        <p>
                          <strong>Flag:</strong> {vessel.flag}
                        </p>
                        <p>
                          <strong>Port of Registry:</strong>{' '}
                          {vessel.port_of_registry}
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
              Select a port from the sidebar to view its vessels.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortOfRegistries;
