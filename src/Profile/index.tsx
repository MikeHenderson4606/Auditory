
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import { AuditoryState } from "../store";
import ProfileLinks from "./ProfileLinks";
import Account from "./Account";

function Profile() {
    const { isLoggedIn } = useSelector((state:AuditoryState) => state.loginReducer);
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);

    if (isLoggedIn) {
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
                                <h1>Playlists</h1>} />
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
                <Link to="/login">Login</Link>
            </div>
        )
    }
}

export default Profile;