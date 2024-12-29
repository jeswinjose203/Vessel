import React, { useEffect, useState } from 'react';
import './VesselSubtypes.css'; // CSS file for styling

const VesselSubtypes = () => {
  const [vesselData, setVesselData] = useState([]);
  const [vesselSubtypes, setVesselSubtypes] = useState([]);
  const [selectedSubtype, setSelectedSubtype] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editVessel, setEditVessel] = useState(null); // State for editing a vessel
  const [newSubtype, setNewSubtype] = useState(''); // State for adding a new subtype

  useEffect(() => {
    // Fetch vessel data from the JSON file
    fetch('/static/vesselData.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);
        const subtypes = [...new Set(data.map((vessel) => vessel.vessel_subtype))];
        setVesselSubtypes(subtypes);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleSubtypeClick = (subtype) => {
    setSelectedSubtype(subtype);
    const filtered = vesselData.filter((vessel) => vessel.vessel_subtype === subtype);
    setFilteredVessels(filtered);
  };

  const handleEditClick = (vessel) => {
    setEditVessel(vessel); // Set the vessel to be edited
  };

  const handleEditChange = (field, value) => {
    setEditVessel({ ...editVessel, [field]: value });
  };

  const saveVesselChanges = () => {
    // Check if the vessel subtype was changed
    const updatedSubtype = editVessel.vessel_subtype;

    setVesselData((prevData) => {
      const updatedData = prevData.map((vessel) =>
        vessel.id === editVessel.id ? editVessel : vessel
      );

      // Add the new subtype to vesselSubtypes if it doesn't exist
      if (!vesselSubtypes.includes(updatedSubtype)) {
        setVesselSubtypes([...vesselSubtypes, updatedSubtype]);
      }

      return updatedData;
    });

    // Re-filter vessels for the selected subtype
    if (selectedSubtype === updatedSubtype) {
      setFilteredVessels((prevData) =>
        prevData.map((vessel) =>
          vessel.id === editVessel.id ? editVessel : vessel
        )
      );
    } else {
      handleSubtypeClick(selectedSubtype); // Refresh the filtered list
    }

    setEditVessel(null); // Exit edit mode
  };

  const handleAddSubtype = () => {
    if (newSubtype && !vesselSubtypes.includes(newSubtype)) {
      setVesselSubtypes([...vesselSubtypes, newSubtype]);
      setNewSubtype('');
    }
  };

  return (
    <div className="vessel-subtype-container">
      <h1 className="header">Vessel Subtypes</h1>
      <div className="vessel-content">
        {/* Sidebar */}
        <div className="vessel-sidebar">
          <h3>Vessel Subtypes</h3>
          <ul className="vessel-subtype-list">
            {vesselSubtypes.map((subtype, index) => (
              <li
                key={index}
                className={`vessel-subtype-item ${
                  subtype === selectedSubtype ? 'active' : ''
                }`}
                onClick={() => handleSubtypeClick(subtype)}
              >
                {subtype}
              </li>
            ))}
          </ul>
          <div className="add-subtype">
            <input
              type="text"
              placeholder="Add New Subtype"
              value={newSubtype}
              onChange={(e) => setNewSubtype(e.target.value)}
            />
            <button onClick={handleAddSubtype}>Add</button>
          </div>
        </div>

        {/* Vessel Details Section */}
        <div className="vessel-details">
          {selectedSubtype ? (
            <div>
              <h2>{selectedSubtype} Vessels</h2>
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
                          value={editVessel.flag}
                          onChange={(e) =>
                            handleEditChange('flag', e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.port_of_registry}
                          onChange={(e) =>
                            handleEditChange('port_of_registry', e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.status}
                          onChange={(e) =>
                            handleEditChange('status', e.target.value)
                          }
                        />
                        {/* Editable Dropdown for Vessel Subtype */}
                        <select
                          value={editVessel.vessel_subtype}
                          onChange={(e) =>
                            handleEditChange('vessel_subtype', e.target.value)
                          }
                        >
                          {vesselSubtypes.map((subtype, index) => (
                            <option key={index} value={subtype}>
                              {subtype}
                            </option>
                          ))}
                          <option value="">Other</option>
                        </select>
                        <button onClick={saveVesselChanges}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <h3>{vessel.vessel_name}</h3>
                        <p>
                          <strong>IMO Number:</strong> {vessel.imo_number}
                        </p>
                        <p>
                          <strong>Flag:</strong> {vessel.flag}
                        </p>
                        <p>
                          <strong>Vessel Type:</strong> {vessel.vessel_type}
                        </p>
                        <p>
                          <strong>Port of Registry:</strong>{' '}
                          {vessel.port_of_registry}
                        </p>
                        <p>
                          <strong>Status:</strong> {vessel.status}
                        </p>
                        <p>
                          <strong>Subtype:</strong> {vessel.vessel_subtype}
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
              Select a vessel subtype from the sidebar to view its details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VesselSubtypes;
