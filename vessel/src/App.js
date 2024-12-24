import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LeftNavPanel from './LeftNavPanel'; // Sidebar component
import Vessel from './Vessel'; // Your Vessel component
import MasterData from './MasterData';
import FleetManagement from './FleetManagement';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <LeftNavPanel /> {/* Sidebar */}
        <div className="content"> {/* Content area */}
          <Routes>
            {/* Default route redirects to /vessel */}
            <Route path="/" element={<Navigate to="/vessel" replace />} />
            <Route path="/vessel" element={<Vessel />} />
            <Route path="/master-data" element={<MasterData />} />
            <Route path="/fleet-management" element={<FleetManagement />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
