import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";

// Reusable TextField Component
const ReusableTextField = ({ label, name, value, onChange, type = "text", required = false }) => (
  <TextField
    label={label}
    name={name}
    value={value || ""}
    onChange={onChange}
    fullWidth
    type={type}
    required={required}
    error={required && !value}
    helperText={required && !value ? `${label} is required.` : ""}
  />
);

export default function VesselEditForm({ open, onClose, vessel, onSave }) {
   const [formData, setFormData] = useState(vessel || {});
  const [errors, setErrors] = useState({});
  const [vesselType, setVesselType] = useState(formData.vesselType || '');
  const [vesselSubtype, setVesselSubtype] = useState(formData.vesselSubtype || '');
  
  useEffect(() => {
    setFormData(vessel || {});
  }, [vessel]);

  const vesselTypeOptions = [
    { label: "Cargo", subtypes: ["General Cargo", "Container"] },
    { label: "Tanker", subtypes: ["Oil", "Chemical", "LNG"] },
    { label: "Bulk Carrier", subtypes: ["Ore", "Grain"] },
    { label: "LNG Tanker", subtypes: ["LNG"] },
  ];
  useEffect(() => {
    if (vessel) {
      setFormData(vessel);
      setVesselType(vessel.vesselType || "");
      setVesselSubtype(vessel.vesselSubtype || "");
    }
  }, [vessel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // List of fields that should be treated as integers
    const intFields = [
      "buildYear","grossTonnage", "netTonnage", "deadweightTonnage", "lengthOverall",
      "beam", "draft", "enginePower", "speed", "crewCapacity",
      "passengerCapacity", "cargoCapacity", "fuelCapacity", "operationalRange"
    ];
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: intFields.includes(name) ? parseInt(value) || "" : value,
    }));
  
    // Reset vesselSubtype when vesselType changes
    if (name === "vesselType") {
      setVesselType(value);
      setVesselSubtype(""); // Reset the subtype when the type changes
    }
  };
  


  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["vesselName", "imoNumber", "vesselType"];
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const generateVesselId = () => {
    return `VSL-${Date.now()}`; // Simple ID using the current timestamp
  };


  const generateId = () => Math.floor(Math.random() * 1000000); // Random ID between 0 and 999,999
  // Use a timestamp as a unique id

  const handleSave = async () => {
    if (!validateForm()) {
      alert("Please fill out all required fields.");
      return;
    }
  console.log(typeof(formData.vesselId),typeof(generateVesselId()));
    // Generate vesselId or get it from elsewhere, for example:
    const vesselId = formData.vesselId || generateVesselId(); // Ensure vesselId is generated

    // Ensure id is not null
    const id = parseInt(formData.id !== null && formData.id !== undefined ? formData.id : generateId()); // Generate id if missing

    // Add vesselId and id to the form data
    const formDataWithIds = { ...formData, vesselId, id };
  
    // Ensure empty fields are sent as null
    const sanitizedData = Object.keys(formDataWithIds).reduce((acc, key) => {
      acc[key] = formDataWithIds[key] === "" || formDataWithIds[key] === undefined ? null : formDataWithIds[key];
      return acc;
    }, {});
  
    console.log("Payload:", JSON.stringify(sanitizedData));
  
    try {
      const response = await fetch("http://localhost:5009/vesseldata/newvesseldata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const savedVessel = await response.json();
      alert("Vessel data saved successfully!");
  
      onSave(savedVessel); // Notify parent component
      onClose(); // Close dialog
    } catch (error) {
      console.error("Error saving vessel data:", error);
      alert("Failed to save vessel data. Please try again later.");
    }
  };
  
  
  
  // const handleSave = async () => {
  //   if (!validateForm()) {
  //     alert("Please fill out all required fields.");
  //     return;
  //   }
  
  //   const newVesselData = { ...formData };
  //   console.log(JSON.stringify(newVesselData));
  //   try {
  //     const response = await fetch("http://localhost:5009/vesseldata/newvesseldata", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newVesselData),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Error1: ${response.status} ${response.statusText}`);
  //     }
  
  //     const savedVessel = await response.json();
  //     alert("Vessel data saved successfully!");
  
  //     // Call the onSave callback to pass the new data back to the parent component
  //     onSave(savedVessel);
  
  //     // Close the dialog
  //     onClose();
  //   } catch (error) {
  //     console.error("Error saving vessel data:", error);
  //     alert("Failed to save vessel data. Please try again later.");
  //   }
  // };

   const vesselTypeSelected = vesselTypeOptions.find(
    (option) => option.label === vesselType
  )
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{vessel ? 'Edit Vessel' : 'Add Vessel'}</DialogTitle>
      <DialogContent>
        {/* General Information */}
        <Typography variant="h6" gutterBottom>
          General Information
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          {/* Add a hidden field for vesselId */}
  
          <Grid item xs={6}>
            <TextField
              label="Vessel Name"
              name="vesselName"
              value={formData.vesselName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="IMO Number"
              name="imoNumber"
              value={formData.imoNumber || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Official Number"
              name="officialNumber"
              value={formData.officialNumber || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Call Sign"
              name="callSign"
              value={formData.callSign || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Vessel Type</InputLabel>
              <Select
                name="vesselType"
                value={formData.vesselType || ''}
                onChange={handleChange}
              >
                <MenuItem value="Cargo">Cargo</MenuItem>
                <MenuItem value="Tanker">Tanker</MenuItem>
                <MenuItem value="Bulk Carrier">Bulk Carrier</MenuItem>
                <MenuItem value="LNG Tanker">LNG Tanker</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth disabled={!vesselType}>
              <InputLabel>Vessel Subtype</InputLabel>
              <Select
                name="vesselSubtype"
                value={formData.vesselSubtype || ""}
                onChange={handleChange}
              >
                {vesselTypeSelected
                  ? vesselTypeSelected.subtypes.map((subtype) => (
                      <MenuItem key={subtype} value={subtype}>
                        {subtype}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Flag"
              name="flag"
              value={formData.flag || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Port of Registry"
              name="portOfRegistry"
              value={formData.portOfRegistry || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Group Owner Name"
              name="groupOwnerName"
              value={formData.groupOwnerName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Owners and Agents */}
        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
          Owners and Agents
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Registered Owner Name"
              name="registeredOwnerName"
              value={formData.registeredOwnerName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Registered Owner Address"
              name="registeredOwnerAddress"
              value={formData.registeredOwnerAddress || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Bareboat Charter Owner Name"
              name="bareboatCharterName"
              value={formData.bareboatCharterName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Bareboat Charter Owner Address"
              name="bareboatCharterAddress"
              value={formData.bareboatCharterAddress || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="DOC/MLC Owner"
              name="docMlcOwnerName"
              value={formData.docMlcOwnerName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="DOC/MLC Holder Address"
              name="docMlcOwnerAddress"
              value={formData.docMlcOwnerAddress || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Employers Agent"
              name="employerAgentName"
              value={formData.employerAgentName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Employers Agent Address"
              name="employerAgentAddress"
              value={formData.employerAgentAddress || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Divider />
        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
          Other Details
        </Typography>
        <Grid container spacing={2}>
        <Grid item xs={6}>
            <TextField
              label="Status"
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Handover Date"
              name="handoverDate"
              type="date"
              value={formData.handoverDate || ""}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Build Year"
              name="buildYear"
              type="number"
              value={formData.buildYear || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Shipyard"
              name="shipyard"
              value={formData.shipyard || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Gross Tonnage"
              name="grossTonnage"
              type="number"
              value={formData.grossTonnage || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Net Tonnage"
              name="netTonnage"
              type="number"
              value={formData.netTonnage || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Deadweight Tonnage (DWT)"
              name="deadweightTonnage"
              type="number"
              value={formData.deadweightTonnage || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Length Overall"
              name="lengthOverall"
              type="number"
              value={formData.lengthOverall || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Beam"
              name="beam"
              type="number"
              value={formData.beam || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Draft"
              name="draft"
              type="number"
              value={formData.draft || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
  <FormControl fullWidth>
    <InputLabel>Engine Type</InputLabel>
    <Select
      name="engineType"
      value={formData.engineType || ""}
      onChange={handleChange}
    >
      <MenuItem value="Diesel">Diesel</MenuItem>
      <MenuItem value="Steam Turbine">Steam Turbine</MenuItem>
      <MenuItem value="Gas Turbine">Gas Turbine</MenuItem>
      <MenuItem value="Dual-Fuel">Dual-Fuel</MenuItem>
      <MenuItem value="Electric">Electric</MenuItem>
    </Select>
  </FormControl>
</Grid>
          <Grid item xs={6}>
            <TextField
              label="Engine Power"
              name="enginePower"
              type="number"
              value={formData.enginePower || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Speed"
              name="speed"
              type="number"
              value={formData.speed || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Hull Material"
              name="hullMaterial"
              value={formData.hullMaterial || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Class Society"
              name="classSociety"
              value={formData.classSociety || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Survey Date"
              name="lastSurveyDate"
              type="date"
              value={formData.lastSurveyDate || ""}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Next Survey Due Date"
              name="nextSurveyDueDate"
              type="date"
              value={formData.nextSurveyDueDate || ""}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="AIS Code"
              name="aisCode"
              value={formData.aisCode || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Crew Capacity"
              name="crewCapacity"
              type="number"
              value={formData.crewCapacity || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Passenger Capacity"
              name="passengerCapacity"
              type="number"
              value={formData.passengerCapacity || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cargo Capacity"
              name="cargoCapacity"
              type="number"
              value={formData.cargoCapacity || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Fuel Capacity"
              name="fuelCapacity"
              type="number"
              value={formData.fuelCapacity || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Operational Range"
              name="operationalRange"
              type="number"
              value={formData.operationalRange || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Maintenance Date"
              name="lastMaintenanceDate"
              type="date"
              value={formData.lastMaintenanceDate || ""}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Next Maintenance Due Date"
              name="nextMaintenanceDueDate"
              type="date"
              value={formData.nextMaintenanceDueDate || ""}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Insurance Policy Number"
              name="insurancePolicyNumber"
              value={formData.insurancePolicyNumber || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Insurance Expiry Date"
              name="insuranceExpiryDate"
              type="date"
              value={formData.insuranceExpiryDate || ""}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Port Visited"
              name="lastPortVisited"
              value={formData.lastPortVisited || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="ETA Destination"
              name="etaDestination"
              type="date"
              value={formData.etaDestination || ""}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Crew Onboard Count"
              name="crewOnboardCount"
              type="number"
              value={formData.crewOnboardCount || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Technical Manager Name"
              name="technicalManagerName"
              value={formData.technicalManagerName || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Operational Manager Name"
              name="operationalManagerName"
              value={formData.operationalManagerName || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          </Grid>

        {/* Attachments and Remarks */}
        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Remarks
        </Typography>
        <Divider />
        <TextField
          label="Remarks"
          name="remarks"
          value={formData.remarks || ''}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
