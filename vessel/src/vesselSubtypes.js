import React, { useEffect, useState } from 'react';
import './VesselSubtypes.css';

const VesselSubtypes = () => {
  const [vesselData, setVesselData] = useState([]);
  const [vesselTypes, setVesselTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [vesselSubtypes, setVesselSubtypes] = useState([]);
  const [selectedSubtype, setSelectedSubtype] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editVessel, setEditVessel] = useState(null);

  useEffect(() => {
    // Fetch vessel data from the JSON file
    fetch('/static/vesselsubtype.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);

        // Extract unique vessel types
        const types = [...new Set(data.map((vessel) => vessel.vessel_type))];
        setVesselTypes(types);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  useEffect(() => {
    if (selectedType) {
      const subtypes = [
        ...new Set(
          vesselData
            .filter((vessel) => vessel.vessel_type === selectedType)
            .map((vessel) => vessel.vessel_subtype)
        ),
      ];
      setVesselSubtypes(subtypes);
      setSelectedSubtype(null); // Reset subtype when type changes
      setFilteredVessels([]); // Clear filtered vessels
    }
  }, [selectedType, vesselData]);

  useEffect(() => {
    if (selectedSubtype) {
      const filtered = vesselData.filter(
        (vessel) =>
          vessel.vessel_type === selectedType &&
          vessel.vessel_subtype === selectedSubtype
      );
      setFilteredVessels(filtered);
    }
  }, [selectedSubtype, selectedType, vesselData]);

  const handleEditClick = (vessel) => {
    setEditVessel(vessel);
  };

  const handleEditChange = (field, value) => {
    setEditVessel({
      ...editVessel,
      master_data: { ...editVessel.master_data, [field]: value },
    });
  };

  const saveVesselChanges = () => {
    setVesselData((prevData) =>
      prevData.map((vessel) =>
        vessel.vessel_type === editVessel.vessel_type &&
        vessel.vessel_subtype === editVessel.vessel_subtype
          ? editVessel
          : vessel
      )
    );
    setEditVessel(null);
  };

  return (
    <div className="vessel-subtype-container">
      <h1 className="header">Vessel Subtypes</h1>
      <div className="vessel-content">
        <div className="vessel-sidebar">
          <h3>Vessel Types</h3>
          <select
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select a Type</option>
            {vesselTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          {selectedType && (
            <>
              <h3>Vessel Subtypes</h3>
              <select
                value={selectedSubtype || ''}
                onChange={(e) => setSelectedSubtype(e.target.value)}
              >
                <option value="">Select a Subtype</option>
                {vesselSubtypes.map((subtype, index) => (
                  <option key={index} value={subtype}>
                    {subtype}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        <div className="vessel-details">
          {selectedSubtype ? (
            <div>
              <h2>
                {selectedSubtype} Vessels ({selectedType})
              </h2>
              <div className="vessel-card-container">
                {filteredVessels.map((vessel) => (
                  <div key={vessel.vessel_subtype} className="vessel-card">
                    {editVessel?.vessel_subtype === vessel.vessel_subtype ? (
                      <div>
                        <div className="field">
                          <label>Onboarded Date:</label>
                          <input
                            type="date"
                            value={editVessel.master_data.onboarded_date}
                            onChange={(e) =>
                              handleEditChange('onboarded_date', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Leaving Date:</label>
                          <input
                            type="date"
                            value={editVessel.master_data.leaving_date}
                            onChange={(e) =>
                              handleEditChange('leaving_date', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Status:</label>
                          <input
                            type="text"
                            value={editVessel.master_data.status}
                            onChange={(e) =>
                              handleEditChange('status', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Last Inspection Date:</label>
                          <input
                            type="date"
                            value={editVessel.master_data.last_inspection_date}
                            onChange={(e) =>
                              handleEditChange('last_inspection_date', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Next Inspection Due:</label>
                          <input
                            type="date"
                            value={editVessel.master_data.next_inspection_due}
                            onChange={(e) =>
                              handleEditChange('next_inspection_due', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Remarks:</label>
                          <textarea
                            value={editVessel.master_data.remarks}
                            onChange={(e) =>
                              handleEditChange('remarks', e.target.value)
                            }
                          />
                        </div>
                        <button onClick={saveVesselChanges}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <h3>{vessel.vessel_type}</h3>
                        <p>Subtype: {vessel.vessel_subtype}</p>
                        <p>Status: {vessel.master_data.status}</p>
                        <p>
                          Last Inspection Date:{' '}
                          {vessel.master_data.last_inspection_date}
                        </p>
                        <p>
                          Next Inspection Due:{' '}
                          {vessel.master_data.next_inspection_due}
                        </p>
                        <p>Remarks: {vessel.master_data.remarks}</p>
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
            <p>Select a subtype to view vessels.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VesselSubtypes;
