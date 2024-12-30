import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Input, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Define FleetManagement component
export default function FleetManagement() {
  const [rows, setRows] = useState([]); // Fleet data
  const [vesselRows, setVesselRows] = useState([]); // Vessel data
  const [searchTerm, setSearchTerm] = useState(''); // Search input
  const [selectedFleet, setSelectedFleet] = useState(null); // Selected fleet
  const [openDialog, setOpenDialog] = useState(false); // Dialog control
  const [fleetName, setFleetName] = useState(''); // Editable fleet name
  const [businessUnit, setBusinessUnit] = useState(''); // Editable business unit
  const [department, setDepartment] = useState(''); // Editable department
  const [fleetManager, setFleetManager] = useState(''); // Editable fleet manager
  const [groupHead, setGroupHead] = useState(''); // Editable group head
  const navigate = useNavigate();

  // Fetch fleet and vessel data on component mount
  useEffect(() => {
    fetch('/static/FleetData.json')
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error('Error fetching fleet data:', error));

    fetch('/static/VesselData.json')
      .then((response) => response.json())
      .then((data) => setVesselRows(data))
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleGoBack = () => navigate(-1); // Navigate back

  const handleRowClick = (fleet) => {
    setSelectedFleet(fleet); // Set selected fleet
    setOpenDialog(true); // Open vessel dialog
    setFleetName(fleet.fleet_name); // Populate fleet name for editing
    setBusinessUnit(fleet.business_unit || ''); // Default to empty if not available
    setDepartment(fleet.department || ''); // Default to empty if not available
    setFleetManager(fleet.fleet_manager || ''); // Default to empty if not available
    setGroupHead(fleet.group_head || ''); // Default to empty if not available
  };

  const handleSaveChanges = () => {
    const updatedFleet = {
      ...selectedFleet,
      fleet_name: fleetName,
      business_unit: businessUnit,
      department: department,
      fleet_manager: fleetManager,
      group_head: groupHead,
    };
    // Here you can update the fleet in your database or state
    const updatedFleets = rows.map((fleet) =>
      fleet.fleet_id === updatedFleet.fleet_id ? updatedFleet : fleet
    );
    setRows(updatedFleets); // Update the local fleet data
    setSelectedFleet(updatedFleet); // Update selected fleet
    setOpenDialog(false); // Close the dialog
  };

  const handleAddVessel = (vessel) => {
    const updatedVesselRows = [...vesselRows, { ...vessel, fleet_id: selectedFleet.fleet_id }];
    setVesselRows(updatedVesselRows); // Add vessel to fleet
  };

  const handleRemoveVessel = (vesselId) => {
    const updatedVesselRows = vesselRows.filter((vessel) => vessel.vessel_id !== vesselId);
    setVesselRows(updatedVesselRows); // Remove vessel from fleet
  };

  // Filter fleets based on search input
  const filteredFleets = rows.filter((fleet) =>
    Object.values(fleet).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Filter vessels that belong to the selected fleet
  const vesselsForSelectedFleet = vesselRows.filter(
    (vessel) => vessel.fleet_id === selectedFleet?.fleet_id
  );

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      {/* Go Back Button */}
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <h1>Fleet Management</h1>
      </Box>

      {/* Search Bar */}
      <Input
        placeholder="Search by any field..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px 0', width: '100%' }}
      />

      {/* Fleet DataGrid */}
      <DataGrid
        rows={filteredFleets}
        columns={[
          { field: 'fleet_id', headerName: 'Fleet ID', width: 120 },
          { field: 'fleet_name', headerName: 'Fleet Name', width: 180 },
          { field: 'fleet_type', headerName: 'Fleet Type', width: 150 },
          { field: 'fleet_region', headerName: 'Fleet Region', width: 150 },
          { field: 'fleet_owner', headerName: 'Fleet Owner', width: 200 },
          { field: 'fleet_size', headerName: 'Fleet Size', width: 120 },
          { field: 'fleet_status', headerName: 'Fleet Status', width: 150 },
        ]}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableSelectionOnClick
        getRowId={(row) => row.fleet_id}
        onRowClick={(params) => handleRowClick(params.row)}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f4f4f4',
          },
        }}
      />

      {/* Dialog for Vessel List */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Manage Fleet: {selectedFleet?.fleet_name || ''}</DialogTitle>
        <DialogContent
          sx={{
            maxHeight: '60vh', // Set max height for the dialog content
            overflowY: 'auto', // Make it scrollable
          }}
        >
          {/* Editable Fields */}
          <TextField
            label="Fleet Name"
            fullWidth
            value={fleetName}
            onChange={(e) => setFleetName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Business Unit"
            fullWidth
            value={businessUnit}
            onChange={(e) => setBusinessUnit(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Department"
            fullWidth
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Fleet Manager"
            fullWidth
            value={fleetManager}
            onChange={(e) => setFleetManager(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Group Head"
            fullWidth
            value={groupHead}
            onChange={(e) => setGroupHead(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Vessel DataGrid */}
          <DataGrid
            rows={vesselsForSelectedFleet}
            columns={[
              { field: 'vessel_id', headerName: 'Vessel ID', width: 120 },
              { field: 'vessel_name', headerName: 'Vessel Name', width: 200 },
              { field: 'vessel_type', headerName: 'Vessel Type', width: 150 },
              { field: 'vessel_status', headerName: 'Vessel Status', width: 150 },
              { field: 'BuildYear', headerName: 'Build Year', width: 120 },
              { field: 'Speed', headerName: 'Speed (knots)', width: 120 },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 150,
                renderCell: (params) => (
                  <Button
                    color="error"
                    onClick={() => handleRemoveVessel(params.row.vessel_id)}
                  >
                    Remove Vessel
                  </Button>
                ),
              },
            ]}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            disableSelectionOnClick
            getRowId={(row) => row.vessel_id}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f4f4f4',
              },
            }}
          />

          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
