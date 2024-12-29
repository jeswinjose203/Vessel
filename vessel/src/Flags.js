import React, { useEffect, useState } from 'react';
import './Flags.css'; // CSS file for styling

const Flags = () => {
  const [vesselData, setVesselData] = useState([]);
  const [flags, setFlags] = useState([]);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editVessel, setEditVessel] = useState(null); // State for editing a vessel
  const [newFlag, setNewFlag] = useState(''); // State for adding a new flag

  useEffect(() => {
    // Fetch vessel data from the JSON file
    fetch('/static/vesselData.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);
        const uniqueFlags = [...new Set(data.map((vessel) => vessel.flag))];
        setFlags(uniqueFlags);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleFlagClick = (flag) => {
    setSelectedFlag(flag);
    const filtered = vesselData.filter((vessel) => vessel.flag === flag);
    setFilteredVessels(filtered);
  };

  const handleEditClick = (vessel) => {
    setEditVessel(vessel); // Set the vessel to be edited
  };

  const handleEditChange = (field, value) => {
    setEditVessel({ ...editVessel, [field]: value });
  };

  const saveVesselChanges = () => {
    // Update the flag if it was changed
    const updatedFlag = editVessel.flag;

    setVesselData((prevData) => {
      const updatedData = prevData.map((vessel) =>
        vessel.id === editVessel.id ? editVessel : vessel
      );

      // Add the new flag to the list of flags if it doesn't already exist
      if (!flags.includes(updatedFlag)) {
        setFlags([...flags, updatedFlag]);
      }

      return updatedData;
    });

    // Re-filter vessels for the selected flag
    if (selectedFlag === updatedFlag) {
      setFilteredVessels((prevData) =>
        prevData.map((vessel) =>
          vessel.id === editVessel.id ? editVessel : vessel
        )
      );
    } else {
      handleFlagClick(selectedFlag); // Refresh the filtered list
    }

    setEditVessel(null); // Exit edit mode
  };

  const handleAddFlag = () => {
    if (newFlag && !flags.includes(newFlag)) {
      setFlags([...flags, newFlag]);
      setNewFlag('');
    }
  };

  return (
    <div className="flags-container">
      <h1 className="header">Flags</h1>
      <div className="flags-content">
        {/* Sidebar */}
        <div className="flags-sidebar">
          <h3>Available Flags</h3>
          <ul className="flag-list">
            {flags.map((flag, index) => (
              <li
                key={index}
                className={`flag-item ${flag === selectedFlag ? 'active' : ''}`}
                onClick={() => handleFlagClick(flag)}
              >
                {flag}
              </li>
            ))}
          </ul>
          <div className="add-flag">
            <input
              type="text"
              placeholder="Add New Flag"
              value={newFlag}
              onChange={(e) => setNewFlag(e.target.value)}
            />
            <button onClick={handleAddFlag}>Add</button>
          </div>
        </div>

        {/* Vessel Details Section */}
        <div className="flag-details">
          {selectedFlag ? (
            <div>
              <h2>Vessels under {selectedFlag} Flag</h2>
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
                        <input
                          type="text"
                          value={editVessel.status}
                          onChange={(e) =>
                            handleEditChange('status', e.target.value)
                          }
                        />
                        {/* Editable Dropdown for Flags */}
                        <select
                          value={editVessel.flag}
                          onChange={(e) =>
                            handleEditChange('flag', e.target.value)
                          }
                        >
                          {flags.map((flag, index) => (
                            <option key={index} value={flag}>
                              {flag}
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
                          <strong>Status:</strong> {vessel.status}
                        </p>
                        <p>
                          <strong>Flag:</strong> {vessel.flag}
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
              Select a flag from the sidebar to view its vessels.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flags;
