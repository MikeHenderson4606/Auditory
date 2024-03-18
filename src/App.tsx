// Imports
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// Components
import Home from './Home';

import './App.css';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
