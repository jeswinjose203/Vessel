import React, { useEffect, useState } from 'react';
import './GroupOwners.css'; // CSS for styling

const GroupOwners = () => {
  const [vesselData, setVesselData] = useState([]);
  const [groupOwners, setGroupOwners] = useState([]);
  const [selectedGroupOwner, setSelectedGroupOwner] = useState(null);
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
        </div>

        {/* Vessel Details Section */}
        <div className="go-details">
          {selectedGroupOwner ? (
            <div>
              <h2>Vessels Owned by {selectedGroupOwner}</h2>
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
                      <strong>Vessel Subtype:</strong> {vessel.vessel_subtype}
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
              Select a group owner from the sidebar to view their vessels.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupOwners;
