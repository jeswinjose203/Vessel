import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Input, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Define FleetManagement component
export default function FleetManagement() {
  const [rows, setRows] = useState([]); // Fleet data
  const [vesselRows, setVesselRows] = useState([]); // Vessel data
  const [searchTerm, setSearchTerm] = useState(''); // Search input
  const [selectedFleet, setSelectedFleet] = useState(null); // Selected fleet
  const [openDialog, setOpenDialog] = useState(false); // Dialog control
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
    console.log('Selected fleet:', fleet); // Log selected fleet for debugging
    setSelectedFleet(fleet); // Set selected fleet
    setOpenDialog(true); // Open vessel dialog
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

  // Log vessels for the selected fleet
  console.log('Vessels for selected fleet:', vesselsForSelectedFleet);

  // Columns for fleet DataGrid
  const fleetColumns = [
    { field: 'fleet_id', headerName: 'Fleet ID', width: 120 },
    { field: 'fleet_name', headerName: 'Fleet Name', width: 180 },
    { field: 'fleet_type', headerName: 'Fleet Type', width: 150 },
    { field: 'fleet_region', headerName: 'Fleet Region', width: 150 },
    { field: 'fleet_owner', headerName: 'Fleet Owner', width: 200 },
    { field: 'fleet_size', headerName: 'Fleet Size', width: 120 },
    { field: 'fleet_status', headerName: 'Fleet Status', width: 150 },
  ];

  // Columns for vessel DataGrid
  const vesselColumns = [
    { field: 'vessel_id', headerName: 'Vessel ID', width: 120 },
    { field: 'vessel_name', headerName: 'Vessel Name', width: 200 },
    { field: 'vessel_type', headerName: 'Vessel Type', width: 150 },
    { field: 'vessel_status', headerName: 'Vessel Status', width: 150 },
    { field: 'BuildYear', headerName: 'Build Year', width: 120 },
    { field: 'Speed', headerName: 'Speed (knots)', width: 120 },
  ];

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
        columns={fleetColumns}
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
        <DialogTitle>
          Vessels in Fleet: {selectedFleet?.fleet_name || ''}
        </DialogTitle>
        <DialogContent>
          {vesselsForSelectedFleet.length > 0 ? (
            <DataGrid
              rows={vesselsForSelectedFleet}
              columns={vesselColumns}
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
          ) : (
            <p>No vessels found for this fleet.</p>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
