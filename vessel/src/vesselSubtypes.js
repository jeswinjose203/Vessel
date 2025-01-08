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
    fetch('http://localhost:5009/vesselData/vesselSubtypes')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch vessel data');
        return response.json();
      })
      .then((data) => {
        setVesselData(data);

        const types = [...new Set(data.map((vessel) => vessel.vesselType))];
        setVesselTypes(types);
      })
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  useEffect(() => {
    if (selectedType) {
      const subtypes = [
        ...new Set(
          vesselData
            .filter((vessel) => vessel.vesselType === selectedType)
            .map((vessel) => vessel.vesselSubtype)
        ),
      ];
      setVesselSubtypes(subtypes);
      setSelectedSubtype(null);
      setFilteredVessels([]);
    }
  }, [selectedType, vesselData]);

  useEffect(() => {
    if (selectedSubtype) {
      const filtered = vesselData.filter(
        (vessel) =>
          vessel.vesselType === selectedType &&
          vessel.vesselSubtype === selectedSubtype
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
      [field]: value,
    });
  };

  const saveVesselChanges = () => {
    // Send the updated data to the backend
    fetch('http://localhost:5009/vesselData/updateVesselSubtype', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editVessel),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to update vessel data');
        return response.json();
      })
      .then((updatedVessel) => {
        // Update the local state with the updated vessel
        setVesselData((prevData) =>
          prevData.map((vessel) =>
            vessel.id === updatedVessel.id ? updatedVessel : vessel
          )
        );
        setFilteredVessels((prevFiltered) =>
          prevFiltered.map((vessel) =>
            vessel.id === updatedVessel.id ? updatedVessel : vessel
          )
        );
        setEditVessel(null);
      })
      .catch((error) => console.error('Error updating vessel data:', error));
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
                  <div key={vessel.id} className="vessel-card">
                    {editVessel?.id === vessel.id ? (
                      <div>
                        <div className="field">
                          <label>Onboarded Date:</label>
                          <input
                            type="date"
                            value={editVessel.onboardedDate}
                            onChange={(e) =>
                              handleEditChange('onboardedDate', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Leaving Date:</label>
                          <input
                            type="date"
                            value={editVessel.leavingDate}
                            onChange={(e) =>
                              handleEditChange('leavingDate', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Status:</label>
                          <input
                            type="text"
                            value={editVessel.status}
                            onChange={(e) =>
                              handleEditChange('status', e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Last Inspection Date:</label>
                          <input
                            type="date"
                            value={editVessel.lastInspectionDate}
                            onChange={(e) =>
                              handleEditChange(
                                'lastInspectionDate',
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Next Inspection Due:</label>
                          <input
                            type="date"
                            value={editVessel.nextInspectionDue}
                            onChange={(e) =>
                              handleEditChange(
                                'nextInspectionDue',
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Remarks:</label>
                          <textarea
                            value={editVessel.remarks}
                            onChange={(e) =>
                              handleEditChange('remarks', e.target.value)
                            }
                          />
                        </div>
                        <button onClick={saveVesselChanges}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <h3>{vessel.vesselType}</h3>
                        <p>Subtype: {vessel.vesselSubtype}</p>
                        <p>Status: {vessel.status}</p>
                        <p>
                          Last Inspection Date: {vessel.lastInspectionDate}
                        </p>
                        <p>
                          Next Inspection Due: {vessel.nextInspectionDue}
                        </p>
                        <p>Remarks: {vessel.remarks}</p>
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
