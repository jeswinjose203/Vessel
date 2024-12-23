import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Input, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VesselEditForm from './VesselEditForm'; // Import the VesselEditForm component

const columns = [
  { field: 'vessel_id', headerName: 'Vessel ID', width: 120 },
  { field: 'vessel_name', headerName: 'Vessel Name', width: 180 },
  { field: 'imo_number', headerName: 'IMO Number', width: 180 },
  { field: 'official_number', headerName: 'Official Number', width: 150 },
  { field: 'call_sign', headerName: 'Call Sign', width: 120 },
  { field: 'vessel_type', headerName: 'Vessel Type', width: 150 },
  { field: 'vessel_subtype', headerName: 'Vessel Subtype', width: 150 },
  { field: 'flag', headerName: 'Flag', width: 100 },
  { field: 'port_of_registry', headerName: 'Port of Registry', width: 180 },
  { field: 'group_owner_name', headerName: 'Group Owner', width: 180 },
  { field: 'registered_owner_name', headerName: 'Registered Owner', width: 180 },
  { field: 'registered_owner_address', headerName: 'Registered Address', width: 200 },
  { field: 'bareboat_charter_name', headerName: 'Bareboat Charter', width: 180 },
  { field: 'bareboat_charter_address', headerName: 'Charter Address', width: 200 },
  { field: 'doc_mlc_owner_name', headerName: 'DOC MLC Owner', width: 180 },
  { field: 'doc_mlc_owner_address', headerName: 'DOC MLC Address', width: 200 },
  { field: 'employer_agent_name', headerName: 'Employer Agent', width: 180 },
  { field: 'employer_agent_address', headerName: 'Employer Address', width: 200 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'handover_date', headerName: 'Handover Date', width: 150 },
  { field: 'remarks', headerName: 'Remarks', width: 200 },
  { field: 'BuildYear', headerName: 'Build Year', width: 100 },
  { field: 'Shipyard', headerName: 'Shipyard', width: 180 },
  { field: 'GrossTonnage', headerName: 'Gross Tonnage', width: 150 },
  { field: 'NetTonnage', headerName: 'Net Tonnage', width: 150 },
  { field: 'DeadweightTonnage', headerName: 'Deadweight Tonnage', width: 180 },
  { field: 'LengthOverall', headerName: 'Length Overall (m)', width: 180 },
  { field: 'Beam', headerName: 'Beam (m)', width: 120 },
  { field: 'Draft', headerName: 'Draft (m)', width: 120 },
  { field: 'EngineType', headerName: 'Engine Type', width: 150 },
  { field: 'EnginePower', headerName: 'Engine Power (kW)', width: 150 },
  { field: 'Speed', headerName: 'Speed (knots)', width: 120 },
  { field: 'HullMaterial', headerName: 'Hull Material', width: 150 },
  { field: 'ClassSociety', headerName: 'Class Society', width: 150 },
  { field: 'LastSurveyDate', headerName: 'Last Survey Date', width: 150 },
  { field: 'NextSurveryDueDate', headerName: 'Next Survey Due Date', width: 180 },
  { field: 'AISCode', headerName: 'AIS Code', width: 120 },
  { field: 'CrewCapacity', headerName: 'Crew Capacity', width: 150 },
  { field: 'PassengerCapacity', headerName: 'Passenger Capacity', width: 180 },
  { field: 'CargoCapacity', headerName: 'Cargo Capacity (tons)', width: 180 },
  { field: 'FuelCapacity', headerName: 'Fuel Capacity (tons)', width: 180 },
  { field: 'OperationalRange', headerName: 'Operational Range (nm)', width: 180 },
  { field: 'LastMaintenanceDate', headerName: 'Last Maintenance Date', width: 180 },
  { field: 'NextMaintenanceDueDate', headerName: 'Next Maintenance Due Date', width: 200 },
  { field: 'InsurancePolicyNumber', headerName: 'Insurance Policy', width: 200 },
  { field: 'InsuranceExpiryDate', headerName: 'Insurance Expiry Date', width: 180 },
  { field: 'LastPortVisited', headerName: 'Last Port Visited', width: 180 },
  { field: 'ETADestination', headerName: 'ETA Destination', width: 200 },
  { field: 'CrewOnboardCount', headerName: 'Crew Onboard Count', width: 180 },
  { field: 'TechnicalManagerName', headerName: 'Technical Manager', width: 200 },
  { field: 'OperationalManagerName', headerName: 'Operational Manager', width: 200 },
];

export default function Vessel() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/static/vesselData.json')
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error('Error fetching vessel data:', error));
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true); // Open the form dialog when editing a row
  };

  const handleSave = (updatedVessel) => {
    setRows((prevRows) => {
      const index = prevRows.findIndex((vessel) => vessel.id === updatedVessel.id);
      if (index !== -1) {
        // Update existing vessel
        const updatedRows = [...prevRows];
        updatedRows[index] = updatedVessel;
        return updatedRows;
      } else {
        // Add new vessel
        return [...prevRows, updatedVessel];
      }
    });
    setOpenDialog(false); // Close the dialog after saving
  };

  const filteredVessels = rows.filter((vessel) =>
    Object.values(vessel).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      {/* Go Back Button */}
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>

      {/* Header with Vessel Details and Edit Icon */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <h1>Vessel Details</h1>

        {/* Edit Icon positioned to the right of the Vessel Details header */}
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
        rows={filteredVessels}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f4f4f4',
          },
        }}
      />

      {/* Vessel Edit Form */}
      <VesselEditForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        vessel={selectedRow}
        onSave={handleSave}
      />
    </Box>
  );
}
  