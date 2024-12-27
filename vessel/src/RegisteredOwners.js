import React, { useEffect, useState } from 'react';
import './RegisteredOwners.css'; // CSS for styling

const RegisteredOwners = () => {
  const [vesselData, setVesselData] = useState([]);
  const [owners, setOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);
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
        </div>

        {/* Vessel Details Section */}
        <div className="ro-details">
          {selectedOwner ? (
            <div>
              <h2>Vessels Owned by {selectedOwner}</h2>
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
              Select a registered owner from the sidebar to view their vessels.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredOwners;
