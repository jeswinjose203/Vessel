// src/FleetEditForm.js

import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const FleetEditForm = ({ open, onClose, fleet, onSave }) => {
  const [formData, setFormData] = useState({
    fleet_id: '',
    fleet_name: '',
    fleet_type: '',
    fleet_region: '',
    fleet_owner: '',
    fleet_size: 0,
    fleet_status: '',
    fleet_code: ''
  });

  useEffect(() => {
    if (fleet) {
      setFormData(fleet); // Populate form with fleet data when editing
    }
  }, [fleet]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(formData); // Save the updated data to the parent component
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Fleet</DialogTitle>
      <DialogContent>
        <TextField
          label="Fleet ID"
          name="fleet_id"
          value={formData.fleet_id}
          onChange={handleInputChange}
          fullWidth
          disabled
          margin="normal"
        />
        <TextField
          label="Fleet Name"
          name="fleet_name"
          value={formData.fleet_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Fleet Type"
          name="fleet_type"
          value={formData.fleet_type}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Fleet Region"
          name="fleet_region"
          value={formData.fleet_region}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Fleet Owner"
          name="fleet_owner"
          value={formData.fleet_owner}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Fleet Size"
          name="fleet_size"
          value={formData.fleet_size}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Fleet Status"
          name="fleet_status"
          value={formData.fleet_status}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Fleet Code"
          name="fleet_code"
          value={formData.fleet_code}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FleetEditForm;
