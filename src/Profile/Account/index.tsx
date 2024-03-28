
import { useSelector } from "react-redux";
import { AuditoryState } from "../../store";
import { useEffect, useState } from "react";
import * as client from '../../Client';
import axios from "axios";

function Account() {
    const [spotifyUser, setSpotifyUser] = useState();
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);

    useEffect(() => {
        client.getSpotifyUser().then(response => {
            setSpotifyUser(response);
        })
    }, []);

    return (
        <div>
            <h1>Account</h1> <hr />
            <h4>Username: {userData.username}</h4> 
            <h4>Password: ****</h4>
            <hr />
            <h3>Spotify Details</h3>
            <h4>Spotify Username: {}</h4>
        </div>
    );
}

export default Account;