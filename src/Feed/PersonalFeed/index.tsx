import { useEffect, useState } from "react";
import Song from "../../Song";
import * as client from '../../Client';

function PersonalFeed() {
    const [posts, setPosts] = useState<any>([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const [likedPosts, setLikedPosts] = useState<number[]>([]);

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
                setFirstLoad(false);
            } catch (err) {
                setPosts([]);
            }
        }
        if (firstLoad) {
            getPersonalPosts();
        }
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
                            <Song song={post} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PersonalFeed;