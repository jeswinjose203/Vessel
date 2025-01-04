import React, { useState, useEffect } from 'react'; // Add useState and useEffect
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid
import { Box, Button, Input, Menu, MenuItem, Checkbox } from '@mui/material'; // Import Material-UI components
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import VesselEditForm from './VesselEditForm'; // Import VesselEditForm component
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const allColumns = [
  { field: 'vesselId', headerName: 'Vessel ID', width: 120 },
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
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const defaultVisibleColumns = [
    { field: 'vesselName', headerName: 'Vessel Name', width: 180 },
    { field: 'vesselType', headerName: 'Vessel Type', width: 150 },
    { field: 'vesselSubtype', headerName: 'Vessel Subtype', width: 150 },
    { field: 'flag', headerName: 'Flag', width: 100 },
    { field: 'portOfRegistry', headerName: 'Port of Registry', width: 180 },
    { field: 'registeredOwnerName', headerName: 'Registered Owner', width: 180 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'remarks', headerName: 'Remarks', width: 200 },
    { field: 'buildYear', headerName: 'Build Year', width: 100 },
  ];

  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:5009/vesseldata')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Ensure that each row has a unique id field for DataGrid
        const rowsWithId = data.map((item, index) => ({
          id: index, // Ensure each row has a unique ID
          vesselId: item.vesselId,
          vesselName: item.vesselName,
          imoNumber: item.imoNumber,
          officialNumber: item.officialNumber,
          callSign: item.callSign,
          vesselType: item.vesselType,
          vesselSubtype: item.vesselSubtype,
          flag: item.flag,
          portOfRegistry: item.portOfRegistry,
          groupOwnerName: item.groupOwnerName,
          registeredOwnerName: item.registeredOwnerName,
          registeredOwnerAddress: item.registeredOwnerAddress,
          bareboatCharterName: item.bareboatCharterName,
          bareboatCharterAddress: item.bareboatCharterAddress,
          docMlcOwnerName: item.docMlcOwnerName,
          docMlcOwnerAddress: item.docMlcOwnerAddress,
          employerAgentName: item.employerAgentName,
          employerAgentAddress: item.employerAgentAddress,
          status: item.status,
          handoverDate: item.handoverDate,
          remarks: item.remarks,
          buildYear: item.buildYear,
          shipyard: item.shipyard,
          grossTonnage: item.grossTonnage,
          netTonnage: item.netTonnage,
          deadweightTonnage: item.deadweightTonnage,
          lengthOverall: item.lengthOverall,
          beam: item.beam,
          draft: item.draft,
          engineType: item.engineType,
          enginePower: item.enginePower,
          speed: item.speed,
          hullMaterial: item.hullMaterial,
          classSociety: item.classSociety,
          lastSurveyDate: item.lastSurveyDate,
          nextSurveyDueDate: item.nextSurveyDueDate,
          aisCode: item.aisCode,
          crewCapacity: item.crewCapacity,
          passengerCapacity: item.passengerCapacity,
          cargoCapacity: item.cargoCapacity,
          fuelCapacity: item.fuelCapacity,
          operationalRange: item.operationalRange,
          lastMaintenanceDate: item.lastMaintenanceDate,
          nextMaintenanceDueDate: item.nextMaintenanceDueDate,
          insurancePolicyNumber: item.insurancePolicyNumber,
          insuranceExpiryDate: item.insuranceExpiryDate,
          lastPortVisited: item.lastPortVisited,
          etaDestination: item.etaDestination,
          crewOnboardCount: item.crewOnboardCount,
          technicalManagerName: item.technicalManagerName,
          operationalManagerName: item.operationalManagerName,
        }));
        setRows(rowsWithId);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleSave = (updatedVessel) => {
    setRows((prevRows) => {
      const index = prevRows.findIndex((vessel) => vessel.id === updatedVessel.id);
      if (index !== -1) {
        const updatedRows = [...prevRows];
        updatedRows[index] = updatedVessel;
        return updatedRows;
      } else {
        return [...prevRows, updatedVessel];
      }
    });
    setOpenDialog(false);
  };

  const handleSearch = () => {
    const filteredRows = rows.filter((row) =>
      row.vesselName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRows(filteredRows);
  };

  const handleColumnToggle = (column) => {
    const columnIndex = visibleColumns.findIndex((col) => col.field === column.field);
    if (columnIndex === -1) {
      setVisibleColumns([...visibleColumns, column]);
    } else {
      setVisibleColumns(visibleColumns.filter((col) => col.field !== column.field));
    }
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const filteredVessels = rows.filter((vessel) =>
    Object.values(vessel).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const handleFilterMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEditClick = () => {
    // Navigate to the Vessel Edit page with the selected row details
    navigate('/edit-vessel', { state: { vesselId: selectedRow.vesselId } });
  };

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <h1>Vessel Details</h1>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
    <IconButton onClick={() => handleEditClick(selectedRow)}>
      <EditIcon />
    </IconButton>
    <Button variant="outlined" onClick={handleFilterMenuClick}>
      Filter Columns
    </Button>
  </Box>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterMenuClose}>
          {allColumns.map((column) => (
            <MenuItem key={column.field}>
              <Checkbox
                checked={visibleColumns.includes(column)}
                onChange={() => handleColumnToggle(column)}
              />
              {column.headerName}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by vessel name"
      />
      <Button onClick={handleSearch}>Search</Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={visibleColumns}
          pageSize={5}
          onRowClick={handleRowClick}
          rowsPerPageOptions={[5]}
        />
      </div>
      {openDialog && (
        <VesselEditForm
          vesselData={selectedRow}
          onClose={handleDialogClose}
          onEditClick={handleEditClick}
        />
      )}
    </Box>
  );
}
