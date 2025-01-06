import React, { useEffect, useState } from 'react';
import './Flags.css';

const Flags = () => {
  const [vesselData, setVesselData] = useState([]);
  const [flags, setFlags] = useState([]);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [lastEdited, setLastEdited] = useState(null);
  const [editVesselData, setEditVesselData] = useState({});
  const [newFlag, setNewFlag] = useState('');

  useEffect(() => {
    // Fetch vessel data from JSON
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
    setFilteredVessels(vesselData.filter((vessel) => vessel.flag === flag));
    setEditMode(false);
  };

  const handleEditClick = (vessel) => {
    setEditVesselData(vessel);
    setEditMode(true);
  };

  const handleVesselDataChange = (field, value) => {
    setEditVesselData({ ...editVesselData, [field]: value });
  };

  const saveVesselChanges = () => {
    const updatedData = vesselData.map((vessel) =>
      vessel.id === editVesselData.id ? editVesselData : vessel
    );
    setVesselData(updatedData);

    if (selectedFlag === editVesselData.flag) {
      setFilteredVessels(updatedData.filter((vessel) => vessel.flag === selectedFlag));
    } else {
      setFilteredVessels(updatedData.filter((vessel) => vessel.flag === selectedFlag));
    }

    setLastEdited(new Date().toLocaleString());
    setEditMode(false);
  };

  // const handleAddFlag = () => {
  //   if (newFlag && !flags.includes(newFlag)) {
  //     setFlags([...flags, newFlag]);
  //     setNewFlag('');
  //   }
  // };

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
            {/* <input
              type="text"
              placeholder="Add New Flag"
              value={newFlag}
              onChange={(e) => setNewFlag(e.target.value)}
            /> */}
            {/* <button onClick={handleAddFlag}>Add</button> */}
          </div>
        </div>

        {/* Details Section */}
        <div className="flag-details">
          {selectedFlag ? (
            <div>
              <h2>Vessels under {selectedFlag} Flag</h2>
              <div className="vessel-list">
                {filteredVessels.map((vessel) => (
                  <div key={vessel.id} className="vessel-item">
                    {editMode && editVesselData.id === vessel.id ? (
                      <div className="edit-form">
                        <div className="field">
                          <label>Onboarded Date:</label>
                          <input
                            type="date"
                            value={editVesselData.onboarded_date || ''}
                            onChange={(e) =>
                              handleVesselDataChange('onboarded_date', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Leaving Date:</label>
                          <input
                            type="date"
                            value={editVesselData.leaving_date || ''}
                            onChange={(e) =>
                              handleVesselDataChange('leaving_date', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Status:</label>
                          <input
                            type="text"
                            value={editVesselData.status || ''}
                            onChange={(e) => handleVesselDataChange('status', e.target.value)}
                          />
                        </div>
                        <div className="field">
                          <label>Last Inspection Date:</label>
                          <input
                            type="date"
                            value={editVesselData.last_inspection_date || ''}
                            onChange={(e) =>
                              handleVesselDataChange('last_inspection_date', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Next Inspection Due:</label>
                          <input
                            type="date"
                            value={editVesselData.next_inspection_due || ''}
                            onChange={(e) =>
                              handleVesselDataChange('next_inspection_due', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Remarks:</label>
                          <textarea
                            value={editVesselData.remarks || ''}
                            onChange={(e) => handleVesselDataChange('remarks', e.target.value)}
                          ></textarea>
                        </div>
                        <button onClick={saveVesselChanges}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <h3>{vessel.vessel_name}</h3>
                        <p>
                          <strong>IMO Number:</strong> {vessel.imo_number}
                        </p>
                        <p>
                          <strong>Onboarded Date:</strong> {vessel.onboarded_date || 'N/A'}
                        </p>
                        <p>
                          <strong>Leaving Date:</strong> {vessel.leaving_date || 'N/A'}
                        </p>
                        <p>
                          <strong>Status:</strong> {vessel.status || 'N/A'}
                        </p>
                        <p>
                          <strong>Last Inspection Date:</strong>{' '}
                          {vessel.last_inspection_date || 'N/A'}
                        </p>
                        <p>
                          <strong>Next Inspection Due:</strong>{' '}
                          {vessel.next_inspection_due || 'N/A'}
                        </p>
                        <p>
                          <strong>Remarks:</strong> {vessel.remarks || 'N/A'}
                        </p>
                        <button onClick={() => handleEditClick(vessel)}>Edit</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {lastEdited && <p>Last edited on: {lastEdited}</p>}
            </div>
          ) : (
            <p>Select a flag from the sidebar to view vessels.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flags;
