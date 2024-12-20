import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VesselEditForm from './VesselEditForm'; // Import the VesselEditForm component

const columns = [
  { field: 'vesselName', headerName: 'Vessel Name', width: 180 },
  { field: 'imoNumber', headerName: 'IMO Number', width: 180 },
  { field: 'officialNumber', headerName: 'Official Number', width: 150 },
  { field: 'callSign', headerName: 'Call Sign', width: 120 },
  { field: 'vesselType', headerName: 'Vessel Type', width: 150 },
  { field: 'vesselSubtype', headerName: 'Vessel Subtype', width: 150 },
  { field: 'flag', headerName: 'Flag', width: 100 },
  { field: 'portOfRegistry', headerName: 'Port of Registry', width: 180 },
  { field: 'groupOwnerName', headerName: 'Group Owner', width: 180 },
  { field: 'registeredOwnerName', headerName: 'Registered Owner', width: 180 },
  { field: 'registeredOwnerAddress', headerName: 'Registered Address', width: 200 },
  { field: 'bareboatCharterName', headerName: 'Bareboat Charter', width: 180 },
  { field: 'bareboatCharterAddress', headerName: 'Charter Address', width: 200 },
  { field: 'docMlcOwnerName', headerName: 'DOC MLC Owner', width: 180 },
  { field: 'docMlcOwnerAddress', headerName: 'DOC MLC Address', width: 200 },
  { field: 'employerAgentName', headerName: 'Employer Agent', width: 180 },
  { field: 'employerAgentAddress', headerName: 'Employer Address', width: 200 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'handoverDate', headerName: 'Handover Date', width: 150 },
  { field: 'remarks', headerName: 'Remarks', width: 200 },
  { field: 'buildYear', headerName: 'Build Year', width: 100 },
  { field: 'shipyard', headerName: 'Shipyard', width: 180 },
  { field: 'grossTonnage', headerName: 'Gross Tonnage', width: 150 },
  { field: 'netTonnage', headerName: 'Net Tonnage', width: 150 },
  { field: 'deadweightTonnage', headerName: 'Deadweight Tonnage', width: 180 },
  { field: 'lengthOverall', headerName: 'Length Overall (m)', width: 180 },
  { field: 'beam', headerName: 'Beam (m)', width: 120 },
  { field: 'draft', headerName: 'Draft (m)', width: 120 },
  { field: 'engineType', headerName: 'Engine Type', width: 150 },
  { field: 'enginePower', headerName: 'Engine Power (kW)', width: 150 },
  { field: 'speed', headerName: 'Speed (knots)', width: 120 },
  { field: 'hullMaterial', headerName: 'Hull Material', width: 150 },
  { field: 'classSociety', headerName: 'Class Society', width: 150 },
  { field: 'lastSurveyDate', headerName: 'Last Survey Date', width: 150 },
  { field: 'nextSurveyDueDate', headerName: 'Next Survey Due Date', width: 180 },
  { field: 'aisCode', headerName: 'AIS Code', width: 120 },
  { field: 'crewCapacity', headerName: 'Crew Capacity', width: 150 },
  { field: 'passengerCapacity', headerName: 'Passenger Capacity', width: 180 },
  { field: 'cargoCapacity', headerName: 'Cargo Capacity (tons)', width: 180 },
  { field: 'fuelCapacity', headerName: 'Fuel Capacity (tons)', width: 180 },
  { field: 'operationalRange', headerName: 'Operational Range (nm)', width: 180 },
  { field: 'lastMaintenanceDate', headerName: 'Last Maintenance Date', width: 180 },
  { field: 'nextMaintenanceDueDate', headerName: 'Next Maintenance Due Date', width: 200 },
  { field: 'insurancePolicyNumber', headerName: 'Insurance Policy', width: 200 },
  { field: 'insuranceExpiryDate', headerName: 'Insurance Expiry Date', width: 180 },
  { field: 'lastPortVisited', headerName: 'Last Port Visited', width: 180 },
  { field: 'etaDestination', headerName: 'ETA Destination', width: 200 },
  { field: 'crewOnboardCount', headerName: 'Crew Onboard Count', width: 180 },
  { field: 'technicalManagerName', headerName: 'Technical Manager', width: 200 },
  { field: 'operationalManagerName', headerName: 'Operational Manager', width: 200 },
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
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>

      <h1>Vessel Details</h1>
      <Input
        placeholder="Search by any field..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px 0', width: '100%' }}
      />

      <DataGrid
        rows={filteredVessels}
        columns={[
          ...columns,
          {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: (params) => (
              <Button
                variant="outlined"
                onClick={() => handleEditClick(params.row)}
              >
                Edit
              </Button>
            ),
          },
        ]}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableSelectionOnClick
      />

      <VesselEditForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        vessel={selectedRow}
        onSave={handleSave}
      />
    </Box>
  );
}
