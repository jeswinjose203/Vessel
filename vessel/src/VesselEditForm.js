import React, { useState, useEffect } from 'react';
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
} from '@mui/material';

export default function VesselEditForm({ open, onClose, vessel, onSave }) {
  const [formData, setFormData] = useState(vessel || {});

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

  const handleSave = () => {
    const newVesselData = { ...formData };

    // Get current vessels data from localStorage (if any)
    const storedVesselData = JSON.parse(localStorage.getItem('vesselData')) || [];

    // Check if it's an edit or a new entry
    if (vessel) {
      // Update existing vessel
      const updatedVesselData = storedVesselData.map((v) =>
        v.id === newVesselData.id ? newVesselData : v
      );

      // Save updated data back to localStorage
      localStorage.setItem('vesselData', JSON.stringify(updatedVesselData));
    } else {
      // Add new vessel
      storedVesselData.push(newVesselData);

      // Save new data back to localStorage
      localStorage.setItem('vesselData', JSON.stringify(storedVesselData));
    }

    onSave(newVesselData); // Pass new data to parent component
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
              label="ID"
              name="id"
              value={formData.id || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Vessel ID"
              name="vessel_id"
              value={formData.vessel_id || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Vessel Name"
              name="vessel_name"
              value={formData.vessel_name || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="IMO Number"
              name="imo_number"
              value={formData.imo_number || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Official Number"
              name="official_number"
              value={formData.official_number || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Call Sign"
              name="call_sign"
              value={formData.call_sign || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Vessel Type</InputLabel>
              <Select
                name="vessel_type"
                value={formData.vessel_type || ''}
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
              value={formData.vessel_subtype || ''}
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
              value={formData.port_of_registry || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Group Owner Name"
              name="group_owner_name"
              value={formData.group_owner_name || ''}
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
              value={formData.registered_owner_name || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Registered Owner Address"
              name="registered_owner_address"
              value={formData.registered_owner_address || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Bareboat Charter Owner Name"
              name="bareboat_charter_name"
              value={formData.bareboat_charter_name || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Bareboat Charter Owner Address"
              name="bareboat_charter_address"
              value={formData.bareboat_charter_address || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="DOC/MLC Owner"
              name="doc_mlc_owner_name"
              value={formData.doc_mlc_owner_name || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="DOC/MLC Holder Address"
              name="doc_mlc_owner_address"
              value={formData.doc_mlc_owner_address || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Employers Agent"
              name="employer_agent_name"
              value={formData.employer_agent_name || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Employers Agent Address"
              name="employer_agent_address"
              value={formData.employer_agent_address || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* CBA */}
        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
          CBA
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.union === 'Yes'}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      union: e.target.checked ? 'Yes' : 'No',
                    }))
                  }
                />
              }
              label="Union (CBA displayed in the contract)"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Temporary CBA"
              name="temporary_cba"
              value={formData.temporary_cba || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Engine Details */}
        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
          Engine Details
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Main Engine Make and Model"
              name="engine_make_model"
              value={formData.engine_make_model || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Main Engine"
              name="main_engine"
              value={formData.main_engine || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.dual_fuel === 'Yes'}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      dual_fuel: e.target.checked ? 'Yes' : 'No',
                    }))
                  }
                />
              }
              label="Dual Fuel"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Main Engine Max Cont Rating (KW)"
              name="engine_max_rating"
              value={formData.engine_max_rating || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="DWT"
              name="dwt"
              value={formData.dwt || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="GRT"
              name="grt"
              value={formData.grt || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="ECDIS Type"
              name="ecdis_type"
              value={formData.ecdis_type || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Other Details */}
        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
          Other Details
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Advance Joiners Date"
              name="advance_joiners_date"
              value={formData.advance_joiners_date || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="New Vessel Code to be Assigned"
              name="new_vessel_code"
              value={formData.new_vessel_code || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Existing Code (If Existing Vessel)"
              name="existing_code"
              value={formData.existing_code || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Management</InputLabel>
              <Select
                name="management"
                value={formData.management || ''}
                onChange={handleChange}
              >
                <MenuItem value="Company A">Company A</MenuItem>
                <MenuItem value="Company B">Company B</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Attachments and Remarks */}
        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
          Attachments and Remarks
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
