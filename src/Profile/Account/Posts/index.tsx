
import Song from "../../../Song";
import * as client from "../../../Client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Posts() {
    const [posts, setPosts] = useState<any>([]);
    const [userLikes, setUserLikes] = useState<any>([]);

    useEffect(() => {
        const getUserPosts = async () => {
            const user = await client.getProfile();
            
            if (user) {
                const postDetailsPromise = await Promise.all(user.posts.map((postId:any) => {
                    return client.getPostDetails(postId);
                }));
                console.log(user);
    
                setPosts(postDetailsPromise);
                setUserLikes(user.likes);
            }
        }
        getUserPosts();
    }, []);

    return (
        <div>
            <h2 className="text-center">Your Posts</h2>
            <div>
                <input placeholder="Search Posts" className="form-control" />
                <Link to="/post">
                    <button className="btn btn-success mt-1">
                        New Post
                    </button>
                </Link>
            </div> <br />
            <div className="list-group">
                {posts.map((post:any, index:number) => {
                    let isLiked = false;
                    if (userLikes.includes(post.id)) {
                        isLiked = true;
                    }
                    return (
                        <div className="list-group-item list-group-item-light" key={index}>
                            <Song song={post} />
                        </div>
                    );
                })}
            </div>
        </div>
        
    );
}

export default Posts;