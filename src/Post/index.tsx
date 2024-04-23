
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ProfileSearchComponent from "../Messenges/Messenger/ProfileSearchComponent";
import SearchComponent from "../Messenges/Messenger/SearchComponent";
import SongDM from "../Messenges/Messenger/SongDM";
import * as client from '../Client';
import { useSelector } from "react-redux";
import { AuditoryState } from "../store";
import { Link, Route, Routes } from "react-router-dom";
import PostDetails from "../PostDetails";

function Post() {
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    const { isLoggedIn } = useSelector((state:AuditoryState) => state.loginReducer);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [showProfileSearch, setShowProfileSearch] = useState(true);
    const [selectedPlaylist, setSelectedPlaylist] = useState<any>({});
    const [selectedSong, setSelectedSong] = useState<any>({});

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
    
    const NotLoggedInComponent = () => {
        return (
            <div className="feed-offset">
                Please login to post: 
                <Link to='/login'>Login</Link>
            </div>
        )
    }

    const LoggedInComponent = () => {
        return (
            <div className="feed-offset ms-3">
                <h1>Post</h1>
                <form>
                    <div className="mb-3">
                        <button className="btn btn-success" type="button" onClick={(e) => {
                            handleModalShow();
                        }}>
                            Attach Song
                        </button>
                        {selectedSong.track ? 
                            <button className="btn btn-outline-danger float-end" style={{border: 'none'}} onClick={(e) => {
                                setSelectedSong({})
                            }}>
                                <i className="fa fa-trash fa-2x"></i>
                            </button> : 
                            <div></div>
                        }
                    </div>
                    {selectedSong.track ? 
                        <div>
                            <SongDM title={selectedSong.track.name} artist={selectedSong.track.artists[0].name} link={"selectedSong.external_urls[0].spotify"} id={selectedSong.track.id} />
                            
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
                        {showProfileSearch ? 
                            <ProfileSearchComponent selectedSong={selectedSong} selectedPlaylist={selectedPlaylist} setSelectedSong={setSelectedSong} setSelectedPlaylist={setSelectedPlaylist} /> : 
                            <SearchComponent selectedSong={selectedSong} selectedPlaylist={selectedPlaylist} setSelectedSong={setSelectedSong} setSelectedPlaylist={setSelectedPlaylist} />}
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
    
    return (
        <div>
            {isLoggedIn.auditory ? 
                <LoggedInComponent /> :
                <NotLoggedInComponent />
            }
        </div>
        
    )
}


export default Post;