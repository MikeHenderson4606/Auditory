import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as client from '../Client';
import Song from "../Song";

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState<any>({});
    const [follows, setFollows] = useState<any>([]);
    const [likes, setLikes] = useState<any>([]);

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

    useEffect(() => {
        const getUserDetails = async () => {
            if (userId) {
                const user = await client.getUser(parseInt(userId));

                if (user.code === 200) {
                    setUser(user.user);
                    setFollowData(user.user.follows);
                    setLikedPostData(user.user.likes);
                } else {
                    setUser({});
                    setFollows([]);
                }
            }
        }
        getUserDetails();
    }, [userId]);

    return (user ? 
        <div className="feed-offset ms-5">
            <h1 className="text-center">
                {user.username}
            </h1>
            <div className="border border-success rounded p-2">
                <h2>Following: </h2>
                {follows.length > 1 ? <div className="list-group">
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
                {likes.length > 1 ? <div className="list-group">
                    {likes.map((like:any, index:number) => {
                        return (
                        <div className="list-group-item list-group-item-light" key={index}>
                            <Song id={like.id} title={like.title} artist={like.artist} poster={like.poster} posterId={like.posterId} linkTo={like.linkTo} description={like.description} />
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