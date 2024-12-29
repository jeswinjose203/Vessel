import React, { useEffect, useState } from 'react';
import './VesselType.css'; // External CSS file for styling

const VesselType = () => {
  const [vesselData, setVesselData] = useState([]);
  const [vesselTypes, setVesselTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editVessel, setEditVessel] = useState(null); // State for editing a vessel
  const [newType, setNewType] = useState(''); // State for adding a new type

  useEffect(() => {
    // Fetch vessel data from a JSON file
    fetch('/static/vesselData.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);
        const types = [...new Set(data.map((vessel) => vessel.vessel_type))];
        setVesselTypes(types);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    const filtered = vesselData.filter((vessel) => vessel.vessel_type === type);
    setFilteredVessels(filtered);
  };

  const handleEditClick = (vessel) => {
    setEditVessel(vessel); // Set the vessel to be edited
  };

  const handleEditChange = (field, value) => {
    setEditVessel({ ...editVessel, [field]: value });
  };

  const saveVesselChanges = () => {
    // Check if the vessel type was changed
    const updatedVesselType = editVessel.vessel_type;

    setVesselData((prevData) => {
      const updatedData = prevData.map((vessel) =>
        vessel.id === editVessel.id ? editVessel : vessel
      );

      // Add the new type to vesselTypes if it doesn't exist
      if (!vesselTypes.includes(updatedVesselType)) {
        setVesselTypes([...vesselTypes, updatedVesselType]);
      }

      return updatedData;
    });

    // Re-filter vessels for the selected type
    if (selectedType === updatedVesselType) {
      setFilteredVessels((prevData) =>
        prevData.map((vessel) =>
          vessel.id === editVessel.id ? editVessel : vessel
        )
      );
    } else {
      handleTypeClick(selectedType); // Refresh the filtered list
    }

    setEditVessel(null); // Exit edit mode
  };

  const handleAddType = () => {
    if (newType && !vesselTypes.includes(newType)) {
      setVesselTypes([...vesselTypes, newType]);
      setNewType('');
    }
  };

  return (
    <div className="vessel-container">
      <h1 className="header">Vessel Types</h1>
      <div className="vessel-content">
        {/* Sidebar */}
        <div className="vessel-sidebar">
          <h3>Vessel Types</h3>
          <ul className="vessel-type-list">
            {vesselTypes.map((type, index) => (
              <li
                key={index}
                className={`vessel-type-item ${
                  type === selectedType ? 'active' : ''
                }`}
                onClick={() => handleTypeClick(type)}
              >
                {type}
              </li>
            ))}
          </ul>
          <div className="add-type">
            <input
              type="text"
              placeholder="Add New Type"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
            <button onClick={handleAddType}>Add</button>
          </div>
        </div>

        {/* Vessel Details Section */}
        <div className="vessel-details">
          {selectedType ? (
            <div>
              <h2>{selectedType} Vessels</h2>
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
                          value={editVessel.registered_owner_name}
                          onChange={(e) =>
                            handleEditChange(
                              'registered_owner_name',
                              e.target.value
                            )
                          }
                        />
                        <input
                          type="text"
                          value={editVessel.status}
                          onChange={(e) =>
                            handleEditChange('status', e.target.value)
                          }
                        />
                        {/* Editable Dropdown for Vessel Type */}
                        <select
                          value={editVessel.vessel_type}
                          onChange={(e) =>
                            handleEditChange('vessel_type', e.target.value)
                          }
                        >
                          {vesselTypes.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
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
                          <strong>Port of Registry:</strong>{' '}
                          {vessel.port_of_registry}
                        </p>
                        <p>
                          <strong>Owner:</strong>{' '}
                          {vessel.registered_owner_name}
                        </p>
                        <p>
                          <strong>Status:</strong> {vessel.status}
                        </p>
                        <p>
                          <strong>Type:</strong> {vessel.vessel_type}
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
              Select a vessel type from the sidebar to view its details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VesselType;
