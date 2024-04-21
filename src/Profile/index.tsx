
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import { AuditoryState } from "../store";
import * as client from "../Client";
import Account from "./Account";
import Playlists from "./Playlists";
import SpecificPlaylist from "./Playlists/PlaylistTracks";
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
                    
                    <div className="col-10 bg-secondary-subtle p-2 border rounded mt-2" style={{marginLeft: "200px"}}>
                        <Routes>
                            <Route path="/" element={
                                <Navigate to='account/posts' />
                            }></Route>
                            <Route path="account/*" element={
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