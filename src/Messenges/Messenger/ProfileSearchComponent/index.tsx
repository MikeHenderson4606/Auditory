
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AuditoryState } from "../../../store";
import * as client from "../../../Client";

function ProfileSearchComponent({selectedSong, selectedPlaylist, setSelectedSong, setSelectedPlaylist}: {selectedSong: any, selectedPlaylist: any, setSelectedSong: (selectedSong: any) => void, setSelectedPlaylist: (selectedPlaylist: any) => void}) {
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const getPlaylists = async () => {
            if (userData.spotify.user.userId) {
                const playlistData = await client.getSpotifyPlaylists(userData.spotify.user.userId);
                const playlists = playlistData.items;
                setPlaylists(playlists);
            }
        }
        const getSongs = async () => {
            if (userData.spotify.user.userId) {
                const trackData = await client.getSpotifyTracks(selectedPlaylist.id)
                const tracks = trackData.items;
                setSongs(tracks);
            }
        }
        getPlaylists();
        try {
            if (selectedPlaylist.id) {
                getSongs();
            }
        } catch (err) {}
    }, [userData, selectedPlaylist])

    return (
    <>
        <div className="my-3">
            <label className="input-text mb-1" htmlFor="playlistSelector">Select a playlist:</label>
            <select className="form-select" id="playlistSelector" value={selectedPlaylist.id} onChange={(e) => {
                const currPlaylist = {
                    name: e.target.options[e.target.selectedIndex].text,
                    id: e.target.value
                }
                setSelectedPlaylist(currPlaylist);
                setSelectedSong({});
            }}>
                <option value="">Choose...</option>
                {playlists.map((playlist:any, index) => {
                    return (
                        <option id={playlist.id} value={playlist.id} key={index}>{playlist.name}</option>
                    )})
                }
            </select>
        </div>
        {selectedPlaylist.id ? <div>
            <label className="input-text mb-1" htmlFor="songSelector">Select a song from {selectedPlaylist.name}:</label>
            <select className="form-select" id="songSelector" onChange={(e) => {
                const currSong = songs.find((song:any, index) => 
                    (song.track.id === e.target.value)
                )
                console.log("Selected a playlist")
                if (currSong) {
                    console.log(currSong)
                    setSelectedSong(currSong);
                }
            }}>
                <option value="">Choose...</option>
                {songs.map((song:any, index) => {
                    return (
                        <option value={song.track.id} key={index}>{song.track.name} by {song.track.artists[0].name}</option>
                    )})}
            </select>
        </div>  : <div></div>}
        {selectedSong.track ? 
            <div className="mt-3">
                Selected Song: {selectedSong.track.name} by {selectedSong.track.artists[0].name}.
            </div> :
            <div></div>
        }
    </>
    );
}

export default ProfileSearchComponent;