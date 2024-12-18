// src/App.js
import React from 'react';
import LeftNavPanel from './LeftNavPanel';
import './App.css';

function App() {
  return (
    <div className="App">
      <LeftNavPanel />
      <div className="content">
        <h1>Welcome to the Vessel Management System</h1>
        <p>This is a simple layout with a left navigation panel.</p>
      </div>
    </div>
  );
}

export default App;
