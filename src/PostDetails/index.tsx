import { useParams } from "react-router";
import * as client from "../Client";
import { useEffect, useState } from "react";
import Song from "../Song";


function PostDetails() {
    const { postId } = useParams();
    const [post, setPost] = useState<any>({});

    useEffect(() => {
        const getPost = async () => {
            if (postId) {
                const post = await client.getPostDetails(postId);
                setPost(post);
            }
        }
        getPost();
    }, []);

    return (
        <div className="feed-offset bg-secondary border rounded p-3">
            <h1>Post Details for Post # {post.id}</h1>
            <Song id={post.id} title={post.title} artist={post.artist} poster={post.poster} linkTo={post.link} description={post.description} isLiked={false} />
        </div>
    )
}

export default PostDetails;