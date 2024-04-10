
import React, { useEffect, useState } from 'react';
import * as client from '../../Client';
import { Routes, Route } from 'react-router';
import SpecificPlaylist from './PlaylistTracks';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuditoryState } from '../../store';

function Playlists() {
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const getPlaylists = async () => {
            if (userData.spotify.user.userId) {
                const playlistData = await client.getSpotifyPlaylists(userData.spotify.user.userId);
                const playlists = playlistData.items;
                console.log(playlists);
                setPlaylists(playlists);
            }
        }
        getPlaylists();
    }, [userData]);

    return (
        <div>
            <h1 className="text-center">Playlists</h1>
            <div className="list-group">
                {playlists.map((playlist:any, index) => {
                    return (
                        <Link to={`song/${playlist.id}/${playlist.name}`} className="list-group-item list-group-item-action list-group-item-light" key={index}>
                            <div className="row">
                                <div className="col-8">
                                    <h5>
                                        {playlist.name}
                                    </h5>
                                    <h6>
                                        {playlist.owner.display_name}
                                    </h6>
                                </div>
                                <div className="col-4">
                                    <img width="60%" height="60%" className="img-thumbnail float-end border rounded" src={playlist.images[0].url} />
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Playlists;