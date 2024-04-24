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
    let likedPosts:any;

    function handlePlayPause() {
        setPlay(!play);
    }

    const getUserId = async () => {
        if (userData.auditory.userId) {
            const user = await client.getUser(userData.auditory.userId);
            return user.user;
        } else {
            return;
        }
    }

    useEffect(() => {
        const getUser = async () => {
            if (userData.auditory.userId) {
                const user = await client.getUser(userData.auditory.userId);
                if (user.user.likes) {
                    likedPosts = user.user.likes;
                }
            }
            
            console.log(likedPosts && likedPosts.includes(id));
        }
        getUser();
    }, [likedPosts]);

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
                        {(likedPosts && likedPosts.includes(id)) ? <button className="btn btn-outline-success fs-4 ms-2" style={{border: "none"}} >
                            <i className="fa fa-heart"></i>
                        </button> :
                        <button className="btn btn-outline-success fs-4 ms-2" style={{border: "none"}} onClick={e => {
                            console.log("Liking post", id);
                            const likePost = async () => {
                                const user = await getUserId();
                                const likes = user.likes;
                                likes.push(id);
                                client.likePost(user._id, likes);
                            }
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