import React, { useEffect, useState } from 'react';
import './GroupOwners.css'; // Add your own CSS for styling

const GroupOwners = () => {
  const [vesselData, setVesselData] = useState([]);
  const [groupOwners, setGroupOwners] = useState([]);
  const [selectedGroupOwner, setSelectedGroupOwner] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editVessel, setEditVessel] = useState(null); // State for editing a vessel

  useEffect(() => {
    // Fetch vessel data from the JSON file
    fetch('/static/groupowner.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);
        const uniqueGroupOwners = [
          ...new Set(data.map((vessel) => vessel.GroupOwner.GroupOwnerName)),
        ];
        setGroupOwners(uniqueGroupOwners);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleGroupOwnerClick = (groupOwner) => {
    setSelectedGroupOwner(groupOwner);
    const filtered = vesselData.filter(
      (vessel) => vessel.GroupOwner.GroupOwnerName === groupOwner
    );
    setFilteredVessels(filtered);
  };

  const handleEditClick = (vessel) => {
    setEditVessel(vessel); // Set the vessel to be edited
  };

  const handleEditChange = (field, value) => {
    setEditVessel({ ...editVessel, [field]: value });
  };

  const saveVesselChanges = () => {
    setVesselData((prevData) =>
      prevData.map((vessel) =>
        vessel.VesselId === editVessel.VesselId ? editVessel : vessel
      )
    );
    setFilteredVessels((prevData) =>
      prevData.map((vessel) =>
        vessel.VesselId === editVessel.VesselId ? editVessel : vessel
      )
    );
    setEditVessel(null); // Exit edit mode
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
                className={`go-item ${
                  groupOwner === selectedGroupOwner ? 'active' : ''
                }`}
                onClick={() => handleGroupOwnerClick(groupOwner)}
              >
                {groupOwner}
              </li>
            ))}
          </ul>
        </div>

        {/* Vessel Details Section */}
        <div className="go-details">
          {selectedGroupOwner ? (
            <div>
              <h2>Vessels Owned by {selectedGroupOwner}</h2>
              <div className="vessel-card-container">
                {filteredVessels.map((vessel) => (
                  <div key={vessel.VesselId} className="vessel-card">
                    {editVessel?.VesselId === vessel.VesselId ? (
                      <div className="edit-form">
                        <input
                          type="text"
                          value={editVessel.VesselName}
                          onChange={(e) =>
                            handleEditChange('VesselName', e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.GroupOwner.GroupOwnerName}
                          onChange={(e) =>
                            handleEditChange(
                              'GroupOwner.GroupOwnerName',
                              e.target.value
                            )
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.Crew[0]?.Name}
                          onChange={(e) =>
                            handleEditChange('Crew[0].Name', e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.OperationalStatus.CurrentPort}
                          onChange={(e) =>
                            handleEditChange('OperationalStatus.CurrentPort', e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.Insurance.PolicyNumber}
                          onChange={(e) =>
                            handleEditChange('Insurance.PolicyNumber', e.target.value)
                          }
                        />
                        <button onClick={saveVesselChanges}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <h3>{vessel.VesselName}</h3>
                        <p><strong>Owner:</strong> {vessel.GroupOwner.GroupOwnerName}</p>
                        <p><strong>Captain:</strong> {vessel.Crew[0]?.Name}</p>
                        <p><strong>Status:</strong> {vessel.OperationalStatus.VoyageStatus}</p>
                        <p><strong>Insurance Policy:</strong> {vessel.Insurance.PolicyNumber}</p>
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
