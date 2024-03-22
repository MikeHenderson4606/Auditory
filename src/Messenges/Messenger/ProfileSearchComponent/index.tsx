
import React, { useState } from "react";

function ProfileSearchComponent({selectedSong, selectedPlaylist, setSelectedSong, setSelectedPlaylist}: 
    {selectedSong: any, selectedPlaylist: any, setSelectedSong: (selectedSong: any) => void, setSelectedPlaylist: (selectedPlaylist: any) => void}) {
    const playlists = [
        {
            name: "Playlist 1",
            id: "P1"
        },
        {
            name: "Playlist 2",
            id: "P2"
        },
    ];

    const songs = [
        {
            title: "Song 1",
            artist: "Artist 1",
            link: "Link",
            for: "P1",
            id: "S1",
        },
        {
            title: "Song 2",
            artist: "Artist 2",
            link: "Link",
            for: "P1",
            id: "S2"
        },
        {
            title: "Song 3",
            artist: "Artist 3",
            link: "Link",
            for: "P2",
            id: "S3"
        },
        {
            title: "Song 4",
            artist: "Artist 4",
            link: "Link",
            for: "P2",
            id: "S4"
        },
    ];

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
                setSelectedSong({
                    title: "",
                    artist: "",
                    link: "",
                    id: ""
                });
            }}>
                <option value="">Choose...</option>
                {playlists.map((playlist, index) => {
                    return (
                        <option value={playlist.id} key={index}>{playlist.name}</option>
                    )
                })}
            </select>
        </div>
        <div>
            <label className="input-text mb-1" htmlFor="songSelector">Select a song from {selectedPlaylist.name}:</label>
            <select className="form-select" id="songSelector" value={selectedSong.id} onChange={(e) => {
                const currSong = songs.find((song, index) => 
                    (song.id === e.target.value)
                )
                if (currSong) {
                    setSelectedSong(currSong);
                }
            }}>
                <option value="">Choose...</option>
                {songs.map((song, index) => {
                    if (song.for === selectedPlaylist.id) {
                        return (
                            <option value={song.id} key={index}>{song.title} by {song.artist}</option>
                        );
                    }
                })}
            </select>
        </div>
        {((selectedSong.id !== "") && 
            <div className="mt-3">
                Selected Song: {selectedSong.title} by {selectedSong.artist}.
            </div>
        )}
    </>
    );
}

export default ProfileSearchComponent;