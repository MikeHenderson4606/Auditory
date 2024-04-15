
import Song from "../../../Song";
import * as client from "../../../Client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Posts() {
    const [posts, setPosts] = useState<any>([]);
    const [isLiked, setIsLiked] = useState(false);
    const [userLikes, setUserLikes] = useState<any>([]);

    useEffect(() => {
        const getUserPosts = async () => {
            const user = await client.getProfile();
            setPosts(user.posts);
            setUserLikes(user.likes);
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
            <div className="border border-light rounded bg-light">
                {posts.map((post:any, index:number) => {
                    let isLiked = false;
                    if (userLikes.includes(post.id)) {
                        isLiked = true;
                    }
                    return (
                        <div className="p-3" key={index}>
                            <Song id={post.id} title={post.title} artist={post.artist} poster={post.poster} linkTo={post.link} description={post.description} isLiked={isLiked} />
                        </div>
                    );
                })}
            </div>
        </div>
        
    );
}

export default Posts;