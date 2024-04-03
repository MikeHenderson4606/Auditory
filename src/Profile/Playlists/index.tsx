
import React, { useEffect, useState } from 'react';
import * as client from '../../Client';
import { Routes, Route } from 'react-router';
import SpecificPlaylist from './SpecificPlaylist';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuditoryState } from '../../store';

function Playlists() {
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const getPlaylists = async () => {
            const playlistData = await client.getSpotifyPlaylists(userData.spotify.user.userId);
            const playlists = playlistData.items;
            setPlaylists(playlists);
        }
        getPlaylists();
    }, []);

    return (
        <div>
            <h1>Playlists</h1>
            <div className="list-group">
                {playlists.map((playlist:any, index) => {
                    return (
                        <Link to={`song/${playlist.id}/${playlist.name}`} className="list-group-item list-group-item-action list-group-item-light" key={index}>{playlist.name}</Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Playlists;