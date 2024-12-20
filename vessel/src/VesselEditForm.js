import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Select, MenuItem, InputLabel, FormControlLabel, Checkbox } from '@mui/material';

export default function VesselEditForm({ open, onClose, vessel, onSave }) {
  const [formData, setFormData] = useState(vessel || {});

  useEffect(() => {
    setFormData(vessel || {});
  }, [vessel]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    onSave(formData); // Save the updated or new vessel data
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{vessel ? 'Edit Vessel' : 'Create Vessel'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Vessel Name"
          name="vesselName"
          value={formData.vesselName || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="IMO Number"
          name="imoNumber"
          value={formData.imoNumber || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Official Number"
          name="officialNumber"
          value={formData.officialNumber || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Call Sign"
          name="callSign"
          value={formData.callSign || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Vessel Type</InputLabel>
          <Select
            label="Vessel Type"
            name="vesselType"
            value={formData.vesselType || ''}
            onChange={handleChange}
          >
            <MenuItem value="Cargo">Cargo</MenuItem>
            <MenuItem value="Tanker">Tanker</MenuItem>
            <MenuItem value="Bulk Carrier">Bulk Carrier</MenuItem>
            <MenuItem value="LNG Tanker">LNG Tanker</MenuItem>
            {/* Add more types as needed */}
          </Select>
        </FormControl>
        <TextField
          label="Port of Registry"
          name="portOfRegistry"
          value={formData.portOfRegistry || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Group Owner Name"
          name="groupOwnerName"
          value={formData.groupOwnerName || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Continue for all other fields, including CBA, engine details, and remarks */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.dualFuel || false}
              onChange={handleChange}
              name="dualFuel"
            />
          }
          label="Dual Fuel Engine"
        />
        <TextField
          label="Main Engine Make and Model"
          name="mainEngineMakeModel"
          value={formData.mainEngineMakeModel || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Continue adding fields as described in the requirements */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
