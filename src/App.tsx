// Imports
import React from 'react';
import { HashRouter, useNavigate } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store, { AuditoryState } from './store';
import Navigation from './Navigation';
import Messenges from './Messenges';
import SideBarNavigation from './SideBarNavigation';
import Profile from './Profile';
import Login from './Login';
import CurrentUser from './CurrentUser';
import Post from './Post';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import PostDetails from './PostDetails';
import Search from './Search';
import Feed from './Feed';
import User from './User';

function App() {
  return (
    <Provider store={store}>
      <CurrentUser>
        <HashRouter>
          <div>
            <div className="fixed-top">
              <Navigation />
            </div>
            <div className="row">
              <div className="col-2">
                <SideBarNavigation />
              </div>
              <div className="col-8">
              <Routes>
                <Route path="profile/*" element={<Profile />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="register" element={<Register />}></Route>
                <Route path="/" element={<Feed />}></Route>
                <Route path="messages/*" element={<Messenges />}></Route>
                <Route path="post" element={<Post />}></Route>
                <Route path="details/:postId" element={<PostDetails />}></Route>
                <Route path="search" element={<Search />}></Route>
                <Route path="user/:userId" element={<User />}></Route>
              </Routes>
              </div>
            </div>
          </div>
        </HashRouter>
      </CurrentUser>
    </Provider>
  );
}

export default App;
