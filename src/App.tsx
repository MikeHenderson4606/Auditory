// Imports
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import GenericFeed from './GenericFeed';
import Messenges from './Messenges';
import SideBarNavigation from './SideBarNavigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div>
        <div className="fixed-top">
          <Navigation />
        </div>
        <div className="row">
          <div className="col-3 mt-4 ">
            <SideBarNavigation />
          </div>
          <div className="col-8">
            <Routes>
                <Route path="/" element={<GenericFeed />}></Route>
                <Route path="messages/*" element={<Messenges />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
