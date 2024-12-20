import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Sample vessel data
const vesselData = [
  { id: 1, vesselName: 'Vessel A', imoNumber: 'IMO1234', vesselType: 'Cargo', portOfRegistry: 'Port A', status: 'Active' },
  { id: 2, vesselName: 'Vessel B', imoNumber: 'IMO5678', vesselType: 'Tankers', portOfRegistry: 'Port B', status: 'Inactive' },
  { id: 3, vesselName: 'Vessel A', imoNumber: 'IMO1234', vesselType: 'Cargo', portOfRegistry: 'Port A', status: 'Active' },
  { id: 4, vesselName: 'Vessel C', imoNumber: 'IMO9101', vesselType: 'Container', portOfRegistry: 'Port C', status: 'Active' },
  { id: 5, vesselName: 'Vessel B', imoNumber: 'IMO5678', vesselType: 'Tankers', portOfRegistry: 'Port B', status: 'Inactive' },
];

const columns = [
  { field: 'vesselName', headerName: 'Vessel Name', width: 180 },
  { field: 'imoNumber', headerName: 'IMO Number', width: 180 },
  { field: 'vesselType', headerName: 'Vessel Type', width: 180 },
  { field: 'portOfRegistry', headerName: 'Port of Registry', width: 180 },
  { field: 'status', headerName: 'Status', width: 120 },
];

export default function Vessel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState(vesselData); // Use the vessel data
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  // Filter vessels based on the search term
  const filteredVessels = rows.filter((vessel) => {
    return (
      vessel.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.imoNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.vesselType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.portOfRegistry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>

      <h1>Vessel Details</h1>
      <Input
        placeholder="Search by vessel name, IMO number, or other fields..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px 0', width: '100%' }}
      />

      <DataGrid
        rows={filteredVessels}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        grouping
        disableSelectionOnClick
        groupingColDef={{
          headerName: 'Vessel Name',
          field: 'vesselName',
        }}
      />
    </Box>
  );
}
