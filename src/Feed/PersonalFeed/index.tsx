import { useEffect, useState } from "react";
import Song from "../../Song";
import * as client from '../../Client';

function PersonalFeed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPersonalPosts = async () => {
            try {
                const posts = await client.getPersonalPosts();
                if (posts.length > 0) {
                    setPosts(posts);
                } else {
                    const posts = await client.getGenericPosts();
                    setPosts(posts);
                }
            } catch (err) {
                setPosts([]);
            }
        }
        getPersonalPosts();
    });

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

export default PersonalFeed;