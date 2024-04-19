import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as client from "../../../Client";
import AuditoryModal from "../../../AuditoryModal";

function PlaylistTracks() {
    const { playlistId, playlistName } = useParams();
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState([]);
    const [modalText, setModalText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState("");
    const [likedSongs, setLikedSongs] = useState({});
    const navigate = useNavigate();

    const editSearch = (input:any) => {
        if (input === "") {
            setFilteredTracks(tracks);
        } else {
            const appliedSearch = tracks.filter((item:any) => {
                const splitInput = input.split(' ');
                // TODO: Implement a better search
                // splitInput.map((word:string) => {
                //     item.track.name.toLowerCase().includes(word.toLowerCase()) || item.track.artists[0].name.toLowerCase().includes(word.toLowerCase());
                // });
                return item.track.name.toLowerCase().includes(input.toLowerCase()) || item.track.artists[0].name.toLowerCase().includes(input.toLowerCase());
            });
            setFilteredTracks(appliedSearch);
        }
    }

    const getLikedSongs = () => {
        client.getLikedSongs().then(response => {
            if (response === 400) {
                setModalText("There was an error playing the track. Please ensure Spotify is open, you are not listening along to anyone, and try again.");
                setShowModal(!showModal);
            } else {
                setLikedSongs(response.data);
                console.log(response.data);
            }
        })
    }

    const playSong = (trackId:string) => {
        console.log(trackId);
        setCurrentlyPlayingTrack(trackId);
        client.playSong(trackId).then(response => {
            if (response === 400) {
                setModalText("There was an error playing the track. Please ensure Spotify is open, you are not listening along to anyone, and try again.");
                setShowModal(!showModal);
                setCurrentlyPlayingTrack("");
            }
        })
    }

    const pauseSong = () => {
        setCurrentlyPlayingTrack("");
        client.pauseSong().then(response => {
            if (response === 400) {
                setModalText("There was an error playing the track. Please ensure Spotify is open, you are not listening along to anyone, and try again.");
                setShowModal(!showModal);
                setCurrentlyPlayingTrack("");
            }
        })
    }

    const handleModalShow = () => {
        setShowModal(!showModal);
    }

    useEffect(() => {
        const getTracksFromPlaylist = async () => {
            if (tracks.length === 0) {
                const response = await client.getSpotifyTracks(playlistId);
                setTracks(response.items);
                setFilteredTracks(response.items);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
        getTracksFromPlaylist();
    })

    return (
        <div>
            <h1 className="text-center">{playlistName}</h1>
            <button className="btn btn-outline-success no-border mb-1" style={{border: "none"}} onClick={(e) => {
                navigate('/profile/playlists');
            }}>
                <i className="fa fa-arrow-left fa-1x"> Back</i>
            </button>
            {!loading ?
            <div>
                <input type="text" placeholder={`Search through playlist`} className="form-control mb-1" onChange={(e) =>{
                    editSearch(e.target.value);
                }} />
                <ul className="list-group">
                    {filteredTracks.map((track:any, index:number) => {
                        let playButton = (<div></div>);
                        let activeFlag = false;
                        if (track.track.uri === currentlyPlayingTrack) {
                            activeFlag = true;
                            playButton = (
                                <button className="btn btn-outline-success no-border" style={{border: "none"}} onClick={(e) => {
                                    pauseSong();
                                }}>
                                    <i className="fa fa-pause-circle fa-2x"></i>
                                </button>
                            )
                        } else {
                            playButton = (
                                <button className="btn btn-outline-success no-border" style={{border: "none"}} onClick={(e) => {
                                    playSong(track.track.uri);
                                }}>
                                    <i className="fa fa-play-circle fa-2x"></i>
                                </button>
                            )
                        }
                        return (
                            <li className={activeFlag ? "list-group-item text-center list-group-item-success" : "list-group-item text-center"} key={index}>
                                <h5>
                                    {track.track.name}
                                    <img className="position-relative img-thumbnail float-end border rounded" width="20%" height="20%" src={track.track.album.images[0].url}></img>
                                </h5>
                                <h6>
                                    {track.track.artists[0].name}
                                </h6>
                                {playButton}
                                <button className="btn btn-outline-success no-border position-relative justify-center fs-4 ms-1" style={{border: "none"}}>
                                    <i className="fa fa-share"></i>
                                </button>
                                
                            </li>
                        )
                    })}
                </ul>
            </div> :
            <div>
                Your tracks are loading... hold tight.
            </div>
            }
            <AuditoryModal text={modalText} showModal={showModal} onHide={handleModalShow} />
        </div>
    )
}

export default PlaylistTracks;