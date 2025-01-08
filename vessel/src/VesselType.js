import React, { useEffect, useState } from 'react';
import './VesselType.css';

const VesselType = () => {
  const [vesselData, setVesselData] = useState([]);
  const [vesselTypes, setVesselTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [masterData, setMasterData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [lastEdited, setLastEdited] = useState(null);

  useEffect(() => {
    // Fetch vessel master data from the backend API
    fetch('http://localhost:5009/vesseldata/vesselMasterData')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel master data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);

        // Extract vessel types for the sidebar
        const types = data.map((vessel) => vessel.vesselType);
        setVesselTypes(types);
      })
      .catch((error) => console.error('Error fetching vessel master data:', error));
  }, []);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    const selectedVessel = vesselData.find((vessel) => vessel.vesselType === type);
    setMasterData(selectedVessel || {});
    setEditMode(false);
  };

  const handleMasterDataChange = (field, value) => {
    setMasterData({ ...masterData, [field]: value });
  };
  const saveMasterDataChanges = () => {
    const updatedData = vesselData.map((vessel) =>
      vessel.vesselType === selectedType
        ? { ...vessel, ...masterData }
        : vessel
    );
    setVesselData(updatedData);
    setEditMode(false);
    setLastEdited(new Date().toLocaleString());
  
    // Send updated data to the server
    fetch('http://localhost:5009/vesseldata/updateMasterData', {
      method: 'PUT', // Use 'POST' if your backend expects that
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(masterData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to update vessel master data');
        return response.json();
      })
      .then((data) => {
        console.log('Successfully updated vessel master data:', data);
      })
      .catch((error) => console.error('Error updating vessel master data:', error));
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
                className={`vessel-type-item ${type === selectedType ? 'active' : ''}`}
                onClick={() => handleTypeClick(type)}
              >
                {type}
              </li>
            ))}
          </ul>
        </div>

        {/* Master Data Section */}
        <div className="vessel-details">
          {selectedType ? (
            <div>
              <h2>Master Data for {selectedType}</h2>
              <div className="master-data-fields">
                <div className="field">
                  <label>Onboarded Date:</label>
                  {editMode ? (
                    <input
                      type="date"
                      value={masterData.onboardedDate || ''}
                      onChange={(e) =>
                        handleMasterDataChange('onboardedDate', e.target.value)
                      }
                    />
                  ) : (
                    <span>{masterData.onboardedDate}</span>
                  )}
                </div>
                <div className="field">
                  <label>Leaving Date:</label>
                  {editMode ? (
                    <input
                      type="date"
                      value={masterData.leavingDate || ''}
                      onChange={(e) =>
                        handleMasterDataChange('leavingDate', e.target.value)
                      }
                    />
                  ) : (
                    <span>{masterData.leavingDate}</span>
                  )}
                </div>
                <div className="field">
                  <label>Status:</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={masterData.status || ''}
                      onChange={(e) =>
                        handleMasterDataChange('status', e.target.value)
                      }
                    />
                  ) : (
                    <span>{masterData.status}</span>
                  )}
                </div>
                <div className="field">
                  <label>Last Inspection Date:</label>
                  {editMode ? (
                    <input
                      type="date"
                      value={masterData.lastInspectionDate || ''}
                      onChange={(e) =>
                        handleMasterDataChange('lastInspectionDate', e.target.value)
                      }
                    />
                  ) : (
                    <span>{masterData.lastInspectionDate}</span>
                  )}
                </div>
                <div className="field">
                  <label>Next Inspection Due:</label>
                  {editMode ? (
                    <input
                      type="date"
                      value={masterData.nextInspectionDue || ''}
                      onChange={(e) =>
                        handleMasterDataChange('nextInspectionDue', e.target.value)
                      }
                    />
                  ) : (
                    <span>{masterData.nextInspectionDue}</span>
                  )}
                </div>
                <div className="field">
                  <label>Remarks:</label>
                  {editMode ? (
                    <textarea
                      value={masterData.remarks || ''}
                      onChange={(e) =>
                        handleMasterDataChange('remarks', e.target.value)
                      }
                    ></textarea>
                  ) : (
                    <span>{masterData.remarks}</span>
                  )}
                </div>
                <div className="actions">
                  {editMode ? (
                    <button onClick={saveMasterDataChanges}>Save</button>
                  ) : (
                    <button onClick={() => setEditMode(true)}>Edit</button>
                  )}
                </div>
              </div>
              {lastEdited && (
                <p className="last-edited">Last edited on: {lastEdited}</p>
              )}
            </div>
          ) : (
            <p className="placeholder-text">
              Select a vessel type from the sidebar to view its master data.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VesselType;
