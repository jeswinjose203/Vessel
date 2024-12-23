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
  
    // Optionally, make an API call to update server-side JSON
    // saveToServer(updatedVesselData);
  
    // Close the form dialog
    onSave(newVesselData); // Pass new data to parent component
    onClose();
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{vessel ? 'Edit Vessel' : 'Add Vessel'}</DialogTitle>
      <DialogContent>
        {/* Manual Entry Fields */}
        <TextField
          label="ID"
          name="id"
          value={formData.id || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Vessel ID"
          name="vessel_id"
          value={formData.vessel_id || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Vessel Identification Fields */}
        <TextField
          label="Vessel Name"
          name="vessel_name"
          value={formData.vessel_name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="IMO Number"
          name="imo_number"
          value={formData.imo_number || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Official Number"
          name="official_number"
          value={formData.official_number || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Call Sign"
          name="call_sign"
          value={formData.call_sign || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Vessel Details */}
        <FormControl fullWidth margin="normal">
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
        <TextField
          label="Vessel Subtype"
          name="vessel_subtype"
          value={formData.vessel_subtype || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Flag"
          name="flag"
          value={formData.flag || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Port of Registry"
          name="port_of_registry"
          value={formData.port_of_registry || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Ownership Details */}
        <TextField
          label="Group Owner Name"
          name="group_owner_name"
          value={formData.group_owner_name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Registered Owner Name"
          name="registered_owner_name"
          value={formData.registered_owner_name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Registered Owner Address"
          name="registered_owner_address"
          value={formData.registered_owner_address || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Bareboat Charter Name"
          name="bareboat_charter_name"
          value={formData.bareboat_charter_name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Bareboat Charter Address"
          name="bareboat_charter_address"
          value={formData.bareboat_charter_address || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="DOC MLC Owner Name"
          name="doc_mlc_owner_name"
          value={formData.doc_mlc_owner_name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="DOC MLC Owner Address"
          name="doc_mlc_owner_address"
          value={formData.doc_mlc_owner_address || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Employer Agent Name"
          name="employer_agent_name"
          value={formData.employer_agent_name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Employer Agent Address"
          name="employer_agent_address"
          value={formData.employer_agent_address || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Technical Details */}
        <TextField
          label="Build Year"
          name="BuildYear"
          value={formData.BuildYear || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Shipyard"
          name="Shipyard"
          value={formData.Shipyard || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Gross Tonnage"
          name="GrossTonnage"
          value={formData.GrossTonnage || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Remarks"
          name="remarks"
          value={formData.remarks || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
