import React, { useEffect, useState } from "react";
import "./Flags.css";

const Flags = () => {
  const [vesselData, setVesselData] = useState([]);
  const [flags, setFlags] = useState([]);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [lastEdited, setLastEdited] = useState(null);
  const [editVesselData, setEditVesselData] = useState({});

  useEffect(() => {
    // Fetch vessel data from the API
    fetch("http://localhost:5009/vesseldata/flags")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch vessel data");
        return response.json();
      })
      .then((data) => {
        setVesselData(data);
        const uniqueFlags = [...new Set(data.map((vessel) => vessel.flag))];
        setFlags(uniqueFlags);
      })
      .catch((error) => console.error("Error fetching vessel data:", error));
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
    // Update the vessel on the backend
    fetch(`http://localhost:5009/vesseldata/flags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editVesselData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to save vessel data");
        return response.json();
      })
      .then((updatedVessel) => {
        // Update the local state with the new vessel data
        const updatedData = vesselData.map((vessel) =>
          vessel.id === updatedVessel.data.id ? updatedVessel.data : vessel
        );
        setVesselData(updatedData);

        // Update filtered vessels if flag matches
        if (selectedFlag === updatedVessel.data.flag) {
          setFilteredVessels(
            updatedData.filter((vessel) => vessel.flag === selectedFlag)
          );
        } else {
          setFilteredVessels(updatedData);
        }

        setLastEdited(new Date().toLocaleString());
        setEditMode(false);
      })
      .catch((error) => console.error("Error saving vessel data:", error));
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
                className={`flag-item ${flag === selectedFlag ? "active" : ""}`}
                onClick={() => handleFlagClick(flag)}
              >
                {flag}
              </li>
            ))}
          </ul>
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
                          <label>Vessel Name:</label>
                          <input
                            type="text"
                            value={editVesselData.vesselName || ""}
                            onChange={(e) =>
                              handleVesselDataChange("vesselName", e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Onboarded Date:</label>
                          <input
                            type="date"
                            value={editVesselData.onboardedDate || ""}
                            onChange={(e) =>
                              handleVesselDataChange("onboardedDate", e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Leaving Date:</label>
                          <input
                            type="date"
                            value={editVesselData.leavingDate || ""}
                            onChange={(e) =>
                              handleVesselDataChange("leavingDate", e.target.value)
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Last Inspection Date:</label>
                          <input
                            type="date"
                            value={editVesselData.lastInspectionDate || ""}
                            onChange={(e) =>
                              handleVesselDataChange(
                                "lastInspectionDate",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Next Inspection Due:</label>
                          <input
                            type="date"
                            value={editVesselData.nextInspectionDue || ""}
                            onChange={(e) =>
                              handleVesselDataChange(
                                "nextInspectionDue",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="field">
                          <label>Remarks:</label>
                          <textarea
                            value={editVesselData.remarks || ""}
                            onChange={(e) =>
                              handleVesselDataChange("remarks", e.target.value)
                            }
                          ></textarea>
                        </div>
                        <button onClick={saveVesselChanges}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <h3>{vessel.vesselName}</h3>
                        <p>
                          <strong>Onboarded Date:</strong>{" "}
                          {vessel.onboardedDate || "N/A"}
                        </p>
                        <p>
                          <strong>Leaving Date:</strong>{" "}
                          {vessel.leavingDate || "N/A"}
                        </p>
                        <p>
                          <strong>Last Inspection Date:</strong>{" "}
                          {vessel.lastInspectionDate || "N/A"}
                        </p>
                        <p>
                          <strong>Next Inspection Due:</strong>{" "}
                          {vessel.nextInspectionDue || "N/A"}
                        </p>
                        <p>
                          <strong>Remarks:</strong> {vessel.remarks || "N/A"}
                        </p>
                        <button onClick={() => handleEditClick(vessel)}>
                          Edit
                        </button>
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
