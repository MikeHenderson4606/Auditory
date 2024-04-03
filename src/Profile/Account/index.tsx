
import { useSelector } from "react-redux";
import { AuditoryState } from "../../store";
import { useEffect, useState } from "react";
import * as client from '../../Client';
import axios from "axios";

function Account() {
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);

    return (
        <div>
            <h1>Account</h1> <hr />
            <h4>Username: {userData.auditory.username}</h4> 
            <h4>Password: ****</h4>
            <hr />
            <h3>Spotify Details</h3>
            <h4>Spotify Username: {userData.spotify.accessToken}</h4>
        </div>
    );
}

export default Account;