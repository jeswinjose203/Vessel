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

  useEffect(() => {
    setFormData(vessel || {});
  }, [vessel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["vessel_name", "imo_number", "vessel_type"];
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newVesselData = { ...formData };
    const storedVesselData = JSON.parse(localStorage.getItem("vesselData")) || [];

    if (vessel) {
      const updatedVesselData = storedVesselData.map((v) =>
        v.id === newVesselData.id ? newVesselData : v
      );
      localStorage.setItem("vesselData", JSON.stringify(updatedVesselData));
    } else {
      newVesselData.id = Date.now(); // Assign unique ID for new vessels
      storedVesselData.push(newVesselData);
      localStorage.setItem("vesselData", JSON.stringify(storedVesselData));
    }

    onSave(newVesselData);
    onClose();
  };

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
          <Grid item xs={6}>
            <TextField
              label="Vessel Name"
              name="vessel_name"
              value={formData.vesselName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="IMO Number"
              name="imo_number"
              value={formData.imoNumber || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Official Number"
              name="official_number"
              value={formData.officialNumber || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Call Sign"
              name="call_sign"
              value={formData.callSign || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Vessel Type</InputLabel>
              <Select
                name="vessel_type"
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
            <TextField
              label="Vessel Subtype"
              name="vessel_subtype"
              value={formData.vesselSubtype || ''}
              onChange={handleChange}
              fullWidth
            />
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
              name="port_of_registry"
              value={formData.portOfRegistry || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Group Owner Name"
              name="group_owner_name"
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
              name="registered_owner_name"
              value={formData.registeredOwnerName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Registered Owner Address"
              name="registered_owner_address"
              value={formData.registeredOwnerAddress || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Bareboat Charter Owner Name"
              name="bareboat_charter_name"
              value={formData.bareboatCharterName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Bareboat Charter Owner Address"
              name="bareboat_charter_address"
              value={formData.bareboatCharterAddress || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="DOC/MLC Owner"
              name="doc_mlc_owner_name"
              value={formData.docMlcOwnerName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="DOC/MLC Holder Address"
              name="doc_mlc_owner_address"
              value={formData.docMlcOwnerAddress || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Employers Agent"
              name="employer_agent_name"
              value={formData.employerAgentName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Employers Agent Address"
              name="employer_agent_address"
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
            <TextField
              label="Engine Type"
              name="engineType"
              value={formData.engineType || ""}
              onChange={handleChange}
              fullWidth
            />
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
