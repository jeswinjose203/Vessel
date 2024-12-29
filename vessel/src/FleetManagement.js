import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Input, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import FleetEditForm from './FleetEditForm'; // Import the FleetEditForm component

const columns = [
  { field: 'fleet_id', headerName: 'Fleet ID', width: 120 },
  { field: 'fleet_name', headerName: 'Fleet Name', width: 180 },
  { field: 'fleet_type', headerName: 'Fleet Type', width: 150 },
  { field: 'fleet_region', headerName: 'Fleet Region', width: 150 },
  { field: 'fleet_owner', headerName: 'Fleet Owner', width: 200 },
  { field: 'fleet_size', headerName: 'Fleet Size', width: 120 },
  { field: 'fleet_status', headerName: 'Fleet Status', width: 150 },
  { field: 'fleet_code', headerName: 'Fleet Code', width: 150 },
];

export default function FleetManagement() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the FleetData.json file
    fetch('/static/FleetData.json')
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error('Error fetching fleet data:', error));
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true); // Open the form dialog when editing a row
  };

  const handleSave = (updatedFleet) => {
    setRows((prevRows) => {
      const index = prevRows.findIndex((fleet) => fleet.id === updatedFleet.id);
      if (index !== -1) {
        // Update existing fleet
        const updatedRows = [...prevRows];
        updatedRows[index] = updatedFleet;
        return updatedRows;
      } else {
        // Add new fleet
        return [...prevRows, updatedFleet];
      }
    });
    setOpenDialog(false); // Close the dialog after saving
  };

  const filteredFleets = rows.filter((fleet) =>
    Object.values(fleet).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      {/* Go Back Button */}
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>

      {/* Header with Fleet Details and Edit Icon */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <h1>Fleet Management</h1>

        {/* Edit Icon positioned to the right of the Fleet Details header */}
        <IconButton onClick={() => handleEditClick(selectedRow)}>
          <EditIcon />
        </IconButton>
      </Box>

      {/* Search Bar */}
      <Input
        placeholder="Search by any field..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px 0', width: '100%' }}
      />

      {/* DataGrid Table */}
      <DataGrid
        rows={filteredFleets}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableSelectionOnClick
        getRowId={(row) => row.id} // Use the 'id' field as the unique identifier
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f4f4f4',
          },
        }}
      />

      {/* Fleet Edit Form */}
      <FleetEditForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fleet={selectedRow}
        onSave={handleSave}
      />
    </Box>
  );
}
