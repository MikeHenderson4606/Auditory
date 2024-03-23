// Imports
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navigation from './Navigation';
import GenericFeed from './GenericFeed';
import Messenges from './Messenges';
import SideBarNavigation from './SideBarNavigation';
import Profile from './Profile';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <div className="fixed-top">
            <Navigation />
          </div>
          <Routes>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="/" element={
              <div className="row">
                <div className="col-3 mt-4 ">
                  <SideBarNavigation />
                </div>
                <div className="col-8">
                  <GenericFeed />
                </div>
              </div>
            }></Route>
            <Route path="messages/*" element={
              <div className="row">
                <div className="col-3 mt-4 ">
                  <SideBarNavigation />
                </div>
                <div className="col-8">
                  <Messenges />
                </div>
              </div>
            }></Route>
          </Routes>
          
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
