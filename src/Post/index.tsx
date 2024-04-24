
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ProfileSearchComponent from "../Messenges/Messenger/ProfileSearchComponent";
import SearchComponent from "../Messenges/Messenger/SearchComponent";
import SongDM from "../Messenges/Messenger/SongDM";
import * as client from '../Client';
import { useSelector } from "react-redux";
import { AuditoryState } from "../store";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import PostDetails from "../PostDetails";

function Post() {
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    const { isLoggedIn } = useSelector((state:AuditoryState) => state.loginReducer);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [showProfileSearch, setShowProfileSearch] = useState(true);
    const [selectedPlaylist, setSelectedPlaylist] = useState<any>({});
    const [selectedSong, setSelectedSong] = useState<any>({});
    const navigate = useNavigate();
    let description = "";

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

    const handleDescription = (e:any) => {
        description = e.target.value;
    }

    console.log(selectedSong);

    const createPost = async () => {
        console.log(description);
        const user = await client.getProfile();
        const id = Date.now();
        const post = {
            title: selectedSong.track.name,
            artist: selectedSong.track.artists[0].name,
            poster: user.username,
            posterId: user.userId,
            description: description,
            id: id,
            likedBy: [{}],
            spotifyId: selectedSong.track.id,
            cover: selectedSong.track.album.images[0].url
        };
        const userPosts = user.posts;
        userPosts.push(id);

        const dbUser = await client.getUser(user.userId);
        console.log(dbUser);
        await client.createPost(post, userPosts, dbUser.user._id);
        navigate('/');
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
                        <label htmlFor="description" className="form-label">Post Description</label>
                        <input 
                            className="form-control" 
                            id="description" 
                            placeholder="Optional" 
                            onChange={handleDescription} />
                    </div>
                    <button type="button" className="btn btn-success" onClick={createPost}>Post</button>
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

    useEffect(() => {

    }, [selectedSong]);

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