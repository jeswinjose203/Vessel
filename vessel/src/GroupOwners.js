import React, { useEffect, useState } from 'react';
import './GroupOwners.css'; // CSS for styling

const GroupOwners = () => {
  const [vesselData, setVesselData] = useState([]);
  const [groupOwners, setGroupOwners] = useState([]);
  const [selectedGroupOwner, setSelectedGroupOwner] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editVessel, setEditVessel] = useState(null); // State for editing a vessel
  const [newGroupOwner, setNewGroupOwner] = useState(''); // State for adding a new group owner

  useEffect(() => {
    // Fetch vessel data from the JSON file
    fetch('/static/vesselData.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);
        const uniqueGroupOwners = [...new Set(data.map((vessel) => vessel.group_owner_name))];
        setGroupOwners(uniqueGroupOwners);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleGroupOwnerClick = (groupOwner) => {
    setSelectedGroupOwner(groupOwner);
    const filtered = vesselData.filter((vessel) => vessel.group_owner_name === groupOwner);
    setFilteredVessels(filtered);
  };

  const handleEditClick = (vessel) => {
    setEditVessel(vessel); // Set the vessel to be edited
  };

  const handleEditChange = (field, value) => {
    setEditVessel({ ...editVessel, [field]: value });
  };

  const saveVesselChanges = () => {
    const updatedGroupOwner = editVessel.group_owner_name;

    setVesselData((prevData) => {
      const updatedData = prevData.map((vessel) =>
        vessel.id === editVessel.id ? editVessel : vessel
      );

      // Add the new group owner to the list if it doesn't already exist
      if (!groupOwners.includes(updatedGroupOwner)) {
        setGroupOwners([...groupOwners, updatedGroupOwner]);
      }

      return updatedData;
    });

    // Re-filter vessels for the selected group owner
    if (selectedGroupOwner === updatedGroupOwner) {
      setFilteredVessels((prevData) =>
        prevData.map((vessel) =>
          vessel.id === editVessel.id ? editVessel : vessel
        )
      );
    } else {
      handleGroupOwnerClick(selectedGroupOwner); // Refresh the filtered list
    }

    setEditVessel(null); // Exit edit mode
  };

  const handleAddGroupOwner = () => {
    if (newGroupOwner && !groupOwners.includes(newGroupOwner)) {
      setGroupOwners([...groupOwners, newGroupOwner]);
      setNewGroupOwner('');
    }
  };

  return (
    <div className="go-container">
      <h1 className="header">Group Owners</h1>
      <div className="go-content">
        {/* Sidebar */}
        <div className="go-sidebar">
          <h3>Available Group Owners</h3>
          <ul className="go-list">
            {groupOwners.map((groupOwner, index) => (
              <li
                key={index}
                className={`go-item ${groupOwner === selectedGroupOwner ? 'active' : ''}`}
                onClick={() => handleGroupOwnerClick(groupOwner)}
              >
                {groupOwner}
              </li>
            ))}
          </ul>
          <div className="add-group-owner">
            <input
              type="text"
              placeholder="Add New Group Owner"
              value={newGroupOwner}
              onChange={(e) => setNewGroupOwner(e.target.value)}
            />
            <button onClick={handleAddGroupOwner}>Add</button>
          </div>
        </div>

        {/* Vessel Details Section */}
        <div className="go-details">
          {selectedGroupOwner ? (
            <div>
              <h2>Vessels Owned by {selectedGroupOwner}</h2>
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
                          value={editVessel.group_owner_name}
                          onChange={(e) =>
                            handleEditChange('group_owner_name', e.target.value)
                          }
                        >
                          {groupOwners.map((groupOwner, index) => (
                            <option key={index} value={groupOwner}>
                              {groupOwner}
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
                          <strong>Group Owner:</strong> {vessel.group_owner_name}
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
              Select a group owner from the sidebar to view their vessels.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupOwners;
