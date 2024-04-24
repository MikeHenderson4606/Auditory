import { useEffect, useState } from "react";
import zbcover from '../media/ZBCover.png';

import './index.css';
import { AuditoryState } from "../store";
import { useSelector } from "react-redux";
import * as client from "../Client";
import { Link } from "react-router-dom";

function Song({song}: {song:any}) {
    const id = song.id;
    const title = song.title;
    const artist = song.artist;
    const poster = song.poster;
    const posterId = song.posterId;
    const spotifyId = song.spotifyId;
    const cover = song.cover;
    const description = song.description;
    const { userData } = useSelector((state:AuditoryState) => state.userDataReducer);
    const [play, setPlay] = useState(false);

    function handlePlayPause() {
        setPlay(!play);
    }

    return (
        <div className="border border-secondary rounded row bg-success-subtle">
            <div className="col-9">
                <h4 className="text-center mt-2">{title}</h4>
                <h5 className="text-center">{artist}</h5>
                <h5 className="text-center">
                    <Link to={`/user/${posterId}`} className="btn btn-outline-success" style={{border: "none"}}>
                        {poster}
                    </Link>
                </h5>
                <h6 className="text-center">{description}</h6>
                <nav className="navbar">
                    <div className="container-fluid justify-content-center">
                        {play ? 
                        <button className="btn btn-outline-success no-border" style={{border: "none"}} onClick={() => handlePlayPause()}>
                            <i className="fa fa-pause-circle fa-2x"></i>
                        </button> :
                        <button className="btn btn-outline-success no-border" style={{border: "none"}} onClick={() => handlePlayPause()}>
                            <i className="fa fa-play-circle fa-2x"></i>
                        </button>}
                        {userData.auditory.likedPosts && userData.auditory.likedPosts.includes(id) ? <button className="btn btn-outline-success fs-4 ms-2" style={{border: "none"}} onChange={e => {
                            const unLikePost = async () => {
                                
                            }
                        }}>
                            <i className="fa fa-heart"></i>
                        </button> :
                        <button className="btn btn-outline-success fs-4 ms-2" style={{border: "none"}} onClick={e => {
                            const likePost = async () => {
                                client.likePost(userData.auditory.userId, id);
                            }
                            console.log("Liking post", id);
                            likePost();
                        }}>
                            <i className="fa fa-heart-o"></i>
                        </button>}
                        <Link to={`/details/${id}`}>
                            <button className="btn btn-outline-success fs-4 ms-2" style={{border: "none"}}>
                                <i className="fa fa-info"></i>
                            </button>
                        </Link>
                        
                    </div>
                </nav>
            </div>
            <div className="col-3 p-0">
                <img src={cover} width="80%" height="80%" className="img-thumbnail float-end border rounded" />
            </div>
        </div>
        
    );
}

export default Song;