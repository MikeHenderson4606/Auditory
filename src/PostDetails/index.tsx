import { useNavigate, useParams } from "react-router";
import * as client from "../Client";
import { useEffect, useState } from "react";
import Song from "../Song";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { AuditoryState } from "../store";

function PostDetails() {
    const { postId } = useParams();
    const { isLoggedIn } = useSelector((state:AuditoryState) => state.loginReducer);
    const navigate = useNavigate();
    const [post, setPost] = useState<any>({});
    const [comments, setComments] = useState<any>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState<any>({});

    const deletePost = async () => {
        if (postId) {
            const poster = await client.getUser(post.posterId);
            await client.deletePost(parseInt(postId), poster.user.posts);
            navigate('/');
        }
    }

    useEffect(() => {
        const getData = async () => {
            if (postId) {
                const post = await client.getPostDetails(postId);
                const comments = await client.getComments(postId);
                const user = await client.getProfile();
                setPost(post);
                setComments(comments);
                setUser(user);
                if (user.role === "ADMIN") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            }
        }
        getData();
    }, []);

    return (
        <div className="feed-offset bg-body-light border rounded p-3">
            <h1 className="text-center">
                Post Details
                {isAdmin ? 
                <button className="btn btn-danger float-end" onClick={deletePost}>
                    Delete Post
                </button> : <div></div>}
            </h1>
            {post.title ? 
                <div>
                    <Song song={post} />
                    <button className="btn btn-success mt-3 float-end">Add Comment</button>
                    <h3 className="mt-3">Comments</h3>
                    {comments.map((comment:any, index:number) => {
                        return (
                            <Comment key={index} comment={comment} />
                        )})
                    }
                </div> : <div></div>}
        </div>
    )
}

export default PostDetails;