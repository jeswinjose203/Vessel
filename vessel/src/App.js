import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LeftNavPanel from './LeftNavPanel'; // Sidebar component
import Vessel from './Vessel'; // Your Vessel component
import MasterData from './MasterData';
import FleetManagement from './FleetManagement';
import './App.css';
import Login from './Login';
import Signup from './Signup';

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="app-container">
      {!isAuthPage && <LeftNavPanel />}
      <div className="content"> {/* Content area */}
        <Routes>
          {/* Default route redirects to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/vessel" element={<Vessel />} />
          <Route path="/master-data" element={<MasterData />} />
          <Route path="/fleet-management" element={<FleetManagement />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
