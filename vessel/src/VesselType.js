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
    // Fetch vessel master data from JSON
    fetch('/static/vesselMasterData.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch master data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);
        const types = data.map((vessel) => vessel.vessel_type);
        setVesselTypes(types);
      })
      .catch((error) => console.error('Error fetching master data:', error));
  }, []);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    const selectedVessel = vesselData.find(
      (vessel) => vessel.vessel_type === type
    );
    setMasterData(selectedVessel ? selectedVessel.master_data : {});
    setEditMode(false);
  };

  const handleMasterDataChange = (field, value) => {
    setMasterData({ ...masterData, [field]: value });
  };

  const saveMasterDataChanges = () => {
    const updatedData = vesselData.map((vessel) =>
      vessel.vessel_type === selectedType
        ? { ...vessel, master_data: masterData }
        : vessel
    );
    setVesselData(updatedData);
    setEditMode(false);
    setLastEdited(new Date().toLocaleString());
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
                      value={masterData.onboarded_date || ''}
                      onChange={(e) =>
                        handleMasterDataChange('onboarded_date', e.target.value)
                      }
                    />
                  ) : (
                    <span>{masterData.onboarded_date}</span>
                  )}
                </div>
                <div className="field">
                  <label>Leaving Date:</label>
                  {editMode ? (
                    <input
                      type="date"
                      value={masterData.leaving_date || ''}
                      onChange={(e) =>
                        handleMasterDataChange('leaving_date', e.target.value)
                      }
                    />
                  ) : (
                    <span>{masterData.leaving_date}</span>
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
                      value={masterData.last_inspection_date || ''}
                      onChange={(e) =>
                        handleMasterDataChange(
                          'last_inspection_date',
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <span>{masterData.last_inspection_date}</span>
                  )}
                </div>
                <div className="field">
                  <label>Next Inspection Due:</label>
                  {editMode ? (
                    <input
                      type="date"
                      value={masterData.next_inspection_due || ''}
                      onChange={(e) =>
                        handleMasterDataChange(
                          'next_inspection_due',
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <span>{masterData.next_inspection_due}</span>
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
                <p className="last-edited">
                  Last edited on: {lastEdited}
                </p>
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
