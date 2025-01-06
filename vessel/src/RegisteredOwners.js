import React, { useEffect, useState } from 'react';
import './RegisteredOwners.css'; // CSS for styling

const RegisteredOwners = () => {
  const [vesselData, setVesselData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editVessel, setEditVessel] = useState(null); // State for editing a vessel

  useEffect(() => {
    // Fetch vessel data from the JSON file
    fetch('/static/registeredowner.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);
        const uniqueCategories = [
          ...new Set(data.map((vessel) => vessel.registered_owner_name)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = vesselData.filter(
      (vessel) => vessel.registered_owner_name === category
    );
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
    setVesselData((prevData) =>
      prevData.map((vessel) =>
        vessel.id === editVessel.id ? editVessel : vessel
      )
    );

    setFilteredVessels((prevData) =>
      prevData.map((vessel) =>
        vessel.id === editVessel.id ? editVessel : vessel
      )
    );

    setEditVessel(null); // Exit edit mode
  };

  return (
    <div className="ro-container">
      <h1 className="header">Registered Owners</h1>
      <div className="ro-content">
        {/* Sidebar */}
        <div className="ro-sidebar">
          <h3>Registered Owners</h3>
          <ul className="ro-list">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`ro-item ${
                  category === selectedCategory ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Vessel Details Section */}
        <div className="ro-details">
          {selectedCategory ? (
            <div>
              <h2>Vessels Registered to: {selectedCategory}</h2>
              <div className="vessel-card-container">
                {filteredVessels.map((vessel) => (
                  <div key={vessel.id} className="vessel-card">
                    {editVessel?.id === vessel.id ? (
                      <div className="edit-form">
                        {Object.entries(editVessel).map(([key, value]) => (
                          <div key={key} className="field">
                            <label>{key.replace(/_/g, ' ')}:</label>
                            <input
                              type="text"
                              value={value || ''}
                              onChange={(e) =>
                                handleEditChange(key, e.target.value)
                              }
                            />
                          </div>
                        ))}
                        <button onClick={saveVesselChanges}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <h3>{vessel.vessel_name || 'Unnamed Vessel'}</h3>
                        {Object.entries(vessel).map(([key, value]) => (
                          <p key={key}>
                            <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                          </p>
                        ))}
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
              Select a registered owner from the sidebar to view its vessels.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredOwners;
