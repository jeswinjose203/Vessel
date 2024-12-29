import React, { useEffect, useState } from 'react';
import './RegisteredOwners.css'; // CSS for styling

const RegisteredOwners = () => {
  const [vesselData, setVesselData] = useState([]);
  const [owners, setOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editVessel, setEditVessel] = useState(null); // State for editing a vessel
  const [newOwner, setNewOwner] = useState(''); // State for adding a new owner

  useEffect(() => {
    // Fetch vessel data from the JSON file
    fetch('/static/vesselData.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);
        const uniqueOwners = [...new Set(data.map((vessel) => vessel.registered_owner_name))];
        setOwners(uniqueOwners);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleOwnerClick = (owner) => {
    setSelectedOwner(owner);
    const filtered = vesselData.filter((vessel) => vessel.registered_owner_name === owner);
    setFilteredVessels(filtered);
  };

  const handleEditClick = (vessel) => {
    setEditVessel(vessel); // Set the vessel to be edited
  };

  const handleEditChange = (field, value) => {
    setEditVessel({ ...editVessel, [field]: value });
  };

  const saveVesselChanges = () => {
    const updatedOwner = editVessel.registered_owner_name;

    setVesselData((prevData) => {
      const updatedData = prevData.map((vessel) =>
        vessel.id === editVessel.id ? editVessel : vessel
      );

      // Add the new owner to the list if it doesn't already exist
      if (!owners.includes(updatedOwner)) {
        setOwners([...owners, updatedOwner]);
      }

      return updatedData;
    });

    // Re-filter vessels for the selected owner
    if (selectedOwner === updatedOwner) {
      setFilteredVessels((prevData) =>
        prevData.map((vessel) =>
          vessel.id === editVessel.id ? editVessel : vessel
        )
      );
    } else {
      handleOwnerClick(selectedOwner); // Refresh the filtered list
    }

    setEditVessel(null); // Exit edit mode
  };

  const handleAddOwner = () => {
    if (newOwner && !owners.includes(newOwner)) {
      setOwners([...owners, newOwner]);
      setNewOwner('');
    }
  };

  return (
    <div className="ro-container">
      <h1 className="header">Registered Owners</h1>
      <div className="ro-content">
        {/* Sidebar */}
        <div className="ro-sidebar">
          <h3>Available Owners</h3>
          <ul className="ro-list">
            {owners.map((owner, index) => (
              <li
                key={index}
                className={`ro-item ${owner === selectedOwner ? 'active' : ''}`}
                onClick={() => handleOwnerClick(owner)}
              >
                {owner}
              </li>
            ))}
          </ul>
          <div className="add-owner">
            <input
              type="text"
              placeholder="Add New Owner"
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
            />
            <button onClick={handleAddOwner}>Add</button>
          </div>
        </div>

        {/* Vessel Details Section */}
        <div className="ro-details">
          {selectedOwner ? (
            <div>
              <h2>Vessels Owned by {selectedOwner}</h2>
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
                          value={editVessel.port_of_registry}
                          onChange={(e) =>
                            handleEditChange('port_of_registry', e.target.value)
                          }
                        />
                        <select
                          value={editVessel.registered_owner_name}
                          onChange={(e) =>
                            handleEditChange('registered_owner_name', e.target.value)
                          }
                        >
                          {owners.map((owner, index) => (
                            <option key={index} value={owner}>
                              {owner}
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
                          <strong>Port of Registry:</strong>{' '}
                          {vessel.port_of_registry}
                        </p>
                        <p>
                          <strong>Owner:</strong> {vessel.registered_owner_name}
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
              Select a registered owner from the sidebar to view their vessels.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredOwners;
