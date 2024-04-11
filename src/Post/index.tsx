
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ProfileSearchComponent from "../Messenges/Messenger/ProfileSearchComponent";
import SearchComponent from "../Messenges/Messenger/SearchComponent";
import SongDM from "../Messenges/Messenger/SongDM";
import * as client from '../Client';
import { useSelector } from "react-redux";
import { AuditoryState } from "../store";

function Post() {
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [showProfileSearch, setShowProfileSearch] = useState(true);
    const [playlists, setPlaylists] = useState({});
    const [songs, setSongs] = useState({});
    const [selectedPlaylist, setSelectedPlaylist] = useState({
        name: "",
        id: ""
    });
    const [selectedSong, setSelectedSong] = useState({
        title: "",
        artist: "",
        link: "",
        id: ""
    });

    const handleModalShow = () => {
        setShowModal(!showModal);
    }

    const showProfileSearchOptions = () => {
        setShowProfileSearch(true);
        setActiveTab("profile");
    }

    const showSearchOptions = () => {
        setShowProfileSearch(false);
        setActiveTab("search");
    }

    useEffect(() => {
        client.getSpotifyPlaylists(userData.spotify.user.userId).then(response => {
            setPlaylists(response.data);
        })
    })

    return (
        <div className="feed-offset">
            <h1>Post</h1>
            <form>
                <div className="mb-3">
                    <button className="btn btn-success" type="button" onClick={(e) => {
                        handleModalShow();
                    }}>
                        Attach Song
                    </button>
                    {selectedSong.id !== "" ? 
                    <button className="btn btn-outline-danger float-end" style={{border: 'none'}} onClick={(e) => {
                        setSelectedSong({
                            title: "",
                            artist: "",
                            link: "",
                            id: ""
                        })
                    }}>
                        <i className="fa fa-trash fa-2x"></i>
                    </button> : 
                    <div></div>}
                </div>
                {selectedSong.id !== "" ? 
                <div>
                    <SongDM title={selectedSong.title} artist={selectedSong.artist} link={selectedSong.link} id={selectedSong.id} />
                    
                </div> : 
                <div></div>}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Post Description</label>
                    <textarea className="form-control" id="exampleInputEmail1" placeholder="Optional"/>
                </div>
                <button type="submit" className="btn btn-success">Post</button>
            </form>
            <Modal show={showModal} onHide={handleModalShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Song</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button className={activeTab === "profile" ? "nav-link active" : "nav-link"} onClick={showProfileSearchOptions}>From Profile</button>
                        </li>
                        <li className="nav-item">
                            <button className={activeTab === "search" ? "nav-link active" : "nav-link"} onClick={showSearchOptions}>From Search</button>
                        </li>
                    </ul>
                    {showProfileSearch ? <ProfileSearchComponent selectedSong={selectedSong} selectedPlaylist={selectedPlaylist} setSelectedSong={setSelectedSong} setSelectedPlaylist={setSelectedPlaylist} /> : <SearchComponent />}
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger' onClick={() => {
                        handleModalShow();
                    }}>
                        Cancel
                    </button>
                    <button className='btn btn-success' onClick={() => {
                        handleModalShow();
                    }}>
                        Attach
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Post;