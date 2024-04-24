import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as client from '../Client';
import Song from "../Song";
import { AuditoryState } from "../store";

function User() {
    const { userId } = useParams();
    const { isLoggedIn } = useSelector((state:AuditoryState) => state.loginReducer);
    const [user, setUser] = useState<any>({});
    const [follows, setFollows] = useState<any>([]);
    const [likes, setLikes] = useState<any>([]);
    const [isFollowingUser, setIsFollowingUser] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const setFollowData = async (userIds: number[]) => {
        const follows = await Promise.all(userIds.map((userId:any) => {
            return client.getUser(userId); 
        }));
        setFollows(follows);
    }

    const setLikedPostData = async (postIds: number[]) => {
        const likes = await Promise.all(postIds.map((postId:any) => {
            return client.getPostDetails(postId);
        }))
        setLikes(likes);
    }

    const deleteUser = async () => {
        if (userId) {
            const user = await client.getUser(parseInt(userId));
            const posts = user.user.posts;
            
            await Promise.all(posts.map((post:any) => {
                console.log(post, posts, user.user._id);
                client.deletePost(post, posts, user.user._id);
            }))
            await client.deleteUser(user.user._id);
            navigate('/');
        }
    }

    const getIsFollowing = async () => {
        const thisUser = await client.getProfile();
        console.log(thisUser);
        if (userId && thisUser) {
            if (thisUser.follows.includes(parseInt(userId)) || thisUser.userId === parseInt(userId)) {
                setIsFollowingUser(true);
            } else {
                setIsFollowingUser(false);
            }
        } else {
            setIsFollowingUser(true);
        }
    }

    useEffect(() => {
        const getUserDetails = async () => {
            if (userId) {
                const user = await client.getUser(parseInt(userId));
                const currentUser = await client.getProfile();
                if (currentUser) {
                    if (currentUser.role === "ADMIN") {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                }

                if (user.code === 200) {
                    setUser(user.user);
                    setFollowData(user.user.follows);
                    setLikedPostData(user.user.likes);
                } else {
                    setUser({});
                    setFollows([]);
                }
            }
            getIsFollowing();
        }
        getUserDetails();
    }, [userId]);

    return (user ? 
        <div className="feed-offset ms-5">
            <div className="p-3 border border-success rounded">
                <h2>{user.username}</h2>
                <button disabled={isFollowingUser} className="btn btn-success">
                    Follow User
                </button>
                {isAdmin ? 
                <button className="btn btn-danger ms-2" onClick={(e:any) => {
                    deleteUser();
                }}>
                    Delete User
                </button> : <div></div>}
            </div>
            <div className="border border-success rounded p-2 mt-3">
                <h2>Following: </h2>
                {follows.length > 0 ? <div className="list-group">
                    {follows.map((follow:any, index:number) => {
                        return (
                        <Link to={`/user/${follow.user.userId}`} className="list-group-item list-group-item-action list-group-item-light text-decoration-none" key={index}>
                            {follow.user.username}
                        </Link>
                        );
                    })}
                </div> : 
                <div>
                    This user is not following anyone.
                </div>}
            </div>
            <div className="border border-success rounded p-2 mt-3">
                <h2>Liked Posts: </h2>
                {likes.length > 0 ? 
                <div className="list-group">
                    {likes.map((like:any, index:number) => {
                        return (
                        <div className="list-group-item list-group-item-light" key={index}>
                            <Song song={like} />
                        </div>
                        );
                    })}
                </div> :
                <div> 
                    This user has no liked posts.
                </div>}
            </div>
        </div> : 
        <div>
            No user found with that ID
        </div>
        );
}

export default User;