
import Song from "../Song";
import * as client from "../Client";
import { useEffect, useState } from "react";

function GenericFeed() {
    const [posts, setPosts] = useState<any>([]);
    const [userLikes, setUserLikes] = useState<any>([]);

    useEffect(() => {
        const getGenericPosts = async () => {
            const posts = await client.getGenericPosts();
            setPosts(posts);
        }
        getGenericPosts();
    }, []);

    return (
        <div className="feed-offset p-3">
            {posts.map((post:any, index:number) => {
                let classNameVar = "";
                if (index !== 0) {
                    classNameVar = "mt-4"
                }
                return (
                    <div className={classNameVar} key={index}>
                        <Song id={post.id} title={post.title} artist={post.artist} poster={post.poster} linkTo={post.link} description={post.description} isLiked={false} />
                    </div>
                );
            })}
        </div>
    );
}

export default GenericFeed;