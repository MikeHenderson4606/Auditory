
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import { AuditoryState } from "../store";
import * as client from "../Client";
import ProfileLinks from "./ProfileLinks";
import Account from "./Account";
import Playlists from "./Playlists";
import SpecificPlaylist from "./Playlists/SpecificPlaylist";
import { useEffect, useState } from "react";
import { setLoggedIn } from "../Login/loginReducer";
import { setUserData } from "../Login/userDataReducer";

function Profile() {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state:AuditoryState) => state.loginReducer);
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    
    if (isLoggedIn.auditory) {
        return (
            <div style={{marginTop: "100px"}}>
                <div className="row ms-3">
                    <ProfileLinks />
                    <div className="col-8 bg-secondary-subtle p-2 border rounded">
                        <Routes>
                            <Route path="/" element={
                                <Navigate to='account' />
                            }></Route>
                            <Route path="account" element={
                                <Account />} />
                            <Route path="playlists" element={
                                <Playlists />} />
                            <Route path="playlists/song/:playlistId/:playlistName" element={
                                <SpecificPlaylist />}/>
                            <Route path="settings" element={
                                <h1>Settings</h1>} />
                        </Routes>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{marginTop: "100px"}}>
                You are not logged in, please log in here:
                <Link className="ps-1" to="/login">Login</Link>
            </div>
        )
    }
}

export default Profile;