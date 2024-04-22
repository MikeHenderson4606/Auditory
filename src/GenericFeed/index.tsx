
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
        <div>
            <div className="feed-offset p-3 position-relative" style={{left: "100px"}}>
                {posts.map((post:any, index:number) => {
                    let classNameVar = "";
                    if (index !== 0) {
                        classNameVar = "mt-4"
                    }
                    return (
                        <div className={classNameVar} key={index}>
                            <Song id={post.id} title={post.title} artist={post.artist} poster={post.poster} posterId={post.posterId} linkTo={post.link} description={post.description} />
                        </div>
                    );
                })}
            </div>
        </div>
        
        
    );
}

export default GenericFeed;